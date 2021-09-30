import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HighLevelRecord } from '~/types/high-level'
import { LowLevelFeature, LowLevelRecord } from '~/types/low-level'
import { AcousticBrainzResponse } from '~/types/response'

const acousticBrainzBaseUrl = 'https://acousticbrainz.org'

const RateLimitHeaders = {
  RateLimit: 'x-ratelimit-limit',
  LimitRemaining: 'x-ratelimit-remaining',
  ResetsIn: 'x-ratelimit-reset-in',
  ResetsAt: 'x-ratelimit-reset',
}

type AcousticBrainzRateLimit = {
  /**
   * The total limit of a rate limit period.
   */
  limit: number
  /**
   * Remaining number of requests in this rate limit time period.
   */
  limitRemaining: number
  /**
   * Time until the rate limit resets.
   */
  resetsIn: number
  /**
   * Epoch of when the rate limit resets.
   */
  resetsAt: number
}

export type AcousticBrainzConfig = {
  /**
   * AcousticBrainz API Key - may increase rate limits.
   */
  apiKey?: string

  /**
   * Will throw an error if a request is made when the
   * rate limit has been reached.
   */
  errorOnRateLimit?: boolean
}

export class AcousticBrainz {
  private static ApiPaths = {
    highLevel: '/api/v1/high-level',
    lowLevel: '/api/v1/low-level',
    count: '/api/v1/count',
    dataset: '/api/v1/datasets/(uuid: dataset_id)',
    similarity: '/api/v1/similarity/(metric)/between/',
  }

  private http!: AxiosInstance

  private config: AcousticBrainzConfig = {}
  private limit!: number
  private limitRemaining = 1
  private resetsIn = 0
  private resetsAt: number = Date.now()

  /**
   * Information about the AcousticBrainz API rate limit
   * as reported by the response of the last API call.
   */
  get rateLimit(): AcousticBrainzRateLimit {
    return {
      limit: this.limit,
      limitRemaining: this.limitRemaining,
      resetsIn: this.resetsIn,
      resetsAt: this.resetsAt,
    }
  }

  /**
   * Create a new instance.
   *
   * @param config configuration options.
   */
  constructor(config?: AcousticBrainzConfig) {
    this.config = config || {}
    this.http = axios.create({
      baseURL: acousticBrainzBaseUrl,
      headers: this.config.apiKey
        ? {
            Authorization: this.config.apiKey,
          }
        : {},
    })
  }

  /**
   * Get HighLevel data for the provided recordings. Automatically waits for
   * rate limits to reset if the limit has been reached at the time of calling.
   *
   * More on AcousticBrainz Data: https://similarity.acousticbrainz.org/data
   *
   * @param recordingIds a list of MusicBrainz recording ids
   * @returns A promise with the AcousticBrainz High Level data for the requested ids.
   */
  async getHighLevel(
    recordingIds: string[]
  ): Promise<AcousticBrainzResponse<HighLevelRecord>> {
    return this.makeRequest(AcousticBrainz.ApiPaths.highLevel, {
      params: {
        recording_ids: this.toQueryString(recordingIds),
      },
    })
  }

  /**
   * Get LowLevel data for the provided recordings. Automatically waits for
   * rate limits to reset if the limit has been reached at the time of calling.
   *
   * More on AcousticBrainz Data: https://similarity.acousticbrainz.org/data
   *
   * @param recordingIds List of MusicBrainz recording ids
   * @param features Optional list of features to include in the response. {@link LowLevelFeature}
   * @returns A promise with the AcousticBrainz Low Level data for the requested ids.
   */
  async getLowLevel(
    recordingIds: string[],
    features?: LowLevelFeature[]
  ): Promise<AcousticBrainzResponse<LowLevelRecord>> {
    return this.makeRequest(
      `${AcousticBrainz.ApiPaths.lowLevel}?${this.toQueryString(
        recordingIds,
        'recording_ids'
      )}`,
      {
        params: {
          features: this.toQueryString(features || []),
        },
      }
    )
  }

  private async makeRequest<T>(
    path: string,
    config: AxiosRequestConfig
  ): Promise<T> {
    if (this.limitRemaining < 1 && this.resetsAt > Date.now()) {
      if (this.config.errorOnRateLimit) {
        throw new Error('AcousticBrainz API Rate Limit Reached')
      } else {
        const sleepTime = this.resetsAt - Date.now()
        await this.sleep(sleepTime)
      }
    }

    const response = await this.http.get<T>(path, config)

    this.limit = response.headers[RateLimitHeaders.RateLimit]
    this.limitRemaining = response.headers[RateLimitHeaders.LimitRemaining]
    this.resetsIn = response.headers[RateLimitHeaders.ResetsIn]
    this.resetsAt = response.headers[RateLimitHeaders.ResetsAt]

    return response.data
  }

  private toQueryString(values: string[], key?: string): string {
    const v = values.reduce(
      (prev, curr, index, arr) => {
        const next = prev.concat(`${curr}`)

        if (index === arr.length - 1) {
          return next
        } else {
          return next.concat(';')
        }
      },
      key ? `${key}=` : ''
    )

    return v
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
}
