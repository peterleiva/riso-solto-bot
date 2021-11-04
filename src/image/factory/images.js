/** @typedef {[{text: string, type: 'photo'}]} Messages */

import createDebug from "debug";
import { getImage } from "./sstk.js";
import { Photo } from "../models/index.js";

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
    return dataset.map(data => {
      const photo = new Photo({
        url: data.assets.huge_thumb.url,
        source: {
          service: "shutterstock",
          serviceId: data.id,
          original: data,
        },
      });

      try {
        photo.save();
      } catch (error) {
        if (error?.code === 11000) {
          console.warn("photo(%d) already is save", photo.id);
        } else {
          throw error;
        }
      }
      return photo;
    });
  }

  return {
    /**
     *
     * @return {Promise<Images>}
     */
    create: async () => {
      const resultSet = await getImage();
      const photos = transform(resultSet);

      debug("found the following images %O", photos);

      return photos;
    },
  };
}
