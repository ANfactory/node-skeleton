import koa from 'koa';
import gzip from 'koa-gzip';
import fresh from 'koa-fresh';
import etag from 'koa-etag';
import responseTime from 'koa-response-time';
import serve from 'koa-static';
import logger from 'koa-logger';
import Jade from 'koa-jade';

import assets from '../../assets.json';

import contentStore from './store/content';

const app = koa();

app.use(gzip());
app.use(fresh());
app.use(etag());
app.use(responseTime());
app.use(serve(__dirname + '/../../public'));
app.use(logger());

const jade = new Jade({viewPath: __dirname + '/../views', locals: {assets}});
app.use(jade.middleware);

app.use(function *pageNotFound(next) {
  yield next;
  if (404 == this.status) {
    this.status = 404;
    this.render('err404');
  }
});

app.use(function *content() {
  let doc = contentStore.get(this.path == '/' ? '/index' : this.path);
  if (doc) {
    this.render(doc.template || 'content', {...doc});
  }
});

export default app;
