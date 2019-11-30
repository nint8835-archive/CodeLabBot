import Commando from 'discord.js-commando';
import { config as configDotenv } from 'dotenv';
import { Message } from 'discord.js';
import eslintCode from './utils';

configDotenv();

const javascriptBlockRegex = /(`(?:``))(?:(?:js|javascript)\n|\n)((?:.|\n)*)(?:\1)/;

const client = new Commando.CommandoClient({
  owner: '106162668032802816',
});
client.on('message', async (message: Message) => {
  const matches = javascriptBlockRegex.exec(message.content);
  if (matches !== null && !message.author.bot) {
    const code = matches[2];
    const eslintOutput = await eslintCode(code);
    if (eslintOutput) {
      message.reply(eslintOutput);
    }
  }
});

client.login(process.env.CODELAB_DISCORD_TOKEN);
