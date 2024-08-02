import { fetchAPI } from "../../utils/fetch-api";
import { Doctor } from "../../utils/model";
import Link from "next/link";
import Media from "../../components/Media";

const fetchDoctors = async () => {
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

    return responseData.data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Doctors() {
  const data = await fetchDoctors();

  return (
    <section className="container p-6 mx-auto">
      <div>
        <h1 className="text-4xl">DOCTORS</h1>
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
