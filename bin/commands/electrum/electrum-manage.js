import { Command } from "commander";
import nvimUpdate from "./nvim-update.js"

const nvmManage = () => {
  const program = new Command("electrum");
  program.description("Manage electrum")
  // program.addCommand(nvimUpdate())
  return program;
};

export default nvmManage;
