import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";

const token = "7072415539:AAEqLU3SR8Zbdx_KvgZGD_1h6IXinyI10yE";
const webAppUrl = "https://ng-tg-app-44afe.web.app/";

const bot = new Telegraf(token);

bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome! Submit Enter button to start.",
    Markup.keyboard([
      Markup.button.webApp("Send Message", webAppUrl + "/feedback"),
    ])
  );
});

bot.on(message("web_app_data"), async (ctx) => {
  const data = ctx.webAppData.data.json();

  ctx.reply(`Your message: ${data?.feedback}` ?? `empty message`);
});

bot.launch();
