export interface Attribute {
  url: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Picture {
  data: Data;
}

export interface Button {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  type: string;
}

export interface ContentSection {
  id: number;
  __component: string;
  title: string;
  description: string;
  picture: Picture;
  buttons: Button[];
}

export interface Attribute {
  shortName: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  heading?: any;
  description?: any;
  contentSections: ContentSection[];
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface RootObject {
  data: Data[];
  meta: Meta;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  dateRange: string;
}

export interface DetailedPoint {
  id: number;
  detail: string;
}

export interface Point {
  id: number;
  point: string;
}

export interface Experience {
  id: number;
  companyName: string;
  role: string;
  duration: string;
  detailedPoints: DetailedPoint[];
}

export interface TechStacks {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
}

export interface Project {
  data: {
    id: number;
    attributes: {
      name: string;
      intro: string;
      link: string;
      duration: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface Projects {
  id: number;
  duration: string;
  role: string;
  identifier: string;
  detailedPoints: DetailedPoint[];
  techStacks: TechStacks;
  project: Project;
}

export interface Employee {
  id: number;
  attributes: {
    slug: string;
    name: string;
    designation: string;
    email: string;
    phone: string;
    website?: string;
    avatar: Picture;
    avatarImageUrl?: string;
    educations: Education[];
    profile: string;
    experiences: Experience[];
    projects: Projects[];
    techStacks: TechStacks;
    tools: Point[];
    skills: Point[];
    languages: Point[];
  };
}
