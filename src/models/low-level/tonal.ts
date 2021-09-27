import { Data, DataPoint } from './shared'

export type TonalData = {
  chords_change_rate: number
  chords_histogram: number[]
  chords_key: string
  chords_number_rate: number
  chords_scale: string
  chords_strength: DataPoint
  hpcp: Data
  hpcp_entropy: Data
  key_key: string
  key_scale: string
  key_strength: number
  thpcp: number[]
  tuning_diatonic_strength: number
  tuning_equal_tempered_deviation: number
  tuning_frequency: number
  tuning_nontempered_energy_ratio: number
}
