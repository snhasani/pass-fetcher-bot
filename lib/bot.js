
var TelegramBot = require('node-telegram-bot-api');
var scraperjs = require('scraperjs');

var token = '169222462:AAFf06BoIPDoTWu4K8ax4PSumkRPUalJ0dI';
var selector = '#pricing > div > div.one-third.column.box.light.featured > ul > li:nth-child(9) > strong';
var url = 'http://www.vpnbook.com/freevpn'

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

// Matches /start
bot.onText(/^\/start/, function (msg, match) {
  bot.sendMessage(msg.chat.id, 'سلام :-)\nخیلی خوش اومدی. من ربات یابنده‌ي پسورد هستم. تخصصم فعلا پیدا کردن پسورد سرویس مجانی vpnbook هست که هر هفته یکبار ریست میشه.\nمن اینجا آماده باش هستم تا هر وقتی شما دستور');
bot.sendMessage(msg.chat.id, '/pass');
  bot.sendMessage(msg.chat.id, 'اینجا وارد کردید برم و براتون پسورد جدید بیارم. برای شروع می‌تونیند همین الان این دستور وارد کنید :-)');\
});

// Matches /help
bot.onText(/^\/help/, function (msg, match) {
  bot.sendMessage(msg.chat.id, 'برای دریافت پسورد جدید تنها کافیه که دستور زیر رو وارد کنید');
  bot.sendMessage(msg.chat.id, '/pass');
  bot.sendMessage(msg.chat.id, 'خوش باشید :-)');
});

// Matches /pass
bot.onText(/^\/pass/, function (msg, match) {
  bot.sendMessage(msg.chat.id, 'رمز عبور جدید:');

  scraperjs.StaticScraper.create(url)
   .scrape(function($) {
    return $(selector).text();
   })
  .then(function(pass) {
    bot.sendMessage(msg.chat.id, pass);
   })
});
