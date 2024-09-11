const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../../db.json');
const middlewares = jsonServer.defaults();

exports.handler = async (event, context) => {
  server.use(middlewares);
  server.use(router);

  return new Promise((resolve, reject) => {
    server.listen(3000, () => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'JSON Server running' }),
      });
    });
  });
};
