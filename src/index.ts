import CustomClient from './CustomClient';

const TEST_BOT_TOKEN = process.env['TEST_BOT_TOKEN'];
const BOT_TOKEN = process.env['BOT_TOKEN'];

const isDevelopment = process.env.NODE_ENV !== 'production';

async function main(): Promise<void> {
  const client = new CustomClient();
  client.load();
  client.login(isDevelopment? TEST_BOT_TOKEN : BOT_TOKEN);

  process.on('SIGINT', () => {
    client.destroy();
  });
}

main();
