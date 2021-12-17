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
      try {
        // Get current versions
        const spinner = ora("Getting installed node versions").start();
        const nvmInstalledVersions = await asyncSpawn(
          path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
          ["list-installed"]
        );
        const installedVersions = nvmInstalledVersions
          .split("\x1B[0m\n")
          .filter((version) => version !== "");

        // Get latest versions
        spinner.text = "Getting node latest versions";
        const nvmLtsList = await asyncSpawn(
          path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
          ["list-lts"]
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

        spinner.stop();

        const { versionToUpdateTo } = await inquirer.prompt([
          {
            type: "list",
            name: "versionToUpdateTo",
            message: "Select node version to update",
            choices: optionArray.map((item) => ({
              name: item.version,
              disabled: item.updated ? "Up to date" : false,
            })),
          },
        ]);

        spinner.text = `Installing node version ${versionToUpdateTo} `;
        spinner.start();
        console.log({ availableVersions });
        console.log({ optionArray });
        console.log({ versionToUpdateTo });
        await asyncSpawn(
          path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
          ["install-version", versionToUpdateTo]
        );
        spinner.stop();

        const skipOptionName = "Skip option";
        // Ask from where to move packages
        const { sourcePackage } = await inquirer.prompt([
          {
            type: "list",
            name: "sourcePackage",
            message: "Move global packages from which node version?",
            choices: [
              { name: skipOptionName },
              ...availableVersions.map((item) => ({
                name: item,
              })),
            ],
          },
        ]);

        console.log({ sourcePackage });

        if (sourcePackage === skipOptionName) return;

        spinner.text = `Moving packages from node ${sourcePackage} to node ${versionToUpdateTo}`;
        spinner.start();
        await asyncSpawn(
          path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
          ["move-npm-packages", versionToUpdateTo, sourcePackage]
        );
        spinner.stop();

        // Ask confirmation to remove previous version
        const { deletePackage } = await inquirer.prompt([
          {
            type: "confirm",
            name: "deletePackage",
            message: `Do you wish to delete the source node version? (${sourcePackage})`,
          },
        ]);

        console.log({ deletePackage });

        if (!deletePackage) return;

        spinner.text = `Deleting node version ${sourcePackage}`;
        spinner.start();
        await asyncSpawn(
          path.resolve(__dirname, "./nvm-scripts/nvm-manager.sh"),
          ["delete-version", sourcePackage]
        );
        spinner.stop();
      } catch (err) {
        console.log(err);
      }
    });

  return updateNode;
};

export default nvmUpdateNode;
