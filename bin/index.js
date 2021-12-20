#!/usr/bin/env node

import { Command } from "commander";
import nvimManage from "./commands/nvim/nvim-manage.js";
import systemManage from "./commands/system/system.js";
import nvmManage from "./commands/nvm/nvm-manage.js";
import electrumManage from "./commands/electrum/electrum-manage.js";
// import test from "./commands/test-templates/test.js";

const program = new Command();

program.addCommand(nvimManage());
program.addCommand(systemManage());
program.addCommand(nvmManage());
program.addCommand(electrumManage());
// program.addCommand(test());

program.showSuggestionAfterError()
program.showHelpAfterError()

program.parse(process.argv);
