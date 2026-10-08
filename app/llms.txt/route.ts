import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# After The Silence Archive
> An independent public-interest archive documenting major cases of violence against women in India, the reforms that followed, and institutional accountability.

## Core Mission
To track the gap between what happened, what was promised by the state, and what actually changed in the legal and social landscape.

## Key Sections
- Case Records: /cases
- Reform Timeline: /timeline
- Promise vs Reality (Audit): /reforms
- Statistics Dashboard: /statistics
- Sources & Verification: /sources

## Methodology
All data is cross-referenced against Supreme Court judgments, NCRB data, and CAG reports. We distinguish verified court findings from media allegations.
`;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}