const TelegramBot = require('node-telegram-bot-api');
const persianjs = require('persianjs');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const categories = {
  موزیک: ['channel1', 'channel2', 'channel3'],
  سینمایی: ['channel4', 'channel5', 'channel6'],
  کتاب: ['channel7', 'channel8', 'channel9'],
};

bot.onText(/\/start/, async (message) => {
  bot.sendMessage(message.chat.id, 'لطفا دسته مورد نظر خود را انتخاب کنید:', {
    reply_markup: {
      inline_keyboard: Object.keys(categories).map((key) => {
        return [{ text: key, callback_data: key }];
      }),
    },
  });
});

// Listen for category selection and send channels
bot.on('callback_query', (callbackQuery) => {
  const category = callbackQuery.data;
  const channels = categories[category];
  if (channels) {
    const messageText =
      `لیست ۱۰ کانال برتر در دسته ${persianjs(category)
        .arabicChar()
        .toString()}:
` + channels.slice(0, 10).join('');
    bot.sendMessage(callbackQuery.message.chat.id, messageText);
  }
});
