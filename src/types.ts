export type ServerConfig = {
  port: number,
}

export namespace Posts {
  export type Post = {
    id: number,
    title: string,
    data: string,
  }

  export namespace List {
    export type Req = {
      id: number,
    }
  }
}
