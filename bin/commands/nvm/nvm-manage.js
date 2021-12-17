import { Command } from "commander";
import nvmUpdate from "./nvm-update.js"
import nvmUpdateNode from "./nvm-update-node.js"

const nvmManage = () => {
  const program = new Command("nvm");
  program.description("Manage nvm package")
  program.addCommand(nvmUpdate())
  program.addCommand(nvmUpdateNode())
  return program;
};

export default nvmManage;
