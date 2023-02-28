#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var builders_1 = require("./builders");
var child_process_1 = require("child_process");
var log_symbols_1 = __importDefault(require("log-symbols"));
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
var qoa_1 = __importDefault(require("qoa"));
var log = console.log;
log('Welcome to the Discord Bot Creator !');
var questions = [
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
];
qoa_1.default.prompt(questions).then(function (answer) {
    var validated = validate_npm_package_name_1.default(answer.botName);
    if (validated.errors !== undefined) {
        validated.errors.forEach(function (error) {
            log(log_symbols_1.default.error + " " + error);
        });
        return;
    }
    var dir = answer.botName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        log(log_symbols_1.default.info + " Creating new folder...");
        fs.writeFile(dir + "/package.json", builders_1.getPackage(dir), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at creating package.json");
        });
        log(log_symbols_1.default.info + " Creating src...");
        fs.mkdirSync(dir + '/src');
        log(log_symbols_1.default.info + " Creating src/bot.js...");
        fs.writeFile(dir + "/src/bot.js", builders_1.getScript(answer.token, dir), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /src/utils...");
        fs.mkdirSync(dir + '/src/utils');
        fs.writeFile(dir + "/src/utils/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        fs.writeFile(dir + "/src/utils/logger.js", builders_1.getLogger(), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        fs.writeFile(dir + "/src/utils/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /src/assets...");
        fs.mkdirSync(dir + '/src/assets');
        log(log_symbols_1.default.info + " Creating /src/commands...");
        fs.mkdirSync(dir + '/src/commands');
        fs.writeFile(dir + "/src/commands/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /src/data...");
        fs.mkdirSync(dir + '/src/data');
        fs.writeFile(dir + "/src/data/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /src/events...");
        fs.mkdirSync(dir + '/src/events');
        fs.writeFile(dir + "/src/events/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /src/handlers...");
        fs.mkdirSync(dir + '/src/handlers');
        fs.writeFile(dir + "/src/handlers/index.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at bot.js creation");
        });
        log(log_symbols_1.default.info + " Creating /logs...");
        fs.mkdirSync(dir + '/logs');
        log(log_symbols_1.default.info + " Writing config.js...");
        fs.writeFile(dir + "/config.js", "", function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at config.js creation");
        });
        log(log_symbols_1.default.info + " Generating .gitignore...");
        fs.writeFile(dir + "/.gitignore", builders_1.getGitignore(), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at .gitignore creation");
        });
        log(log_symbols_1.default.info + " Writing README.md...");
        fs.writeFile(dir + "/README.md", builders_1.getReadme(dir), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at README creation");
        });
        log(log_symbols_1.default.info + " Writing .env...");
        fs.writeFile(dir + "/.env", builders_1.getDotEnv(answer.token), function (err) {
            if (err)
                return log(log_symbols_1.default.error + " Error at .env creation");
        });
        log(log_symbols_1.default.info + " Installing dependencies...");
        child_process_1.exec("cd " + dir + " && npm install", function (err, stdout, stderr) {
            log(log_symbols_1.default.success + " Done!");
        });
    }
});
//# sourceMappingURL=cli.js.map