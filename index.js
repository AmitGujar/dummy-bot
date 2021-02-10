const { getRandomFacts } = require("free-facts");
const giveMeAJoke = require('discord-jokes');
const discord = require("discord.js");
var catMe = require('cat-me')
const express = require("express");
const app = express();
const prefix = "!"
const client = new discord.Client();
require("dotenv").config();

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server started");
})

console.log("bot is online");

client.on("message", (message) => {
    if (message.author.bot)
        return;
    if (!message.content.startsWith(prefix)) {
        console.log("command error");
    }
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Latency of Message = ${timeTaken}ms.`);
    } 
    else if (command === "fact") {
        getRandomFacts().then((fact) => {
            message.reply(fact[0].name);
        });
    }

    else if (command === "joke") {
        giveMeAJoke.getRandomDadJoke (function(joke) {
            message.reply(joke);
        });
    }
    else if (command === "dad") {
        const text = "My dad is Amit Gujar 😍";
        message.reply(text);
    }
    else if (command === "cat") {
        message.channel.send(catMe());
    }
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Streaming (whatever)',
            type: 'PLAYING',
        }
    });
});

client.login(process.env.BOT_TOKEN);