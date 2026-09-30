'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function CaseList({ cases }) {
  const [q, setQ] = useState('');
  const [era, setEra] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const uniq = (key) => [...new Set(cases.map((c) => c[key]))];
  const list = useMemo(() => cases.filter((c) => {
    const t = q.trim().toLowerCase();
    return (!t || [c.title, c.location, c.desc].some((s) => s.toLowerCase().includes(t)))
      && (!era || c.era === era) && (!type || c.type === type) && (!status || c.status === status);
  }), [cases, q, era, type, status]);

  return (
    <>
      <div className="controls">
        <input placeholder="Search cases, locations, keywords..." value={q}
          onChange={(e) => setQ(e.target.value)} aria-label="Search cases" />
        <select value={era} onChange={(e) => setEra(e.target.value)} aria-label="Era">
          <option value="">All Eras</option>{uniq('era').map((v) => <option key={v}>{v}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type">
          <option value="">All Types</option>{uniq('type').map((v) => <option key={v}>{v}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">All Statuses</option>{uniq('status').map((v) => <option key={v}>{v}</option>)}
        </select>
        <span className="dim" style={{ fontSize: '.8rem' }}>{list.length} of {cases.length} cases</span>
      </div>
      <div className="grid">
        {list.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`} className="card">
            <div className="yr">{c.year} · {c.location}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <div><span className={`pill ${c.status}`}>{c.status}</span></div>
          </Link>
        ))}
        {!list.length && <div className="card dim">No cases match. Try clearing a filter.</div>}
      </div>
    </>
  );
}
