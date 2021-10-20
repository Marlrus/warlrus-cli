import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import { getDirname } from "../utils/index.js";
import ora from "ora";
import chalk from "chalk";

const __dirname = getDirname(import.meta.url);

const updateNvim = () => {
  const updateNvim = new Command("update-nvim");
  updateNvim
    .description("Updates neovim to latest nightly version")
    .action(() => {
      console.log(chalk.yellow("Dowloading latest version of Nvim..."));
      spawn(path.resolve(__dirname, "../scripts/update-nvim.sh"), [], {
        shell: true,
        stdio: "inherit",
      }).on("exit", () => {
        ora("Latest Nvim dowloaded and permissions added").succeed();
      });
    });

  return updateNvim
};

export default updateNvim;
