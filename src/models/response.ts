export type AcousticBrainzResponse<T> = {
  [key: string]: {
    [key: number]: T
  }
}
