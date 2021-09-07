import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import express from 'express';
import Container from 'typedi';

import { PORT } from './config/environments';
import { databaseConnection } from './database/connection';
import { UsersResolver } from './graphql/resolvers/users.resolver';

async function startApolloServer(): Promise<void> {
  const app = express();
  const apolloSchemaOptions: BuildSchemaOptions = {
    resolvers: [UsersResolver],
    emitSchemaFile: true,
    container: Container,
  };
  const apolloSchema = await buildSchema(apolloSchemaOptions);
  const server = new ApolloServer({
    schema: apolloSchema,
  });
  await server.start();
  await databaseConnection();
  server.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
}
startApolloServer();
