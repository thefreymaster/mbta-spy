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

export interface Vehicle {
  attributes: Attributes
  id: string
  links: Links
  relationships: Relationships
  type: string
}

export interface Attributes {
  bearing: number
  carriages: any[]
  current_status: string
  current_stop_sequence: number
  direction_id: number
  label: string
  latitude: number
  longitude: number
  occupancy_status: any
  speed: number
  updated_at: string
}

export interface Links {
  self: string
}

export interface Relationships {
  route: Route
  stop: Stop
  trip: Trip
}

export interface Route {
  data: Data
}

export interface Data {
  id: string
  type: string
}

export interface Stop {
  data: Data2
}

export interface Data2 {
  id: string
  type: string
}

export interface Trip {
  data: Data3
}

export interface Data3 {
  id: string
  type: string
}
