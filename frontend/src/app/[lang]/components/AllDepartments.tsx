"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./../utils/fetch-api";

import Loader from "./../components/Loader";
import { Department } from "./../utils/model";
import Link from "next/link";
import { renderButtonStyle } from "../utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface AllDepartmentsProps {
  data: {
    id: string;
    title: string;
    description: string;
    button: Button;
  };
}

export default function AllDepartments({
  data: dataFromStrapi,
}: AllDepartmentsProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/departments`;
      const urlParamsObject = {
        sort: { name: "asc" },
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
    fetchDepartments();
  }, [fetchDepartments]);

  if (isLoading) return <Loader />;

  return (
    <section className="container p-6 mx-auto">
      <div className="flex items-center gap-4 justify-between">
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
              className={`block w-52 ${renderButtonStyle(
                dataFromStrapi.button.type
              )}`}
            >
              {dataFromStrapi.button.text}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="py-6 grid grid-cols-4 gap-4">
        {data.map((department: Department) => (
          <Link
            href={`/departments/${department.attributes.url}`}
            className="flex"
            key={department.id}
          >
            <div
              className="flex items-center justify-center w-full
              py-2 px-4 bg-green-600 text-center rounded-md"
            >
              <p>{department.attributes.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
