import Fastify from 'fastify';
import fetch from 'node-fetch';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: false
});

await fastify.register(cors, {
  origin: '*'
});

console.log('APP 2 STARTED');

fastify.get('/pong', async (request, reply) => {
  const response = await fetch('http://app-1-c:3123/ping');
  const res = await response.json();
  console.log(res);
  return res;
});

try {
  await fastify.listen({ port: 3001, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}