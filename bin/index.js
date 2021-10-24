#!/usr/bin/env node

import { Command } from "commander";
import updateNvim from "./commands/update-nvim.js";
import updateSystem from "./commands/update-system.js";
// import test from "./commands/test.js";
import nvmInstall from "./commands/nvm-install.js";
// import inquirerTest from "./commands/inquirer-test.js";

const program = new Command();

program.addCommand(updateNvim());
program.addCommand(updateSystem());
// program.addCommand(test());
program.addCommand(nvmInstall());
// program.addCommand(inquirerTest());
// Command for updating vim "vim +PlugInstall +qall"
// Command for installing all lsps in npm "nvm reinstall-packages <version>" use awk and nvm list to get default version

program.showSuggestionAfterError()
program.showHelpAfterError()

program.parse(process.argv);
