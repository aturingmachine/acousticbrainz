import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { toQueryString } from '../utils/http'
import { HighLevelData } from '~/models/high-level'
import { LowLevelData, LowLevelFeature } from '~/models/low-level'
import { AcousticBrainzResponse } from '~/models/response'

const acousticBrainzBaseUrl = 'https://acousticbrainz.org'

export class AcousticBrainz {
  private static ApiPaths = {
    highLevel: '/api/v1/high-level',
    lowLevel: '/api/v1/low-level',
    count: '/api/v1/count',
    dataset: '/api/v1/datasets/(uuid: dataset_id)',
    similarity: '/api/v1/similarity/(metric)/between/',
  }

  private http!: AxiosInstance

  limit!: number
  limitRemaining = 1
  resetsIn = 0
  resetsAt: number = Date.now()

  constructor(private apiKey?: string) {
    this.http = axios.create({
      baseURL: acousticBrainzBaseUrl,
      headers: apiKey
        ? {
            Authorization: this.apiKey,
          }
        : {},
    })
  }

  async getHighLevel(
    recordingIds: string[]
  ): Promise<AcousticBrainzResponse<HighLevelData>> {
    return this.makeRequest(AcousticBrainz.ApiPaths.highLevel, {
      params: {
        recording_ids: toQueryString(recordingIds),
      },
    })
  }

  async getLowLevel(
    recordingIds: string[],
    features?: LowLevelFeature[]
  ): Promise<AcousticBrainzResponse<LowLevelData>> {
    return this.makeRequest(
      `${AcousticBrainz.ApiPaths.lowLevel}?${toQueryString(
        recordingIds,
        'recording_ids'
      )}`,
      {
        params: {
          features: toQueryString(features || []),
        },
      }
    )
  }

  // TODO implement rate limiting
  private async makeRequest<T>(
    path: string,
    config: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.http.get<T>(path, config)

    this.limit = response.headers['X-RateLimit-Limit']
    this.limitRemaining = response.headers['X-RateLimit-Remaining']
    this.resetsIn = response.headers['X-RateLimit-Rest-In']
    this.resetsAt = response.headers['X-RateLimit-Reset']

    return response.data
  }
}

/**
 * 
    X-RateLimit-Limit: Number of requests allowed in given time window
    X-RateLimit-Remaining: Number of requests remaining in current time window
    X-RateLimit-Reset-In: Number of seconds when current time window expires (recommended: this header is resilient against clients with incorrect clocks)
    X-RateLimit-Reset: UNIX epoch number of seconds (without timezone) when current time window expires [1]

 */
