export type BookStatus =
  | 'mandatory'
  | 'optional'
  | 'supplementary'
  | 'upcoming';
export type SeriesStatus = 'complete' | 'ongoing' | 'incomplete';
export type CardColor = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'zinc';

export interface ReadingOrderBook {
  title: string;
  slug: string | null;
  status: BookStatus;
  note: string;
  page_count?: number | null;
  publication_year: number | null;
  /** Overall position in the parent series (e.g. Discworld #8). Shown below title. */
  position?: number;
  /** Sub-series label override (e.g. "Witches #2"). Shown when DB has no series_label. */
  seriesLabel?: string;
  /** Extra tag shown as its own line alongside (not instead of) the DB/seriesLabel line, e.g. "Kharl #1". */
  arcLabel?: string;
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
  level: number; // 1â€“5
  desc: string;
}

export interface InfoSection {
  heading: string;
  type?: 'bullets' | 'prose' | 'warning' | 'spoiler';
  bullets?: string[];
  prose?: string;
}

export interface QuickCard {
  title: string;
  body: string;
  color: CardColor;
}

export interface CharacterProfile {
  name: string;
  role: string;
  book?: string;
  faction?: string;
  color?: string;
  why_they_work: string;
}

export interface ReadingOrderEntry {
  slug: string;
  name: string;
  author: string;
  seriesStatus: SeriesStatus;
  seriesStatusLabel: string;
  description: string;
  darknessDisplay: string;
  /** Flat book list â€” used when there are no named groups */
  books?: ReadingOrderBook[];
  /** Named arc groups â€” takes priority over `books` */
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
  characters?: CharacterProfile[];
  finishedLabel: string;
  categoryHref: string;
  categoryLabel: string;
  related: string[];
  /** Short display name override for use in "More reading orders" related links */
  shortName?: string;
  /** Slug for a matching /books-like/ guide, if one exists */
  booksLikeSlug?: string;
  /** ISO date (YYYY-MM-DD) of last meaningful content update â€” feeds dateModified in JSON-LD */
  lastUpdated?: string;
  /** Custom meta description override â€” keep under 155 chars. Falls back to auto-generated if omitted. */
  metaDescription?: string;
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
import { middleEarth } from './reading-orders/middle-earth';
import { rickRiordan } from './reading-orders/rick-riordan';
import { greenBoneSaga } from './reading-orders/green-bone-saga';
import { oldKingdom } from './reading-orders/old-kingdom';
import { horusHeresy } from './reading-orders/horus-heresy';
import { dungeonCrawlerCarl } from './reading-orders/dungeon-crawler-carl';
import { gentlemanBastard } from './reading-orders/gentleman-bastard';
import { johnGwynne } from './reading-orders/john-gwynne';
import { caraval } from './reading-orders/caraval';
import { cradle } from './reading-orders/cradle';
import { lockedTomb } from './reading-orders/locked-tomb';
import { narnia } from './reading-orders/narnia';
import { darkTower } from './reading-orders/dark-tower';
import { redRising } from './reading-orders/red-rising';
import { geneWolfe } from './reading-orders/gene-wolfe';
import { shadowsOfTheApt } from './reading-orders/shadows-of-the-apt';
import { folkOfTheAir } from './reading-orders/folk-of-the-air';
import { jamesIslington } from './reading-orders/james-islington';
import { brokenEarth } from './reading-orders/broken-earth';
import { rfKuang } from './reading-orders/rf-kuang';
import { brentWeeks } from './reading-orders/brent-weeks';
import { demonCycle } from './reading-orders/demon-cycle';
import { chroniclesOfAmber } from './reading-orders/chronicles-of-amber';
import { expanse } from './reading-orders/expanse';
import { endersGame } from './reading-orders/enders-game';
import { outlander } from './reading-orders/outlander';
import { swordOfTruth } from './reading-orders/sword-of-truth';
import { shadowhunterChronicles } from './reading-orders/shadowhunter-chronicles';
import { riftwarCycle } from './reading-orders/riftwar-cycle';
import { foundation } from './reading-orders/foundation';
import { powderMage } from './reading-orders/powder-mage';
import { belgariad } from './reading-orders/belgariad';
import { guyGavrielKay } from './reading-orders/guy-gavriel-kay';
import { xanth } from './reading-orders/xanth';
import { sagaOfRecluce } from './reading-orders/saga-of-recluce';
import { tortall } from './reading-orders/tortall';
import { zodiacAcademy } from './reading-orders/zodiac-academy';
import { riyria } from './reading-orders/riyria';
import { eternalChampion } from './reading-orders/eternal-champion';
import { vladTaltos } from './reading-orders/vlad-taltos';

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
  middleEarth,
  rickRiordan,
  greenBoneSaga,
  oldKingdom,
  horusHeresy,
  dungeonCrawlerCarl,
  gentlemanBastard,
  johnGwynne,
  caraval,
  cradle,
  lockedTomb,
  narnia,
  darkTower,
  redRising,
  geneWolfe,
  shadowsOfTheApt,
  folkOfTheAir,
  jamesIslington,
  brokenEarth,
  rfKuang,
  brentWeeks,
  demonCycle,
  chroniclesOfAmber,
  expanse,
  outlander,
  swordOfTruth,
  endersGame,
  shadowhunterChronicles,
  riftwarCycle,
  foundation,
  powderMage,
  belgariad,
  guyGavrielKay,
  xanth,
  sagaOfRecluce,
  tortall,
  zodiacAcademy,
  riyria,
  eternalChampion,
  vladTaltos,
];

export const getReadingOrderEntry = (slug: string): ReadingOrderEntry | null =>
  READING_ORDERS.find((e) => e.slug === slug) ?? null;

/** Hand-crafted reading order pages — always indexable. */
export const CURATED_READING_ORDER_SLUGS: ReadonlySet<string> = new Set(
  READING_ORDERS.map((e) => e.slug),
);

/** Auto-generated DB reading order pages explicitly allowed to index (not yet curated). */
export const INDEXED_DB_READING_ORDER_SLUGS: readonly string[] = [
  'he-who-fights-with-monsters',
  'hell-bent',
  'river-of-time',
  'riverside',
  'crescent-city',
];

export function shouldIndexReadingOrder(slug: string): boolean {
  return CURATED_READING_ORDER_SLUGS.has(slug) || INDEXED_DB_READING_ORDER_SLUGS.includes(slug);
}

