import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';

export const metadata: Metadata = { title: 'Institutional Accountability' };

export default function AccountabilityPage() {
  return (
    <>
      <section id="accountability">
        <div className="wrap">
          <PageHead eyebrow="Systemic Review" title="Institutional Accountability">
            Identifying the specific nodes of failure across the ecosystem of justice and safety.
          </PageHead>
          <div className="panel-grid">
            <div className="panel">
              <h4>POLICE</h4>
              <ul>
                <li>FIR registration delays</li>
                <li>Evidence tampering risks</li>
                <li>Victim protection failures</li>
                <li>Political interference in investigations</li>
              </ul>
            </div>
            <div className="panel">
              <h4>TRANSPORT AUTHORITIES</h4>
              <ul>
                <li>Non-functional mandated CCTV</li>
                <li>Lax driver background verification</li>
                <li>Poor interstate jurisdictional coordination</li>
                <li>Weak enforcement of operator compliance</li>
              </ul>
            </div>
            <div className="panel">
              <h4>GOVERNMENT</h4>
              <ul>
                <li>Under-utilization of safety funds (e.g., Nirbhaya Fund)</li>
                <li>Delayed legislative action on committee reports</li>
                <li>Lack of independent oversight mechanisms</li>
                <li>Politicization of survivor narratives</li>
              </ul>
            </div>
            <div className="panel">
              <h4>COURTS</h4>
              <ul>
                <li>Severe trial pendency and delays</li>
                <li>High rates of witness hostility</li>
                <li>Inconsistent sentencing in sexual offence cases</li>
                <li>Burden of proof challenges for survivors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="on-rule">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">The Unanswered</div>
            <h2>The Questions That Remain</h2>
          </div>
          <div className="q-list">
            <div className="q-item">Are laws being enforced, or do they exist only on paper?</div>
            <div className="q-item">Are public transport safety rules actually monitored, or just mandated?</div>
            <div className="q-item">Are survivors protected during investigations, or re-traumatized by the system?</div>
            <div className="q-item">How long do cases take to reach judgment, and who pays the price for the delay?</div>
            <div className="q-item">Who investigates institutional failures when the institution is the state?</div>
          </div>
        </div>
      </section>
    </>
  );
}
