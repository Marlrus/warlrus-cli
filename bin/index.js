#!/usr/bin/env node

import { Command } from "commander";
import updateNvim from "./commands/update-nvim.js";

const program = new Command();

program.addCommand(updateNvim());

program.parse(process.argv);
