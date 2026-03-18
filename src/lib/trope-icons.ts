/**
 * Emoji icon map for all PUBLIC_TROPES slugs.
 * Used on trope index/detail pages and book page trope badges.
 */
export const tropeIcons: Record<string, string> = {
  // ── Character ─────────────────────────────────────────────────────────────
  'anti-hero':             '⚖️',
  'assassin-protagonist':  '🗡️',
  'chosen-one':            '✨',
  'cursed-character':      '🕯️',
  'dark-lord':             '👑',
  'dragon-rider':          '🐉',
  'immortal-character':    '♾️',
  'last-of-their-kind':    '🌒',
  'lost-heir':             '👑',
  'mentor-figure':         '📜',
  'morally-grey-hero':     '⚖️',
  'outcast-hero':          '🌑',
  'prophecy-child':        '🔮',
  'reluctant-hero':        '🛡️',
  'secret-royalty':        '👑',
  'villain-protagonist':   '☠️',

  // ── Relationship ──────────────────────────────────────────────────────────
  'betrayal':              '🗡️',
  'bodyguard-romance':     '🛡️',
  'enemies-to-lovers':     '🔥',
  'fated-mates':           '💫',
  'forbidden-romance':     '🌙',
  'forced-proximity':      '🔗',
  'found-family':          '🫂',
  'grumpy-sunshine':       '🌤️',
  'love-triangle':         '💔',
  'mentor-student':        '📜',
  'political-marriage':    '👑',
  'redemption-arc':        '🕊️',
  'rivals-to-allies':      '⚔️',
  'second-chance-romance': '💞',
  'slow-burn':             '🕯️',

  // ── Plot ──────────────────────────────────────────────────────────────────
  'ancient-evil-awakens':  '🕳️',
  'coming-of-age':         '🌱',
  'end-of-the-world':      '🌍',
  'heist':                 '🃏',
  'hero-becomes-villain':  '🩸',
  'hidden-society':        '🎭',
  'magical-plague':        '☣️',
  'political-intrigue':    '🏰',
  'portal-fantasy':        '🚪',
  'power-at-a-cost':       '🩸',
  'prophecy':              '🔮',
  'pyrrhic-victory':       '⚰️',
  'quest':                 '🧭',
  'rebellion':             '⚔️',
  'revenge-story':         '🔥',
  'secret-identity':       '🎭',
  'succession-crisis':     '👑',
  'survival-journey':      '🥾',
  'tournament-arc':        '🏆',
  'trial-by-combat':       '⚔️',
  'war-between-kingdoms':  '🛡️',

  // ── World & Magic ──────────────────────────────────────────────────────────
  'blood-magic':           '🩸',
  'curse-breaking':        '🕯️',
  'desert-kingdom':        '🏜️',
  'divine-magic':          '☀️',
  'dying-empire':          '🏛️',
  'elemental-magic':       '🌊',
  'fae-court-drama':       '🧚',
  'floating-islands':      '☁️',
  'forbidden-magic':       '⛓️',
  'frozen-wasteland':      '❄️',
  'gothic-castle':         '🏰',
  'magic-tournament':      '🏆',
  'magical-artifacts':     '📘',
  'necromancy':            '💀',
  'pirate-fantasy':        '🏴‍☠️',
  'sentient-weapon':       '⚔️',
  'underground-city':      '🕳️',
  'viking-inspired':       '🪓',
};

export function getTropeIcon(slug: string): string {
  return tropeIcons[slug] ?? '✨';
}
