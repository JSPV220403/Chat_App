const net = require('net');
const clients = [];
const server = net.createServer();

server.on('connection', (client) => {

    console.log('Client connected:', client.remoteAddress);
    clients.push(client);
    client.on('data', (data) => {
        clients.forEach((c) => {
            if (c !== client && c.writable) {
                c.write(`${client.remoteAddress}: ${data}`);
            }
        });
    });

    client.on('end', () => {
        console.log('Client disconnected:', client.remoteAddress);

        const index = clients.indexOf(client);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });

    client.on('error', (err) => {
        console.error('Client error:', err);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
