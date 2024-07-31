type StrapiResponse<T> = {
  data: T;
  message: string;
};

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

export interface Department {
  id: number;
  attributes: {
    createdAt: string;
    description: string;
    name: string;
    url: string;
    updatedAt: string;
    publishedAt: string;
    doctors: {
      data: Doctor[];
    };
  };
}

export interface Doctor {
  id: number;
  attributes: {
    createdAt: string;
    degrees: string;
    designation: string;
    name: string;
    publishedAt: string;
    roomNo: string;
    specialty: string;
    updatedAt: string;
    visitingHours: string;
    url: string;
    photo: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
          caption: string;
          width: number;
          height: number;
        };
      };
    };
  };
}
