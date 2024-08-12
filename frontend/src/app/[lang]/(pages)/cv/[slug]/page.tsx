import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFillLaptopFill } from "react-icons/bs";
import { fetchAPI } from "../../../utils/fetch-api";
import { Employee } from "@/app/[lang]/utils/model";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { Fragment } from "react";

const fetchEmployee = async (slug: string) => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = "/employees";
    const urlParamsObject = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        avatar: "*",
        educations: "*",
        experiences: {
          fields: "*",
          populate: {
            detailedPoints: "*",
          },
        },
        projects: {
          fields: "*",
          populate: {
            detailedPoints: "*",
          },
        },
        techStacks: "*",
        tools: "*",
        skills: "*",
        languages: "*",
      },
      sort: { name: "asc" },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    responseData.data[0].attributes.avatarImageUrl = getStrapiMedia(
      responseData.data[0].attributes.avatar.data.attributes.url
    );

    return responseData.data[0];
  } catch (error) {
    console.error(error);
  }
};

const CVBuilder = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const employee: Employee = await fetchEmployee(slug);

  return (
    <div className="bg-black">
      <div className="bg-white max-w-[210mm] mx-auto px-10 min-h-screen">
        {/* Personal information section */}
        <section className="flex w-full border-b border-black pb-8 px-6">
          {/* Avatar */}
          <div className="w-2/5">
            <div className="w-fit">
              <div className="rounded-full overflow-hidden relative w-[200px] h-[200px] border-[20px] border-white drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                <Image
                  src={employee.attributes.avatarImageUrl as string}
                  alt="Avatar pic"
                  fill
                  className="object-cover"
                  sizes="200px"
                  priority
                />
              </div>
            </div>
          </div>
          {/* Personal details */}
          <div className="w-3/5 pt-4 flex flex-col gap-14">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-4xl font-poppinsBold tracking-wider uppercase">
                  {employee.attributes.name}
                </h1>
              </div>
              <div>
                <h1 className="text-xl font-poppinsLight tracking-widest">
                  {employee.attributes.designation}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center bg-black w-5 h-5">
                  <FaPhone className="text-xs text-white" />
                </div>
                <p className="font-poppinsLight text-sm">
                  {employee.attributes.phone}
                </p>
              </div>
              {employee.attributes.website ? (
                <div className="flex gap-2 items-center">
                  <div className="flex justify-center items-center bg-black w-5 h-5">
                    <BsFillLaptopFill className="text-sm text-white" />
                  </div>
                  <p className="font-poppinsLight text-sm">
                    {employee.attributes.website}
                  </p>
                </div>
              ) : null}
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center bg-black w-5 h-5">
                  <MdEmail className="text-sm text-white" />
                </div>
                <p className="font-poppinsLight text-sm">
                  {employee.attributes.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="flex w-full pt-8">
          <div className="flex flex-col gap-10 w-1/3">
            {/* Education */}
            {employee.attributes.educations.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-poppinsBold text-xl">EDUCATION</h2>
                <div className="flex flex-col gap-6">
                  {employee.attributes.educations.map((education, index) => (
                    <Fragment key={index}>
                      <div className="flex flex-col gap-1">
                        {education.degree ? (
                          <h3 className="font-poppinsSemiBold text-lg">
                            {education.degree}
                          </h3>
                        ) : null}
                        <p className="font-poppinsSemiBold text-sm">
                          {education.institution}
                        </p>
                        <p className="font-poppinsLight text-sm  tracking-widest">
                          {education.dateRange}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tech Stack */}
            {employee.attributes.techStacks.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-poppinsBold text-xl">TECH STACK</h2>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 list-disc ml-[14px] pr-5">
                  {employee.attributes.techStacks.map((techStack, index) => (
                    <Fragment key={index}>
                      <li key={index} className="font-poppinsThin text-xs">
                        {techStack.point}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Tools */}
            {employee.attributes.tools.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-poppinsBold text-xl">TOOLS</h2>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 list-disc ml-[14px] pr-5">
                  {employee.attributes.tools.map((tool, index) => (
                    <Fragment key={index}>
                      <li key={index} className="font-poppinsThin text-xs">
                        {tool.point}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Skills */}
            {employee.attributes.skills.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-poppinsBold text-xl">SKILLS</h2>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 list-disc ml-[14px] pr-5">
                  {employee.attributes.skills.map((skill, index) => (
                    <Fragment key={index}>
                      <li key={index} className="font-poppinsThin text-xs">
                        {skill.point}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Languages */}
            {employee.attributes.languages.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-poppinsBold text-xl">LANGUAGE</h2>
                <ul className="flex flex-col gap-1 list-disc ml-[14px] pr-5">
                  {employee.attributes.languages.map((language, index) => (
                    <Fragment key={index}>
                      <li key={index} className="font-poppinsThin text-xs">
                        {language.point}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-10 w-2/3 border-l border-black pl-[60px]">
            {/* Profile */}
            <div className="flex flex-col gap-6">
              <h2 className="font-poppinsBold text-xl">PROFILE</h2>
              <p className="font-poppinsThin text-sm whitespace-pre-wrap tracking-wider leading-6">
                {employee.attributes.profile}
              </p>
            </div>

            {/* Experiences */}
            {employee.attributes.experiences.length > 0 ? (
              <div className="flex flex-col gap-6">
                <h2 className="font-poppinsBold text-xl">EXPERIENCE</h2>
                <div className="flex flex-col gap-6">
                  {employee.attributes.experiences.map((experience, index) => (
                    <Fragment key={index}>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-poppinsSemiBold text-lg">
                            {experience.companyName}
                          </h3>
                          <p className="font-poppinsSemiBold text-xs tracking-widest">
                            {experience.duration}
                          </p>
                        </div>
                        <p className="font-poppinsLight text-sm">
                          {experience.role}
                        </p>
                        <ul className="flex flex-col gap-2 list-disc ml-[14px]">
                          {experience.detailedPoints.map((point, index) => (
                            <li
                              key={index}
                              className="font-poppinsThin text-sm"
                            >
                              {point.detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Projects */}
            {employee.attributes.projects.length > 0 ? (
              <div className="flex flex-col gap-6">
                <h2 className="font-poppinsBold text-xl">PROJECTS</h2>
                <div className="flex flex-col gap-6">
                  {employee.attributes.projects.map((project, index) => (
                    <Fragment key={index}>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-poppinsSemiBold text-lg">
                            {project.projectName}
                          </h3>
                          <p className="font-poppinsSemiBold text-xs tracking-widest">
                            {project.duration}
                          </p>
                        </div>
                        <p className="font-poppinsLight text-sm">
                          {project.role}
                        </p>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            className="font-poppinsLight text-sm"
                          >
                            {project.link}
                          </a>
                        ) : null}
                        <ul className="flex flex-col gap-2 list-disc ml-[14px]">
                          {project.detailedPoints.map((point, index) => (
                            <li
                              key={index}
                              className="font-poppinsThin text-sm"
                            >
                              {point.detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVBuilder;
