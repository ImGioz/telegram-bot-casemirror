const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const fs = require('fs');
const path = require('path');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot is running\n');
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Проверяем, что у тебя только один запущенный бот с polling
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  const caption = `🎁 Try your luck in daily gift raffles at @casemirror 🎮
✨ Open cases and win amazing prizes every day!`;

  const photoPath = path.join(__dirname, 'photo1.png');
  const photoStream = fs.createReadStream(photoPath);

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
    await bot.sendPhoto(chatId, photoStream, options);
  } catch (error) {
    console.error('Error sending photo:', error);
  }
});
