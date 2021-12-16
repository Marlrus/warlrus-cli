import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import { getDirname } from "../../utils/index.js";
import ora from "ora";
import chalk from "chalk";

const __dirname = getDirname(import.meta.url);

const updateSystem = () => {
  const updateSystem = new Command("update");
  updateSystem
    .description("Updates system with apt update and upgrade")
    .action(() => {
      console.log(chalk.yellow("Updating System"));
      spawn(path.resolve(__dirname, "./system-scripts/update-system-script.sh"), [], {
        shell: true,
        stdio: "inherit",
      }).on("exit", (code) => {
        if (code === 1) return ora("System update failed").fail();
        ora("System up to date!").succeed();
      });
    });

  return updateSystem;
};

export default updateSystem;
