import { Command } from "commander";
import nvmInstall from "./nvm-install.js"

const nvmManage = () => {
  const program = new Command("nvm-manage");
  program.description("Manage nvm package")
  program.addCommand(nvmInstall())
  return program;
};

export default nvmManage;
