import AllDepartments from "../components/AllDepartments";
import AllDoctors from "../components/AllDoctors";
import Hero from "../components/Hero";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.all-doctors":
      return <AllDoctors key={index} data={section} />;
    case "sections.all-departments":
      return <AllDepartments key={index} data={section} />;
    default:
      return null;
  }
}
