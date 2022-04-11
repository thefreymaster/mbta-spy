export interface Route {
  attributes: Attributes;
  id: string;
  links: Links;
  relationships: Relationships;
  type: string;
}
export interface Attributes {
  color: string;
  description: string;
  direction_destinations?: string[] | null;
  direction_names?: string[] | null;
  fare_class: string;
  long_name: string;
  short_name: string;
  sort_order: number;
  text_color: string;
  type: number;
}
export interface Links {
  self: string;
}
export interface Relationships {
  line: Line;
}
export interface Line {
  data: Data;
}
export interface Data {
  id: string;
  type: string;
}
