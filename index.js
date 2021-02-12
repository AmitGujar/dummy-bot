const { getRandomFacts } = require("free-facts");
const giveMeAJoke = require("discord-jokes");
const discord = require("discord.js");
var catMe = require("cat-me");
const express = require("express");
const app = express();
const prefix = "!";
const client = new discord.Client();
require("dotenv").config();

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    console.log(message.author);
  }
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Latency of Message = ${timeTaken}ms.`);
  } else if (command === "fact") {
    getRandomFacts().then((fact) => {
      message.reply(fact[0].name);
    });
  } else if (command === "joke") {
    giveMeAJoke.getRandomDadJoke(function (joke) {
      message.reply(joke);
    });
  } else if (command === "dad") {
    const text = "My dad is Amit Gujar 😍";
    message.reply(text);
  } else if (command === "cat") {
    message.channel.send(catMe());
  }
  client.user.setPresence({
    status: "online",
    activity: {
      name: "lol (whatever)",
      type: "PLAYING",
    },
  });
});

client.on("message", (message) => {
  if (!message.guild) return;
  if (message.content.startsWith("!kick")) {
    const user = message.mentions.users.first();
    // if user is me lol
    if (user.tag === "DedSeec#4456") {
      message.reply("Wtf u doing, I can't kick my dad");
    }
    // If we have a user mentioned
    else if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        member
          .kick()
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch((err) => {
            message.reply("Looks like you don't have permission");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});

client.login(process.env.BOT_TOKEN);
