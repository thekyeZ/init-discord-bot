#!/usr/bin/env node
import * as fs from 'fs'
import { getPackage, getGitignore, getReadme, getScript, getLogger, getDotEnv } from './builders'
import { exec } from 'child_process'

import logSymbols from 'log-symbols'
import validate from 'validate-npm-package-name'
import qoa from 'qoa'

const log = console.log

log('Welcome to the Discord Bot Creator !')

interface Question {
  type: string,
  query: string,
  handle: string
}

interface Answer {
  botName: string,
  token: string
}
const questions: Question[] = [
  {
    type: 'input',
    query: 'What will be your bot\'s name ?',
    handle: 'botName'
  },
  {
    type: 'secure',
    query: 'Enter your Discord\'s token (press enter for empty)',
    handle: 'token'
  }
]

qoa.prompt(questions).then((answer: Answer) => {
  const validated = validate(answer.botName)

  if (validated.errors !== undefined) {
    validated.errors.forEach((error: any) => {
      log(`${logSymbols.error} ${error}`)
    })
    return
  }

  const dir = answer.botName
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    log(`${logSymbols.info} Creating new folder...`)
    fs.writeFile(`${dir}/package.json`, getPackage(dir), err => {
      if (err)
        return log(`${logSymbols.error} Error at creating package.json`)
    })

    log(`${logSymbols.info} Creating src...`)
    fs.mkdirSync(dir + '/src');

 
    log(`${logSymbols.info} Creating src/bot.js...`)
    fs.writeFile(`${dir}/src/bot.js`, getScript(answer.token, dir), err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })
 
    log(`${logSymbols.info} Creating /src/utils...`)
    fs.mkdirSync(dir + '/src/utils');
    fs.writeFile(`${dir}/src/utils/index.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })

    fs.writeFile(`${dir}/src/utils/logger.js`, getLogger(), err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })

    fs.writeFile(`${dir}/src/utils/index.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })

    
    log(`${logSymbols.info} Creating /src/assets...`)
    fs.mkdirSync(dir + '/src/assets');

    log(`${logSymbols.info} Creating /src/commands...`)
    fs.mkdirSync(dir + '/src/commands');
    fs.writeFile(`${dir}/src/commands/index.js`, "",  err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })
 
 
    log(`${logSymbols.info} Creating /src/data...`)
    fs.mkdirSync(dir + '/src/data');
    fs.writeFile(`${dir}/src/data/index.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })
 
    log(`${logSymbols.info} Creating /src/events...`)
    fs.mkdirSync(dir + '/src/events');
    fs.writeFile(`${dir}/src/events/index.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })
 
    log(`${logSymbols.info} Creating /src/handlers...`)
    fs.mkdirSync(dir + '/src/handlers');
    fs.writeFile(`${dir}/src/handlers/index.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at bot.js creation`)
    })

    log(`${logSymbols.info} Creating /logs...`)
    fs.mkdirSync(dir + '/logs');

    
    log(`${logSymbols.info} Writing config.js...`)
    fs.writeFile(`${dir}/config.js`, "", err => {
      if (err)
        return log(`${logSymbols.error} Error at config.js creation`)
    })


    log(`${logSymbols.info} Generating .gitignore...`)
    fs.writeFile(`${dir}/.gitignore`, getGitignore(), err => {
      if (err)
        return log(`${logSymbols.error} Error at .gitignore creation`)
    })


    log(`${logSymbols.info} Writing README.md...`)
    fs.writeFile(`${dir}/README.md`, getReadme(dir), err => {
      if (err)
        return log(`${logSymbols.error} Error at README creation`)
    })

    log(`${logSymbols.info} Writing .env...`)
    fs.writeFile(`${dir}/.env`, getDotEnv(answer.token), err => {
      if (err)
        return log(`${logSymbols.error} Error at .env creation`)
    })

    log(`${logSymbols.info} Installing dependencies...`)
    exec(`cd ${dir} && npm install`, (err, stdout, stderr) => {
      log(`${logSymbols.success} Done!`)
    })
  }
})
