import { Data, DataPoint } from './shared'

// TODO rename?
export type GFCC = {
  cov: number[][]
  icov: number[][]
  mean: number[]
}

export type LowLevelData = {
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
