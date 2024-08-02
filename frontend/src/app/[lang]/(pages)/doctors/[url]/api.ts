"use server";

import { fetchAPI } from "../../../utils/fetch-api";

export const fetchDoctor = async (params: { url: string }) => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/doctors`;
    const urlParamsObject = {
      filters: {
        url: {
          $eq: params.url,
        },
      },
      populate: {
        photo: "*",
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData.data[0];
  } catch (error) {
    console.error(error);
  }
};
