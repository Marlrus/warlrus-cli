import { Command } from "commander";
import nvmInstall from "./nvm-install.js"
import nvmUpdateNode from "./nvm-update-node.js"

const nvmManage = () => {
  const program = new Command("nvm-manage");
  program.description("Manage nvm package")
  program.addCommand(nvmInstall())
  program.addCommand(nvmUpdateNode())
  return program;
};

export default nvmManage;
