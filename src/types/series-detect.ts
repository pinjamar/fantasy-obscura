export type SeriesReviewStatus = 'auto' | 'pending' | 'confirmed' | 'rejected';
export type SeriesSource = 'regex' | 'google_books' | 'llm' | 'manual';

export interface SeriesDetection {
  series_name: string;
  series_number: number | null;
  confidence: number;
  source: SeriesSource;
}

/** A book row with the series detect fields included. */
export interface BookWithSeriesReview {
  slug: string;
  title: string;
  authors: string[];
  series: string | null;
  series_number: number | null;
  series_confidence: number | null;
  series_review: SeriesReviewStatus | null;
  series_source: SeriesSource | null;
}

export interface SeriesReviewAction {
  slug: string;
  action: 'confirm' | 'reject';
  /** Optional override — admin can edit the series name before confirming */
  series_name?: string;
  series_number?: number | null;
}
