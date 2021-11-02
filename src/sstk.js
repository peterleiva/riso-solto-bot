import config from "./env.js";

import sstk from "shutterstock-api";
sstk.setAccessToken(config.sstk.token);

const imagesApi = new sstk.ImagesApi();

const queryParams = {
  query: "smiling",
  per_page: 200,
};

export async function getImage() {
  try {
    const searchResult = await imagesApi.searchImages(queryParams);
    return searchResult.data.map(d => d.assets);
  } catch (error) {
    console.error(error);
  }
}
