export class Usuario {
  constructor(
    public email: string,
    public password: string,
    public nombre?: string,
    public idUsuario?: number,
    public picture?: string,
    public google?: boolean,
    public activo?: boolean,
    public nativo?: boolean
  ){}
}
