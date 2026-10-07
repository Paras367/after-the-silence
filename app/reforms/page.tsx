import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import { REFORMS, REFORM_MARKS } from '../../lib/data';

export const metadata: Metadata = { title: 'Promise vs Reality' };

export default function ReformsPage() {
  return (
    <section id="reforms" className="on-rule">
      <div className="wrap">
        <PageHead eyebrow="Accountability Dashboard" title="Promise vs Reality">
          Measuring the implementation of major safety reforms. Never labeled “failed” without documented evidence.
        </PageHead>
        <div className="pr-scroll" tabIndex={0} role="region" aria-label="Promise vs reality table, scrollable">
          <table className="pr-table">
            <thead>
              <tr>
                <th>Reform / Promise</th>
                <th>Announced Intent</th>
                <th>Actual Implementation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {REFORMS.map((r, i) => (
                <tr key={i}>
                  <td className="rname">{r.name}</td>
                  <td>{r.promise}</td>
                  <td>{r.implementation}</td>
                  <td><span className={`status-mark ${r.status}`}>{REFORM_MARKS[r.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
