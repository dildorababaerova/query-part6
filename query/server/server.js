// import jsonServer from 'json-server';

// // Создаем сервер
// const server = jsonServer.create();
// // Настроим маршруты с db.json
// const router = jsonServer.router('../server/db.json');
// // Стандартные middlewares
// const middlewares = jsonServer.defaults();

// // Валидация для POST-запросов
// const validator = (request, response, next) => {
//   console.log();
//   const { content } = request.body;

//   if (request.method === 'POST' && (!content || content.length < 5)) {
//     return response.status(400).json({
//       error: 'too short anecdote, must have length 5 or more'
//     });
//   } else {
//     next();
//   }
// };

// // Применяем middlewares и маршруты
// server.use(middlewares);
// server.use(jsonServer.bodyParser);
// server.use(validator);
// server.use(router);

// // Запускаем сервер на порту 3001
// server.listen(3001, () => {
//   console.log('JSON Server is running');
// });
