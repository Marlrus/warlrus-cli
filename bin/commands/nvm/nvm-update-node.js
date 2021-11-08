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
      const installedVersions = nvmInstalledVersions
        .split("\x1B[0m\n")
        .filter((version) => version !== "");

      // Get latest versions
      spinner.text = "Getting node latest versions"
      const nvmLtsList = await asyncSpawn(
        path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
        ["list-lts"],
      );

      const availableVersions = [
        ...new Set(
          nvmLtsList
            .split("\x1B[0m\n")
            .filter((version) => version !== "")
            .sort((a, b) => b.split(".")[0] - a.split(".")[0])
        ),
      ];

      const optionArray = availableVersions.reduce((acc, version) => {
        return installedVersions.includes(version)
          ? [...acc, { updated: true, version }]
          : [...acc, { updated: false, version }];
      }, []);

      spinner.stop()
      const { selectedVersion } = await inquirer.prompt([
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

      spinner.text = `Installing node version ${selectedVersion} `
      spinner.start()
      await asyncSpawn(
        path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
        ["install-version", selectedVersion]
      )
      spinner.stop()
    });

  return updateNode;
};

export default nvmUpdateNode;
