import { Command } from "commander";
import { spawnSync } from "child_process";
import { asyncSpawn } from "../../utils/index.js";
import ora from "ora";

const nvmInstall = () => {
  const updateSystem = new Command("get-keys");
  updateSystem
    .description(
      "Downloads latest pub keys from electrum repo and adds them to gpg keychain"
    )
    .action(async () => {
      const s0 = ora(
        "Downloading keys for ThomasV, somernight, and Emzy."
      ).start();
      const downloadThomasV = await asyncSpawn("wget", [
        "-q",
        "--show-progress",
        "https://raw.githubusercontent.com/spesmilo/electrum/master/pubkeys/ThomasV.asc",
      ]);
      const downloadSombernight = await asyncSpawn("wget", [
        "-q",
        "--show-progress",
        "https://raw.githubusercontent.com/spesmilo/electrum/master/pubkeys/sombernight_releasekey.asc",
      ]);
      const downloadEmzy = await asyncSpawn("wget", [
        "-q",
        "--show-progress",
        "https://raw.githubusercontent.com/spesmilo/electrum/master/pubkeys/Emzy.asc",
      ]);
      s0.text = "Keys downloaded";
      s0.succeed();
    });

  return updateSystem;
};

export default nvmInstall;
