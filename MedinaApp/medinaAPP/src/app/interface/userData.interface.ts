export interface UserData {
  name: string,
  user: string,
  position: string
}

export interface DataLogin {
  user: string,
  password: string
}

export interface responseDataLogin {
  data: UserData,
  status: string,
  message: string
}
