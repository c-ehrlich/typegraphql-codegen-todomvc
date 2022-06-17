import express from 'express';
import { buildSchema } from 'type-graphql';
import TodoResolver from '../module/todo/todo.resolver';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

async function createApolloServer() {
  const app = express();

  app.get('/healthcheck', (_, res) => res.send('hi'));

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [TodoResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    },
    path: '/graphql',
  });

  const port = Number(process.env.PORT || 4000);

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default createApolloServer;
