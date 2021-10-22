#!/usr/bin/env node

import { Command } from "commander";
import updateNvim from "./commands/update-nvim.js";
import updateSystem from "./commands/update-system.js";
import test from "./commands/test.js";

const program = new Command();

program.addCommand(updateNvim());
program.addCommand(updateSystem());
// program.addCommand(test());
// Command for updating vim "vim +PlugInstall +qall"
// Command for installing all lsps in npm "nvm reinstall-packages <version>" use awk and nvm list to get default version

program.showSuggestionAfterError()
program.showHelpAfterError()

program.parse(process.argv);
