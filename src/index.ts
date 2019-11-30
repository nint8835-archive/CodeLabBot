import Commando from 'discord.js-commando';
import { config as configDotenv } from 'dotenv';
import { Message } from 'discord.js';
import eslintCode from './utils';

configDotenv();

const client = new Commando.CommandoClient({
  owner: '106162668032802816',
});
client.on('message', async (message: Message) => {
  if (message.content.startsWith('```') && message.content.endsWith('```')) {
    const lines = message.content.split('\n');
    const code = [...lines.slice(1, lines.length - 1), ''].join('\n');
    const eslintOutput = await eslintCode(code);
    if (eslintOutput) {
      message.reply(eslintOutput);
    }
  }
});

client.login(process.env.CODELAB_DISCORD_TOKEN);
