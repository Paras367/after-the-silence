export const metadata = { title: 'Institutional Accountability' };

const PANELS = {
  POLICE: ['FIR registration delays', 'Evidence tampering risks', 'Victim protection failures', 'Political interference in investigations'],
  'TRANSPORT AUTHORITIES': ['Non-functional mandated CCTV', 'Lax driver background verification', 'Poor interstate jurisdictional coordination', 'Weak enforcement of operator compliance'],
  GOVERNMENT: ['Under-utilization of safety funds (e.g., Nirbhaya Fund)', 'Delayed legislative action on committee reports', 'Lack of independent oversight mechanisms', 'Politicization of survivor narratives'],
  COURTS: ['Severe trial pendency and delays', 'High rates of witness hostility', 'Inconsistent sentencing in sexual offence cases', 'Burden of proof challenges for survivors'],
  INSTITUTIONS: ['Non-compliant Internal Committees (POSH)', 'Lack of unannounced audits in shelter homes', 'Retaliation against workplace complainants', 'Inadequate campus safety protocols'],
};

export default function AccountabilityPage() {
  return (
    <section className="wrap">
      <div className="eyebrow">Systemic Review</div>
      <h1 style={{ margin: '14px 0' }}>Institutional Accountability</h1>
      <div className="grid">
        {Object.entries(PANELS).map(([h, items]) => (
          <div className="card" key={h}>
            <h3>{h}</h3>
            <ul className="dim" style={{ paddingLeft: 18, margin: 0, fontSize: '.88rem' }}>
              {items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
