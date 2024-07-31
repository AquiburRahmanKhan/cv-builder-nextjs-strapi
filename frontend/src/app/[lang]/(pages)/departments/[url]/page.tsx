"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../../../utils/fetch-api";

import Loader from "../../../components/Loader";
import { Department, Doctor } from "../../../utils/model";
import Link from "next/link";
import Media from "../../../components/Media";

export default function DepartmentDetails({
  params,
}: {
  params: { url: string };
}) {
  const [data, setData] = useState<Department | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchDepartment = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/departments`;
      const urlParamsObject = {
        filters: {
          url: {
            $eq: params.url,
          },
        },
        populate: {
          doctors: {
            populate: {
              photo: "*",
            },
          },
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.url]);

  useEffect(() => {
    fetchDepartment();
  }, [fetchDepartment]);

  if (isLoading) return <Loader />;

  return (
    <section className="container p-6 mx-auto">
      {data?.attributes ? (
        <>
          <div>
            <h1 className="text-4xl">DEPARTMENT OF {data?.attributes.name}</h1>
          </div>
          <div className="my-6">
            <p>DEPARTMENT OF {data?.attributes.description}</p>
          </div>
          <div className="mt-6">
            <p className="text-2xl">SPECIALIST DOCTORS</p>
          </div>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.attributes.doctors.data.map((doctor: Doctor) => (
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
        </>
      ) : null}
    </section>
  );
}
