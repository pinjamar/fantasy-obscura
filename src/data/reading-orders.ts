export type BookStatus = 'mandatory' | 'optional' | 'supplementary' | 'upcoming' | 'incomplete';
export type SeriesStatus = 'complete' | 'ongoing' | 'incomplete';
export type CardColor = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'zinc';

export interface ReadingOrderBook {
  title: string;
  slug: string | null;
  status: BookStatus;
  note: string;
  page_count: number | null;
  publication_year: number | null;
  /** Overall position in the parent series (e.g. Discworld #8). Shown below title. */
  position?: number;
  /** Sub-series label override (e.g. "Witches #2"). Shown when DB has no series_label. */
  seriesLabel?: string;
}

export interface ReadingOrderGroup {
  label: string;
  sublabel?: string;
  note?: string;
  noteType?: 'required' | 'optional' | 'warning';
  books: ReadingOrderBook[];
}

export interface DarknessRow {
  label: string;
  level: number; // 1–5
  desc: string;
}

export interface InfoSection {
  heading: string;
  type?: 'bullets' | 'prose' | 'warning';
  bullets?: string[];
  prose?: string;
}

export interface QuickCard {
  title: string;
  body: string;
  color: CardColor;
}

export interface ReadingOrderEntry {
  slug: string;
  name: string;
  author: string;
  seriesStatus: SeriesStatus;
  seriesStatusLabel: string;
  description: string;
  darknessDisplay: string;
  /** Flat book list — used when there are no named groups */
  books?: ReadingOrderBook[];
  /** Named arc groups — takes priority over `books` */
  groups?: ReadingOrderGroup[];
  /** Subtitle below the "Reading Order" heading */
  orderNote?: string;
  /** Amber warning block displayed before the reading order list */
  warning?: string;
  cards?: QuickCard[];
  /** Where to render the quick cards relative to the timeline. Defaults to 'below'. */
  cardsPosition?: 'above' | 'below';
  sections?: InfoSection[];
  darkness?: DarknessRow[];
  finishedLabel: string;
  categoryHref: string;
  categoryLabel: string;
  related: string[];
  /** Short display name override for use in "More reading orders" related links */
  shortName?: string;
  /** Slug for a matching /books-like/ guide, if one exists */
  booksLikeSlug?: string;
}

import { acotar } from './reading-orders/acotar';
import { cosmere } from './reading-orders/cosmere';
import { stormlight } from './reading-orders/stormlight';
import { earthsea } from './reading-orders/earthsea';
import { firstLaw } from './reading-orders/first-law';
import { malazan } from './reading-orders/malazan';
import { wheelOfTime } from './reading-orders/wheel-of-time';
import { kingkiller } from './reading-orders/kingkiller';
import { witcher } from './reading-orders/witcher';
import { dresdenFiles } from './reading-orders/dresden-files';
import { discworld } from './reading-orders/discworld';
import { asoiaf } from './reading-orders/asoiaf';
import { robinHobb } from './reading-orders/robin-hobb';
import { throneOfGlass } from './reading-orders/throne-of-glass';
import { sarahJMaas } from './reading-orders/sarah-j-maas';
import { markLawrence } from './reading-orders/mark-lawrence';
import { bloodAndAsh } from './reading-orders/blood-and-ash';
import { empyrean } from './reading-orders/empyrean';
import { drizzt } from './reading-orders/drizzt';
import { dragonlance } from './reading-orders/dragonlance';
import { divergent } from './reading-orders/divergent';
import { memorySorrowThorn } from './reading-orders/memory-sorrow-thorn';
import { kateDaniels } from './reading-orders/kate-daniels';
import { blackCompany } from './reading-orders/black-company';
import { pern } from './reading-orders/pern';
import { inheritanceCycle } from './reading-orders/inheritance-cycle';
import { grishaverse } from './reading-orders/grishaverse';
import { shannara } from './reading-orders/shannara';
import { mistborn } from './reading-orders/mistborn';
import { valdemar } from './reading-orders/valdemar';
import { dune } from './reading-orders/dune';

export const READING_ORDERS: ReadingOrderEntry[] = [
  acotar,
  cosmere,
  stormlight,
  earthsea,
  firstLaw,
  malazan,
  wheelOfTime,
  kingkiller,
  witcher,
  dresdenFiles,
  discworld,
  asoiaf,
  robinHobb,
  throneOfGlass,
  sarahJMaas,
  markLawrence,
  bloodAndAsh,
  empyrean,
  drizzt,
  dragonlance,
  divergent,
  memorySorrowThorn,
  kateDaniels,
  blackCompany,
  pern,
  inheritanceCycle,
  grishaverse,
  shannara,
  mistborn,
  valdemar,
  dune,
];


export const getReadingOrderEntry = (slug: string): ReadingOrderEntry | null =>
  READING_ORDERS.find((e) => e.slug === slug) ?? null;
