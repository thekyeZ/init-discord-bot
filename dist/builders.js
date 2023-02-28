"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPackage(dirName) {
    return "{\n    \t\"name\": \"" + dirName + "\",\n    \t\"version\": \"0.0.1\",\n    \t\"description\": \"Bot created with create-discord-bot CLI\",\n    \t\"main\": \"bot.js\",\n    \t\"author\": \"create-discord-bot\",\n    \t\"dependencies\": {\n        \t\"discord.js\": \"^11.3.2\",\n\t\t\t\"dotenv\": \"^16.0.3\",\n\t\t\t\"node-cron\": \"^3.0.2\",\n\t\t\t\"node-fetch\": \"2.6.6\",\n\t\t\t\"nodemon\": \"^2.0.20\"\n    \t}\n\t}";
}
exports.getPackage = getPackage;
function getLogger() {
    return "const fs = require(\"fs\");\n\tvar path = require(\"path\");\n\t\n\t/**\n\t\tLog path pattern: log-2023-01-01.log\n\t */\n\t\n\tmodule.exports = (content = \"Empty entry\") => {\n\t  const today = new Date();\n\t  const currentLogFileName = `log-${today.toISOString().split(\"T\")[0]}.log`;\n\t  const currentLogFilePath = path.join(\n\t\t__dirname,\n\t\t\"../../\",\n\t\t\"logs\",\n\t\tcurrentLogFileName\n\t  );\n\t\n\t  fs.appendFile(\n\t\tcurrentLogFilePath,\n\t\t`${content} -> ${today.toLocaleDateString()} at ${today.toLocaleTimeString()}\n`,\n\t\t(err) => {\n\t\t  if (err) {\n\t\t\tconsole.error(err);\n\t\t  }\n\t\t  // file written successfully\n\t\t}\n\t  );\n\t};";
}
exports.getLogger = getLogger;
function getScript(token, botName) {
    var tokenValue = token.length > 0 ? token : 'your-token-from-discord-api';
    return "/* " + botName + " generated with create-discord-bot CLI */\n    require(\"dotenv\").config();\n\tconst botConfig = require(\"../config\");\n    const Discord = require('discord.js')\n\tconst client = new Discord.Client()\n    client.on('ready', () => {\n\t    console.log('Bot is ready!')\n    })\n    client.login(process.env.DISCORD_TOKEN);";
}
exports.getScript = getScript;
function getDotEnv(token) {
    var tokenValue = token.length > 0 ? token : 'your-token-from-discord-api';
    return "DISCORD_TOKEN=" + tokenValue;
}
exports.getDotEnv = getDotEnv;
function getReadme(botName) {
    return "# " + botName + "\n\t\tDiscord Bot generated with [create-discord-bot](https://github.com/HZooly/create-discord-bot)\n\n\t\tTo get the Bot invitation link, you can use [discord-bot-invitation](https://github.com/HZooly/discord-bot-invitation)\n\t";
}
exports.getReadme = getReadme;
function getGitignore() {
    return '/node_modules';
}
exports.getGitignore = getGitignore;
//# sourceMappingURL=builders.js.map