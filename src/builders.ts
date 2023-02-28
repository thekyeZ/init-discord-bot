export function getPackage(dirName: string) {
  return `{
    	"name": "${dirName}",
    	"version": "0.0.1",
    	"description": "Bot created with create-discord-bot CLI",
    	"main": "bot.js",
    	"author": "create-discord-bot",
    	"dependencies": {
        	"discord.js": "^11.3.2",
			"dotenv": "^16.0.3",
			"node-cron": "^3.0.2",
			"node-fetch": "2.6.6",
			"nodemon": "^2.0.20"
    	}
	}`
}

export function getLogger()  {
	return `const fs = require("fs");
	var path = require("path");
	
	/**
		Log path pattern: log-2023-01-01.log
	 */
	
	module.exports = (content = "Empty entry") => {
	  const today = new Date();
	  const currentLogFileName = \`log-\${today.toISOString().split("T")[0]}.log\`;
	  const currentLogFilePath = path.join(
		__dirname,
		"../../",
		"logs",
		currentLogFileName
	  );
	
	  fs.appendFile(
		currentLogFilePath,
		\`\${content} -> \${today.toLocaleDateString()} at \${today.toLocaleTimeString()}\n\`,
		(err) => {
		  if (err) {
			console.error(err);
		  }
		  // file written successfully
		}
	  );
	};`
}


export function getScript(token: string, botName: string) {
  const tokenValue = token.length > 0 ? token : 'your-token-from-discord-api'
  return `/* ${botName} generated with create-discord-bot CLI */
    require("dotenv").config();
	const botConfig = require("../config");
    const Discord = require('discord.js')
	const client = new Discord.Client()
    client.on('ready', () => {
	    console.log('Bot is ready!')
    })
    client.login(process.env.DISCORD_TOKEN);`
}

export function getDotEnv(token: string) {
	const tokenValue = token.length > 0 ? token : 'your-token-from-discord-api'
	return `DISCORD_TOKEN=${tokenValue}`
}

export function getReadme(botName: string) {
  return `# ${botName}
		Discord Bot generated with [create-discord-bot](https://github.com/HZooly/create-discord-bot)

		To get the Bot invitation link, you can use [discord-bot-invitation](https://github.com/HZooly/discord-bot-invitation)
	`
}

export function getGitignore() {
  return '/node_modules'
}
