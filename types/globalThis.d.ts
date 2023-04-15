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
/**
 * Extracts type of array element.
 */
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

/**
 * A callback interface for handling asynchronous results.
 * @template T
 * - T: The type of the parameters passed to the callback, which must be an array.
 * @template R
 * - R: The type of the return value of the callback, which is optional and defaults to any.
 * @callback NodeCallback
 * @param {Error} [error] An error that occurred while executing the operation.
 * @param {...T} params An array of parameters of type T.
 * @returns {R}
 */
interface NodeCallback<T extends Array<any>, R = any> {
  (error?: null, ...params: T): R
  (error?: Error, ...params: never[]): R
  (...params?: never[]): R
}

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]
