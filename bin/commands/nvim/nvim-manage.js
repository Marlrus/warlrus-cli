import { Command } from "commander";
import nvimUpdate from "./nvim-update.js"

const nvmManage = () => {
  const program = new Command("nvim");
  program.description("Manage nvim")
  program.addCommand(nvimUpdate())
  return program;
};

export default nvmManage;
