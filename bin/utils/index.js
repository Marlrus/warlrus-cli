import path from "path";
import { fileURLToPath } from "url";

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = path.resolve(path.dirname(__filename));
  return __dirname;
};
