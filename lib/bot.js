
var TelegramBot = require('node-telegram-bot-api');
var scraperjs = require('scraperjs');

var token = '169222462:AAFf06BoIPDoTWu4K8ax4PSumkRPUalJ0dI';
var selector = '#pricing > div > div.one-third.column.box.light.featured > ul > li:nth-child(9) > strong';
var url = 'https://www.vpnbook.com/freevpn/';

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

// Matches /pass
bot.onText(/^\/pass/, function (msg, match) {
  // bot.sendMessage(msg.chat.id, 'ربات در حال واکشی رمز عبور جدید است، لطفا کمی تامل فرمایید.\n');

  scraperjs.StaticScraper.create(url)
   .scrape(function($) {
      return $(selector).map(function() {
          console.log(url, selector);
          console.log($(this), $(this).text());
          return $(this).text();
      }).get();
   })
   .then(function(pass) {
    console.log(pass);
    bot.sendMessage(msg.chat.id, 'رمز عبور جدید:\n' + pass);
   })
});
