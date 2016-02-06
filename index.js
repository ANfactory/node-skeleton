import server from './src/server';

server.context.port = process.env.PORT || 3000;

server.listen(server.context.port, () => console.log(`app is listening in ${server.env} mode:
 => Go to http://localhost:${server.context.port}`));
