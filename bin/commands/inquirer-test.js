import { Command } from "commander";
import inquirer from "inquirer";
import { asyncSpawn, wait } from "../utils/index.js";

const inquirerTest = () => {
  const inquirerCommand = new Command("inquirer");
  inquirerCommand.description("Testing inquirer").action(async () => {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "answer",
        message: "ls or ll?",
        choices: [
          {
            name: "ls",
            message: "ls",
          },
          {
            name: "ll",
            message: "ll",
          },
        ],
      },
    ]);
    if(answers.answer.includes("ls")){
      const ls = await asyncSpawn("ls",[])
      await wait(2000)
      console.log(ls)
    }
    if(answers.answer.includes("ll")){
      const ll = await asyncSpawn("ls",["-l"])
      await wait(2000)
      console.log(ll)
    }
  });

  return inquirerCommand;
};

export default inquirerTest;
