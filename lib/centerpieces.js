// Centerpiece pages (Phoolan Devi, Nirbhaya, Sleeper Bus) ka lamba text yahan aata hai.
// Key = wahi id jo CASES me hai. Purane index.html ke cp-block sections yahan blocks me daalo.
// Shape: { statement, blocks: [{ h: 'Heading', p: ['paragraph 1', 'paragraph 2'] }] }
export const CENTERPIECES = {
  'nirbhaya-2012': {
    statement: 'A case that changed India\u2019s legal landscape.',
    blocks: [
      { h: 'What Happened', p: ['A 23-year-old physiotherapy student was subjected to brutal sexual assault and violence aboard a moving private bus in Delhi. She succumbed to her injuries days later. The facts are presented here without graphic detail, respecting the victim\u2019s dignity.'] },
      { h: 'Justice Verma Committee', p: ['Formed in response to the protests, the committee submitted a comprehensive report recommending sweeping reforms in criminal law, police accountability, and political governance.'] },
      // baaki blocks index.html se yahin paste karo
    ],
  },
  // 'phoolan-devi': { ... },
  // 'sleeper-bus-2026': { ... },
};
