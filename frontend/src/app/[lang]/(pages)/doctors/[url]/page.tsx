"use client";
import { useState, useEffect } from "react";
import { Doctor } from "../../../utils/model";
import Media from "../../../components/Media";
import { fetchDoctor } from "./api";

export default function DoctorDetails({ params }: { params: { url: string } }) {
  const [data, setData] = useState<Doctor | null>();

  const getDoctorDetails = async () => {
    const doctorDetails: Doctor = await fetchDoctor(params);
    setData(doctorDetails);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

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
