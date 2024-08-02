import { fetchAPI } from "./../utils/fetch-api";
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

export default async function AllDepartments({
  data: dataFromStrapi,
}: AllDepartmentsProps) {
  const data = await fetchDepartments();

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
