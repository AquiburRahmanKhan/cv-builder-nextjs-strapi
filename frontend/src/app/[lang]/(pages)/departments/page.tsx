"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../../utils/fetch-api";

import Loader from "../../components/Loader";
import { Department } from "../../utils/model";
import Link from "next/link";

export default function Departments() {
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
      <div>
        <h1 className="text-4xl">DEPARTMENTS</h1>
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
