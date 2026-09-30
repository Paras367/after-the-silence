import CaseList from '@/components/CaseList';
import { CASES } from '@/lib/data';

export const metadata = { title: 'Case Records' };

export default function CasesPage() {
  return (
    <section className="wrap">
      <div className="eyebrow">The Archive</div>
      <h1 style={{ margin: '14px 0 24px' }}>Case Records</h1>
      <CaseList cases={CASES} />
    </section>
  );
}
