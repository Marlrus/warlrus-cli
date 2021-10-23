import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { spawn } from "child_process";

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = path.resolve(path.dirname(__filename));
  return __dirname;
};

export const wait = promisify(setTimeout);

export const asyncSpawn = async (...spawnArgs) =>
  new Promise((res, rej) => {
    const cmd = spawn(...spawnArgs);
    let out = "";
    cmd.stdout.on("data", (data) => {
      out += data;
    });
    cmd.on("close", (code) => {
      if (code === 0) res(out);
      rej("Error");
    });
  });
