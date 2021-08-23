declare module 'log-with-style' {
  interface Styler {
    (...args: string[]): string
  }

  let styler: Styler
  export default styler
}
