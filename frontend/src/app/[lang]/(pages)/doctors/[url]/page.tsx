"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../../../utils/fetch-api";

import Loader from "../../../components/Loader";
import { Doctor } from "../../../utils/model";
import Link from "next/link";
import Media from "../../../components/Media";

export default function DoctorDetails({ params }: { params: { url: string } }) {
  const [data, setData] = useState<Doctor | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchDoctor = useCallback(async () => {
    setLoading(true);
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

      setData(responseData.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.url]);

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

  if (isLoading) return <Loader />;

  return (
    <section className="container p-6 mx-auto">
      {data?.attributes ? (
        <>
          <div className="mt-6">
            <p className="text-4xl">{data.attributes.name}</p>
          </div>
          <div className="py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <Media data={data.attributes.photo} />
            </div>
            <div className="flex flex-col gap-4 md:grid-cols-2 lg:col-span-3">
              <b className="text-2xl">Doctor Details</b>
              <p>
                <b>Name:</b> {data.attributes.name}
              </p>
              <p>
                <b>Speciality:</b> {data.attributes.specialty}
              </p>
              <p>
                <b>Designation:</b> {data.attributes.designation}
              </p>
              <p>
                <b>Room no:</b> {data.attributes.roomNo}
              </p>
              <p>
                <b>Visiting Hours:</b> {data.attributes.visitingHours}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
