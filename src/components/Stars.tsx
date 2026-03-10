/**
 * Stars — renders a 5-star visual for any decimal rating.
 * Uses a CSS clip overlay so any precision works (not just half-stars).
 * Rating should be 0–5.
 */
export default function Stars({ rating }: { rating: number }) {
  const pct = `${((rating / 5) * 100).toFixed(2)}%`
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        fontSize: '1em',
        lineHeight: 1,
        letterSpacing: '0.05em',
        verticalAlign: 'middle',
      }}
    >
      <span style={{ color: '#d4d4d8' }}>★★★★★</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          width: pct,
          color: '#f59e0b',
          whiteSpace: 'nowrap',
        }}
      >
        ★★★★★
      </span>
    </span>
  )
}
