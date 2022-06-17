import 'reflect-metadata';
import createApolloServer from './util/createServer';

async function main() {
  await createApolloServer();
}

main();
