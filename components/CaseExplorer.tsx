'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CASES, STATUS_LABELS } from '../lib/data';

export default function CaseExplorer() {
  const [search, setSearch] = useState("");
  const [era, setEra] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const q = search.trim().toLowerCase();
  const filteredCases = CASES.filter(c => {
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    return matchQ && (!era || c.era === era) && (!type || c.type === type) && (!status || c.status === status);
  });

  return (
    <>
      <div className="archive-controls">
        <div className="search-box">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cases, locations, or keywords..." aria-label="Search cases" />
        </div>
        <select value={era} onChange={(e) => setEra(e.target.value)} className="filter-select" aria-label="Filter by era">
          <option value="">All Eras</option>
          <option value="1970s">1970s</option>
          <option value="1990s">1990s</option>
          <option value="2010-2014">2010–2014</option>
          <option value="2020-2024">2020–2024</option>
          <option value="2025-Present">2025–Present</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="filter-select" aria-label="Filter by type">
          <option value="">All Types</option>
          <option value="Sexual violence">Sexual violence</option>
          <option value="Custodial violence">Custodial violence</option>
          <option value="Transport-related crime">Transport-related crime</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-select" aria-label="Filter by status">
          <option value="">All Statuses</option>
          <option value="investigation">Investigation</option>
          <option value="trial">Trial</option>
          <option value="convicted">Convicted</option>
          <option value="ongoing">Ongoing</option>
          <option value="landmark">Legal Landmark</option>
        </select>
        <div className="filter-count" aria-live="polite">{filteredCases.length} of {CASES.length} cases</div>
      </div>

      <div className="case-grid">
        {filteredCases.length === 0 ? (
          <div className="empty-state">No cases match this search. Try clearing a filter.</div>
        ) : (
          filteredCases.map(c => (
            <Link key={c.id} href={`/cases/${c.id}`} className="case-card">
              <span className="year">{c.year} · {c.location}</span>
              <span className="ctitle">{c.title}</span>
              <span className="desc">{c.desc}</span>
              <span className="foot">
                <span className={`status-pill ${c.status}`}>{STATUS_LABELS[c.status]}</span>
                <span className="loc">{c.type}</span>
              </span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
