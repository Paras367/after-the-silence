import type { Metadata } from 'next';
import Link from 'next/link';
import { FACT_STATUS } from '../../lib/data';

export const metadata: Metadata = { title: 'Delhi-NCR Sleeper Bus Case — 2026' };

export default function SleeperBusPage() {
  return (
    <section id="sleeper-bus-2026">
      <div className="wrap">
        <Link href="/" className="back-link">← HOME</Link>
        <div className="cp-head">
          <div>
            <div className="eyebrow">Centerpiece Archive</div>
            <h1>DELHI-NCR SLEEPER BUS CASE</h1>
          </div>
          <div className="cp-years">2026 · ONGOING</div>
        </div>

        <div className="status-ribbon">ONGOING / DEVELOPING CASE</div>

        <div className="cp-statement">“14 YEARS LATER: Why are we still talking about buses?”</div>

        <div className="cp-block">
          <div><span className="cp-block-num">01</span><h4>The Incident</h4></div>
          <div className="cp-block-body">
            <p><strong>REPORTED:</strong> A minor survivor was allegedly assaulted aboard a moving interstate sleeper bus traveling from Greater Noida to Delhi.</p>
            <p><strong>PROTECTED:</strong> The survivor is a minor. In accordance with legal and ethical standards, no identifying information, photographs, or specific location details that could compromise her identity are published here.</p>
          </div>
        </div>

        <div className="cp-block">
          <div><span className="cp-block-num">02</span><h4>Current Legal Status</h4></div>
          <div className="cp-block-body">
            <p><strong>ONGOING:</strong> The case is in the investigation/chargesheet phase. No court findings have been established yet. All accusations remain alleged until proven in a court of law.</p>
            <div className="tag-row">
              <span className="tag alleged" title={FACT_STATUS.alleged}>ALLEGED</span>
              <span className="tag reported" title={FACT_STATUS.reported}>REPORTED</span>
              <span className="tag ongoing" title={FACT_STATUS.ongoing}>ONGOING</span>
            </div>
          </div>
        </div>

        <p className="file-link"><Link href="/cases/sleeper-bus-2026">→ READ THE FULL CASE FILE</Link></p>
      </div>
    </section>
  );
}
