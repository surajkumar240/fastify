const Fastify = require('fastify');
const generator = require('generate-password');
const fastify = Fastify({
})

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.get('/password', function (request, reply) {
    len = request.query.len;
    if (len !== ''){
        if (len > 10001) {
            reply.send({password: "Maximum 10000 characters"});
        } else {
            var password = generator.generate({
                length: len,
                numbers: true,
                symbols: true,
                strict: true
            });
            reply.send({password: password});
        }
    }
    else{
        reply.send({password: "Length is required"});
    }
})

// Run the server!
fastify.listen({ port: process.env.PORT || 3000 })
