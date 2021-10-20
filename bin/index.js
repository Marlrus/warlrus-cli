#!/usr/bin/env node

import { Command } from "commander";
import updateNvim from "./commands/update-nvim.js";
import updateSystem from "./commands/update-system.js";

const program = new Command();

program.addCommand(updateNvim());
program.addCommand(updateSystem());

program.parse(process.argv);
