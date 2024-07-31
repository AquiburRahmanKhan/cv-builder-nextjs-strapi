"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./../utils/fetch-api";

import Loader from "./Loader";
import { Doctor } from "./../utils/model";
import Link from "next/link";
import Media from "./Media";
import { renderButtonStyle } from "../utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface AllDoctorsProps {
  data: {
    id: string;
    title: string;
    description: string;
    button: Button;
  };
}

export default function AllDoctors({ data: dataFromStrapi }: AllDoctorsProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/doctors`;
      const urlParamsObject = {
        sort: { name: "asc" },
        populate: {
          photo: "*",
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (isLoading) return <Loader />;

  return (
    <section className="container p-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex justify-center">
            <h1 className="text-4xl">{dataFromStrapi.title}</h1>
          </div>
          <div className="flex justify-center my-4">
            <p>{dataFromStrapi.description}</p>
          </div>
        </div>
        <div>
          {dataFromStrapi.button ? (
            <Link
              href={dataFromStrapi.button.url}
              target={dataFromStrapi.button.newTab ? "_blank" : "_self"}
              className={renderButtonStyle(dataFromStrapi.button.type)}
            >
              {dataFromStrapi.button.text}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((doctor: Doctor) => (
          <Link
            href={`/doctors/${doctor.attributes.url}`}
            className="flex"
            key={doctor.id}
          >
            <div
              className="flex flex-col items-center justify-center
              h-auto w-full text-center"
            >
              <div className="w-full">
                <Media data={doctor.attributes.photo} />
              </div>
              <div className="py-1 bg-green-600 w-full rounded-b-md">
                <p>{doctor.attributes.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
