import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import { getDirname } from "../../utils/index.js";
import ora from "ora";
import chalk from "chalk";

const __dirname = getDirname(import.meta.url);

const updateNvim = () => {
  const updateNvim = new Command("update");
  updateNvim
    .description("Updates neovim to latest nightly version")
    .action(() => {
      console.log(chalk.yellow("Dowloading latest version of Nvim..."));
      spawn(path.resolve(__dirname, "./nvim-scripts/update-nvim-script.sh"), [], {
        shell: true,
        stdio: "inherit",
      }).on("exit", (code) => {
        if (code === 1) return ora("Nvim update failed").fail();
        ora("Latest Nvim dowloaded and permissions added").succeed();
      });
    });

  return updateNvim;
};

export default updateNvim;
