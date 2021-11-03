/** @typedef {string[]} Dataset */
/** @typedef {[{text: string, type: 'text'}]} Messages */

import { readFile } from "fs/promises";
import createDebug from "debug";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import Text from "./text.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const debug = createDebug("factory:message");
const DATASET_PATH = resolve(__dirname, "../dataset.json");

/**
 *
 * @return {Dataset}
 */
async function loader() {
  try {
    const content = await readFile(DATASET_PATH, "utf-8");
    debug("dataset read %s", DATASET_PATH);

    const dataset = JSON.parse(content);
    debug("dataset: %O", dataset);

    return dataset;
  } catch (error) {
    console.error("Couldn't load src/dataset");
    console.error(error);
  }
}

/**
 * Message factory, creates message tokens
 *
 * @returns {{create: () => Promise<Messages>}}
 */
export function messageFactory() {
  let dataset;

  /**
   * @param {Dataset}
   * @return {Messages}
   */
  function transform(dataset) {
    return dataset.map(data => new Text({ text: data }));
  }

  return {
    /**
     *
     * @return {Promise<Messages>}
     */
    create: async () => {
      if (!dataset) {
        dataset = transform(await loader());
      }

      return dataset;
    },
  };
}
