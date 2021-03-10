export type Opaque<K extends symbol | string, T>
  = T & { [X in K]: never };