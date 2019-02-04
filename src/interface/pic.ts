export interface Pic {
  file_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
  thumbnails: object;
  screenshot? : string;
  tag? : string;
}

export interface User {
  user_id?: number,
  username: string,
  password?: string,
  re_password?: string,
  email?: string,
  full_name?: string,
  time_created?: Date
}

export interface LogInResponse {
  message: string,
  token: string,
  user: User
}

export interface CheckExistResponse {
  username: string,
  available: boolean
}

export interface UploadResponse {
  message: string,
  file_id: number
}
