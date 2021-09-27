import { MetaData } from '../metadata'

export type HighLevelProbability = {
  probability: number
  values: string
}

export type HighLevelData = {
  danceability: HighLevelProbability
  gender: HighLevelProbability
  genre_dortmund: HighLevelProbability
  genre_electronic: HighLevelProbability
  genre_rosamerica: HighLevelProbability
  genre_tzanetakis: HighLevelProbability
  ismir04_rhythm: HighLevelProbability
  mood_acoustic: HighLevelProbability
  mood_aggressive: HighLevelProbability
  mood_electronic: HighLevelProbability
  mood_happy: HighLevelProbability
  mood_party: HighLevelProbability
  mood_relaxed: HighLevelProbability
  mood_sad: HighLevelProbability
  timbre: HighLevelProbability
  tonal_atonal: HighLevelProbability
  voice_instrumental: HighLevelProbability
  metadata: MetaData
}
