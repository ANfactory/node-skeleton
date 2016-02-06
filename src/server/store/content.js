import fs from 'fs';
import path from 'path';

import fm from 'front-matter';
import marked from 'marked';


const resolvePath = (filePath) => path.resolve(__dirname, `../../../var/content/${filePath}.md`);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const parseFile = (file) => fm(file);
const parseMarkDown = (md) => marked(md);

const contentStore = {
  get(contentPath) {
    try {
      let data = parseFile(readFile(resolvePath(contentPath)));
      return {...data.attributes, content: parseMarkDown(data.body)};
    } catch (err) {
      console.log(`Error on content with pah: ${contentPath}`, err);
      return null;
    }
  }
};

export default contentStore;