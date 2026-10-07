import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Nirbhaya — 2012' };

export default function NirbhayaPage() {
  return (
    <section id="nirbhaya" className="on-rule">
      <div className="wrap">
        <Link href="/" className="back-link">← HOME</Link>
        <div className="cp-head">
          <div>
            <div className="eyebrow">Centerpiece Archive</div>
            <h1>NIRBHAYA — 2012</h1>
          </div>
          <div className="cp-years">16 DECEMBER 2012 · DELHI</div>
        </div>
        <div className="cp-statement">“A case that changed India’s legal landscape.”</div>

        <div className="cp-block">
          <div><span className="cp-block-num">01</span><h4>What Happened</h4></div>
          <div className="cp-block-body">
            <p>A 23-year-old physiotherapy student was subjected to brutal sexual assault and violence aboard a moving private bus in Delhi. She succumbed to her injuries days later. The facts are presented here without graphic detail, respecting the victim’s dignity.</p>
          </div>
        </div>

        <div className="cp-block">
          <div><span className="cp-block-num">02</span><h4>Investigation &amp; Public Response</h4></div>
          <div className="cp-block-body">
            <p>The case triggered unprecedented nationwide protests, demanding systemic change, faster justice, and safer public spaces for women. The investigation was fast-tracked due to intense public scrutiny.</p>
          </div>
        </div>

        <div className="cp-block">
          <div><span className="cp-block-num">03</span><h4>What Changed vs What Remains Unresolved</h4></div>
          <div className="cp-block-body">
            <div className="ba-grid">
              <div className="ba-col">
                <h5>BEFORE 2012</h5>
                <ul>
                  <li>Narrow legal definitions of sexual offences.</li>
                  <li>Lack of specific statutory laws for workplace harassment.</li>
                  <li>Minimal public discourse on transport safety audits.</li>
                  <li>Weak witness protection mechanisms.</li>
                </ul>
              </div>
              <div className="ba-col">
                <h5>AFTER 2012</h5>
                <ul>
                  <li>Expanded legal definitions and harsher penalties.</li>
                  <li>Establishment of fast-track courts (with mixed efficacy).</li>
                  <li>Creation of the Nirbhaya Fund for women’s safety initiatives.</li>
                  <li>Increased public awareness, though conviction rates remain a systemic challenge.</li>
                </ul>
              </div>
            </div>
            <div className="change-grid">
              <span>LAW</span><span>POLICING</span><span>SEXUAL OFFENCES</span><span>WORKPLACE SAFETY</span><span>PUBLIC AWARENESS</span>
            </div>
          </div>
        </div>

        <p className="file-link"><Link href="/cases/nirbhaya-2012">→ READ THE FULL CASE FILE</Link></p>
      </div>
    </section>
  );
}
