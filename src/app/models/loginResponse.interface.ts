//src/app/models/loginResponse.interface.ts
export interface LoginResponse {
  token : string
  user: {
    'id' : number,
    'nombre' : string,
    'numeroDeContacto' : string,
    'email' : string,
    'password' : string,
    'estado' : string,
    'rol' : string,
  }
}
