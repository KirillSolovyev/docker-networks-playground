import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: false
});

await fastify.register(cors, {
  origin: '*'
});

console.log('APP 1 STARTED');

fastify.get('/ping', async (request, reply) => {
  console.log(request.headers);
  return { pong: 'pong' };
});

try {
  await fastify.listen({ port: 3123, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}