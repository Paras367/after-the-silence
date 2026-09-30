import { FACT_STATUS } from '@/lib/data';

export default function Tags({ tags = [] }) {
  return (
    <div className="tags">
      {tags.map((t) => <span key={t} className={`tag ${t}`} tabIndex={0} title={FACT_STATUS[t]}>{t}</span>)}
    </div>
  );
}
