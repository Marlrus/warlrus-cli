#!/usr/bin/env node

import { Command } from "commander";
import nvimManage from "./commands/nvim/nvim-manage.js";
import systemManage from "./commands/system/system.js";
// import test from "./commands/test-templates/test.js";
import nvmManage from "./commands/nvm/nvm-manage.js";
// import inquirerTest from "./commands/inquirer-test.js";

const program = new Command();

program.addCommand(nvimManage());
program.addCommand(systemManage());
// program.addCommand(test());
program.addCommand(nvmManage());
// program.addCommand(inquirerTest());
// Command for updating vim "vim +PlugInstall +qall"
// Command for installing all lsps in npm "nvm reinstall-packages <version>" use awk and nvm list to get default version

program.showSuggestionAfterError()
program.showHelpAfterError()

program.parse(process.argv);
