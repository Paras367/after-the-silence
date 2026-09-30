import { REFORMS } from '@/lib/data';

export const metadata = { title: 'Promise vs Reality' };
const MARK = { impl: '✓ Implemented', partial: '⚠ Partially Implemented', fail: '✕ Documented Failure', unknown: '? Insufficient Evidence' };

export default function ReformsPage() {
  return (
    <section className="wrap">
      <div className="eyebrow">Accountability Dashboard</div>
      <h1 style={{ margin: '14px 0' }}>Promise vs Reality</h1>
      <p className="dim">Never labeled &ldquo;failed&rdquo; without documented evidence.</p>
      <div className="scroll">
        <table>
          <thead><tr><th>Reform</th><th>Announced Intent</th><th>Actual Implementation</th><th>Status</th></tr></thead>
          <tbody>
            {REFORMS.map((r) => (
              <tr key={r.name}>
                <td style={{ color: 'var(--paper)' }}>{r.name}</td><td>{r.promise}</td><td>{r.implementation}</td>
                <td className={r.status}>{MARK[r.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
