import { Command } from "commander";
import updateSystem from "./update-system.js"

const systemManage = () => {
  const program = new Command("system");
  program.description("Manage base system")
  program.addCommand(updateSystem())
  return program;
};

export default systemManage;
