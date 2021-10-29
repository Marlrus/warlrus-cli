import { Command } from "commander";
import { spawnSync } from "child_process";
import { asyncSpawn } from "../../utils/index.js";
import ora from "ora";

const nvmInstall = () => {
  const updateSystem = new Command("install");
  updateSystem.description("Updates/Installs nvm").action(async () => {
    const s0 = ora("Getting latest nvm version url").start();
    const latestUrl = await asyncSpawn("bash", [
      "-c",
      "curl https://github.com/nvm-sh/nvm | rg wget | grep -oP 'https.*install.sh' | head -n 1",
    ]);
    s0.text = "Version accquired";
    s0.succeed();
    const s1 = ora("Downloading nvm install script").start();
    const wgetRes = await asyncSpawn("wget", ["-qO-", latestUrl.trim()]);
    s1.text = "Download completed";
    s1.succeed();
    const s2 = ora("installing and sourcing script").start();
    const bashRes = await asyncSpawn("bash", ["-c", wgetRes]);
    spawnSync("source", ["~/.bashrc"]);
    s2.text = "Nvm installed and sourced";
    s2.succeed();
    console.log(bashRes.toString());
  });

  return updateSystem;
};

export default nvmInstall;
