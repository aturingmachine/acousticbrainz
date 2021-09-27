export type AudioProperties = {
  analysis_sample_rate: number
  bit_rate: number
  code: string
  downmix: string
  equal_loudness: number
  length: number
  lossless: boolean
  md5_encoded: string
  replay_gain: number
  sample_rate: number
}

export type MetaData = {
  audio_properties: AudioProperties
  tags: Record<string, string[]>
}
