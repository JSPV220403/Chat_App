const net = require('net');

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log('Received:', data.toString());
});

process.stdin.on('data', (data) => {
    client.write(data);
    
});
