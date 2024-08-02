import { fetchAPI } from "../../utils/fetch-api";
import { Department } from "../../utils/model";
import Link from "next/link";

const fetchDepartments = async () => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/departments`;
    const urlParamsObject = {
      sort: { name: "asc" },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData.data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Departments({
  params,
}: {
  params: { url: string };
}) {
  const url = params.url;
  const data = await fetchDepartments();

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
