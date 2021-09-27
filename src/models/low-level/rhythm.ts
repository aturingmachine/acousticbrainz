import { Data, DataPoint } from './shared'

export type RhythmData = {
  beats_count: number
  beats_loudness: DataPoint
  beats_loudness_band_ratio: Data
  beats_position: number[]
  bpm: number
  bpm_histogram_first_peak_bpm: DataPoint
  bpm_histogram_first_peak_spread: DataPoint
  bpm_histogram_first_peak_weight: DataPoint
  bpm_histogram_second_peak_bpm: DataPoint
  bpm_histogram_second_peak_spread: DataPoint
  bpm_histogram_second_peak_weight: DataPoint
  danceability: number
  onset_rate: number
}
