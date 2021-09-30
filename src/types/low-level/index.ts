import { MetaData } from '../metadata'

export enum LowLevelFeature {
  AVG_LOUDNESS = 'lowlevel.average_loudness',
  DYN_COMPLEXITY = 'lowlevel.dynamic_complexity',
  REPLAY_GAIN = 'metadata.audio_properties.replay_gain',
  TAGS = 'metadata.tags',
  BEATS_COUNT = 'rhythm.beats_count',
  LOUDNESS_MEAN = 'rhythm.beats_loudness.mean',
  BPM = 'rhythm.bpm',
  FIRST_PEAK_BPM_MEAN = 'rhythm.bpm_histogram_first_peak_bpm.mean',
  SECOND_PEAK_BPM_MEAN = 'rhythm.bpm_histogram_second_peak_bpm.mean',
  DANCEABILITY = 'rhythm.danceability',
  ONSET_RATE = 'rhythm.onset_rate',
  CHORD_CHANGE_RATE = 'tonal.chords_changes_rate',
  CHORDS_KEY = 'tonal.chords_key',
  CHORDS_SCALE = 'tonal.chords_scale',
  KEY_KEY = 'tonal.key_key',
  KEY_SCALE = 'tonal.key_scale',
  KEY_STRENGTH = 'tonal.key_strength',
  TUNING_TEMPERED_DEV = 'tonal.tuning_equal_tempered_deviation',
  TUNING_FREQ = 'tonal.tuning_frequency',
}

type Data = {
  dmean: number[]
  dmean2: number[]
  dvar: number[]
  dvar2: number[]
  max: number[]
  mean: number[]
  median: number[]
  min: number[]
  var: number[]
}

type DataPoint = {
  dmean: number
  dmean2: number
  dvar: number
  dvar2: number
  max: number
  mean: number
  median: number
  min: number
  var: number
}

type RhythmData = {
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

type TonalData = {
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

// TODO rename?
type GFCC = {
  cov: number[][]
  icov: number[][]
  mean: number[]
}

type LowLevelData = {
  average_loudness: number
  barkData: Data
  barkData_crest: DataPoint
  barkData_flatness_db: DataPoint
  barkData_kurtosis: DataPoint
  barkData_skewness: DataPoint
  barkData_spread: DataPoint
  dissonance: DataPoint
  dynamic_complexity: number
  erbData: Data
  errData_crest: DataPoint
  errData_flatness_db: DataPoint
  errData_kurtosis: DataPoint
  errData_spread: DataPoint
  gfcc: GFCC
  hfc: DataPoint
  melData: Data
  melData_crest: DataPoint
  melData_flatness_db: DataPoint
  melData_kurtosis: DataPoint
  melData_skewness: DataPoint
  melData_spread: DataPoint
  mfcc: GFCC
  pitch_salience: DataPoint
  silence_rate_20db: DataPoint
  silence_rate_30db: DataPoint
  silence_rate_60db: DataPoint
  spectral_centroid: DataPoint
  spectral_complexity: DataPoint
  spectral_contrast_coeffs: Data
  spectral_contrast_valleys: Data
  spectral_decrease: DataPoint
  spectral_energy: DataPoint
  spectral_energyband_high: DataPoint
  spectral_energyband_low: DataPoint
  spectral_energyband_middle_high: DataPoint
  spectral_energyband_middle_low: DataPoint
  spectral_entropy: DataPoint
  spectral_flux: DataPoint
  spectral_kurtosis: DataPoint
  spectral_rms: DataPoint
  spectral_rolloff: DataPoint
  spectral_skewness: DataPoint
  spectral_spread: DataPoint
  spectral_strongpeak: DataPoint
  zerocrossingrate: DataPoint
}

export type LowLevelRecord = {
  lowlevel: LowLevelData
  metadata: MetaData
  rhythm: RhythmData
  tonal: TonalData
}
