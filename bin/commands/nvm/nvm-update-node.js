import { Command } from "commander";
import { spawnSync } from "child_process";
import { asyncSpawn } from "../../utils/index.js";
import inquirer from "inquirer";
import ora from "ora";

const nvmUpdateNode = () => {
  const updateNode = new Command("update-node");
  updateNode
    .description(
      "Updates node version and moves npm packages from previous version."
    )
    .action(async () => {
      // Get current versions
      const nvmList = spawnSync("~/.nvm/nvm.sh", ["list"], {shell: true}); //"nvm ls | sed -n '/default/q;s/^.*v//p'"])
      console.log(nvmList.stdout.toString());
      console.log(nvmList.stderr.toString());
      return
      const nodeVersions = await asyncSpawn(
        "sed",
        ["-n", "sed -n '/default/q;s/^.*v//p'"],
        { input: nvmList }
      );
      console.log(nodeVersions);
      console.log(nodeVersions.split("\n"));

      // Prompt question of which version to update

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
