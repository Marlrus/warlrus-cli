import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = path.resolve(path.dirname(__filename));
  return __dirname;
};

export const wait = promisify(setTimeout);
