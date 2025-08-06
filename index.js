const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

// Токен берём из переменной окружения
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  const caption = `🎁 Try your luck in daily gift raffles at @casemirror 🎮
✨ Open cases and win amazing prizes every day!`;

  const photoPath = path.join(__dirname, 'photo1.png');

  const options = {
    caption,
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Case App', url: 'https://t.me/casemirror_official_bot/Case' },
          { text: 'Case Russian App', url: 'https://t.me/case_official_ru_bot/case' }
        ],
        [
          { text: 'Agreement', url: 'https://t.me/case_official_bot/agreement' },
          { text: 'Join Community', url: 'https://t.me/casemirror' }
        ],
        [
          { text: 'Support', url: 'https://t.me/casesupbot' }
        ]
      ]
    }
  };

  try {
    await bot.sendPhoto(chatId, photoPath, options);
  } catch (error) {
    console.error('Error sending photo:', error);
  }
});
