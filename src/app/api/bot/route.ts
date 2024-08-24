export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { Bot, webhookCallback } from 'grammy'

const token = "7456301951:AAGd88Drvyv1vLtIwbLeTupT8uJSiOIRfXE"

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token);

bot.command('start', async (ctx) => {
    await ctx.reply("Привет я бот");
})
bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
})

bot.start();

export const POST = webhookCallback(bot, 'std/http');
