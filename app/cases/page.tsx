import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import CaseExplorer from '../../components/CaseExplorer';

export const metadata: Metadata = { title: 'Case Records' };

export default function CasesPage() {
  return (
    <section id="archive" className="on-rule">
      <div className="wrap">
        <PageHead eyebrow="The Archive" title="Case Records">
          Every entry is tagged with its evidentiary status. Hover over tags for definitions. Click a case to open its full file.
        </PageHead>
        <CaseExplorer />
      </div>
    </section>
  );
}
