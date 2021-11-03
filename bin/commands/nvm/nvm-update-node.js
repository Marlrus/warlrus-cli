import { Command } from "commander";
import path from "path";
import { asyncSpawn, getDirname } from "../../utils/index.js";
import inquirer from "inquirer";
import ora from "ora";

const __dirname = getDirname(import.meta.url);

const nvmUpdateNode = () => {
  const updateNode = new Command("update-node");
  updateNode
    .description(
      "Updates node version and moves npm packages from previous version."
    )
    .action(async () => {
      // Get current versions
      const spinner = ora("Getting installed node versions").start();
      const nvmInstalledVersions = await asyncSpawn(
        path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
        ["list-installed"],
      );
      const nvmIstalledOut = nvmInstalledVersions
        .split("\x1B[0m\n")
        .filter((version) => version !== "");

      // Get latest versions
      spinner.text = "Getting node latest versions"
      const nvmLtsList = await asyncSpawn(
        path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
        ["list-lts"],
      );

      const nvmLtsListOut = [
        ...new Set(
          nvmLtsList
            .split("\x1B[0m\n")
            .filter((version) => version !== "")
            .sort((a, b) => b.split(".")[0] - a.split(".")[0])
        ),
      ];

      const optionArray = nvmLtsListOut.reduce((acc, version) => {
        return nvmIstalledOut.includes(version)
          ? [...acc, { updated: true, version }]
          : [...acc, { updated: false, version }];
      }, []);

      spinner.stop()
      const cliSelection = await inquirer.prompt([
        {
          type: "list",
          name: "selectedVersion",
          message: "Select node version to update",
          choices: optionArray.map((item) => ({
            name: item.version,
            disabled: item.updated ? "Up to date" : false
          })),
        },
      ]);

      console.log(cliSelection);

      // const s0 = ora("Getting latest nvm version url").start();
      // const latestUrl = await asyncSpawn("bash", [
      //   "-c",
      //   "curl https://github.com/nvm-sh/nvm | rg wget | grep -oP 'https.*install.sh' | head -n 1",
      // ]);
      // s0.text = "Version accquired";
      // s0.succeed();
      // const s1 = ora("Downloading nvm install script").start();
      // const wgetRes = await asyncSpawn("wget", ["-qO-", latestUrl.trim()]);
      // s1.text = "Download completed";
      // s1.succeed();
      // const s2 = ora("installing and sourcing script").start();
      // const bashRes = await asyncSpawn("bash", ["-c", wgetRes]);
      // spawnSync("source", ["~/.bashrc"]);
      // s2.text = "Nvm installed and sourced";
      // s2.succeed();
      // console.log(bashRes.toString());
    });

  return updateNode;
};

export default nvmUpdateNode;
