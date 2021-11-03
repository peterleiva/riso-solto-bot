/** @typedef {[{text: string, type: 'photo'}]} Messages */

import createDebug from "debug";
import { getImage } from "./sstk.js";
import Photo from "./photo.js";

const debug = createDebug("factory:images");

/**
 * Message factory, creates message tokens
 *
 * @returns {{create: () => Promise<Messages>}}
 */
export function imageFactory() {
  /**
   * @param {Assets} dataset
   * @return {Images}
   */
  function transform(dataset) {
    return dataset.map(
      asset =>
        new Photo({
          url: asset.huge_thumb.url,
        })
    );
  }

  return {
    /**
     *
     * @return {Promise<Images>}
     */
    create: async () => {
      const resultSet = await getImage();

      debug("found the following images %O", resultSet);

      return transform(resultSet);
    },
  };
}
