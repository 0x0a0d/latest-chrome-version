declare namespace globalThis {
  interface Error {
    /**
     * Additional data related to the error.
     *
     * @type {any}
     */
    data: any

    /**
     * A code to identify the error.
     *
     * @type {string | number}
     */
    code: string | number
  }
}
