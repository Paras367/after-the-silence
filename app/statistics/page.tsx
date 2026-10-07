import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import Stat from '../../components/Stat';

export const metadata: Metadata = { title: 'Statistics Dashboard' };

export default function StatisticsPage() {
  return (
    <section id="stats" className="on-rule">
      <div className="wrap">
        <PageHead eyebrow="Verified Data" title="Statistics Dashboard">
          Numbers sourced from official government datasets. We do not invent statistics. Where data is opaque, we state it.
        </PageHead>
        <div className="stat-grid">
          <Stat target={31000} suffix="+" label="Reported Crimes Against Women (Annual)" source='SOURCE: NCRB "Crime in India" 2022' />
          <Stat target={75} suffix="%" label="Cases Pending Trial (Avg. Pendency)" source="SOURCE: National Judicial Data Grid (NJDG)" />
          <Stat target={20} suffix="-30%" label="Conviction Rate (Specific IPC Sections)" source="SOURCE: NCRB / Parliamentary Committee Reports" />
          <Stat label="Real-time Transport CCTV Compliance Audit" source="SOURCE: DATA NOT AVAILABLE (No centralized public audit)" />
        </div>
      </div>
    </section>
  );
}
