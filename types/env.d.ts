declare namespace Env {
  interface TLS {
    NODE_TLS_REJECT_UNAUTHORIZED: '1' | '0'
  }
}

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ProcessEnv extends
    Env.TLS
  {}
}
