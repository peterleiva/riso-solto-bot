import sstk from "shutterstock-api";
import { env } from "../utils/index.js";

/** @typedef {{query: string, per_page: number}} QueryParams */
/** @typedef {[{huge_thumb: {url: string}}]} Assets */

sstk.setAccessToken(env.sstk.token);

const imagesApi = new sstk.ImagesApi();

const smileQuery = {
  query: "smiling",
  per_page: 200,
};

/**
 * Query SSTK for pictures using the following search query pattern and
 * return its assets, which is a collection of urls
 *
 * @param {QueryParams} [queryParams = {query: 'smiling', per_page: 2000}]
 * @return {Assets}
 */
export async function getImage(queryParams = smileQuery) {
  try {
    const searchResult = await imagesApi.searchImages(queryParams);
    return searchResult.data;
  } catch (error) {
    console.error(error);
  }
}
