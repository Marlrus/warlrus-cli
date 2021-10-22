import { Command } from "commander";
import { spawnSync } from "child_process";
import { wait } from "../utils/index.js";
import ora from "ora";

const test = () => {
  const test = new Command("test");
  test
    .description("TEST")
    .option("-t, --test", "test option")
    .argument("<search_term>")
    .action(async (arg, options) => {
      // console.log({ arg, options });
      const spinner1 = ora("Running RG1").start();

      const rg = spawnSync("rg", [arg], { encoding: "utf8" });
      await wait(1000);

      spinner1.text = "RG1 Completed"
      spinner1.succeed()

      const spinner2 = ora("Running RG2").start();
      const rg2 = spawnSync("rg", ["description"], {
        input: rg.stdout,
        encoding: "utf8",
      });
      await wait(1000);
      spinner2.text = "RG2 complete";
      spinner2.succeed()

      const spinner3 = ora("Processing with awk").start()
      const awk = spawnSync("awk", ["{print substr($1, 1, length($1)-1)}"], {
        input: rg2.stdout,
        encoding: "utf8",
      });
      await wait(1000);
      spinner3.text = "Processing complete";
      spinner3.succeed();
      console.log(awk.stdout);
    });

  return test;
};

export default test;
