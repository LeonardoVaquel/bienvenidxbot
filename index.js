require('dotenv').config()
const express   = require('express')
const app       = express()
const Telegraf  = require('telegraf')

const TOKEN     = process.env.BOT_TOKEN
const API       = process.env.TELEGRAM_API
const bot       = new Telegraf(TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))


// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://white-newt-62.loca.lt')

app.get('/', (req, res) => res.send('Hello World!'))
// Set the bot API endpoint
app.use(bot.webhookCallback('/secret-path'))
app.listen(8000, () => {
  console.log('Example app listening on port 3000!')
  bot.launch()
})
