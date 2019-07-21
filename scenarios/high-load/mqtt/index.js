const mqtt = require('mqtt');
const os = require('os');

const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;

function getTimestamp() {
    return +new Date();
}

async function main() {
    const hostname = os.hostname();
    const client = mqtt.connect(ROUTER_ADDRESS);

    client.on('connect', async () => {
        client.subscribe('scenario/high-load');

        let msgs = 0;

        setInterval(() => {
            console.log(`${hostname},${getTimestamp()},${msgs}`);
            msgs = 0;
        }, 1000);
        
        setInterval(async () => {
            await new Promise(resolve => {
                client.publish('scenario/high-load', '', resolve);
            });
            msgs += 1;
        }, 0);
    });

    client.on('message', function (topic, message) {
    });
}

main();
