import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MARKDOWN_FILE = resolve(__dirname, "./help.md");

async function readHelp() {
  try {
    const file = await readFile(MARKDOWN_FILE);
    return file.toString();
  } catch (error) {
    console.error("Markdown not found: %s", MARKDOWN_FILE);
    console.error(error);

    return "";
  }
}

export async function help(ctx) {
  ctx.replyWithMarkdown(await readHelp());
}
