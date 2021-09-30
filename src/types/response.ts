export type AcousticBrainzResponse<T> = {
  /**
   * The MusicBrainz ID of the recording
   */
  [recordingId: string]: {
    [matchIndex: number]: T
  }
}
