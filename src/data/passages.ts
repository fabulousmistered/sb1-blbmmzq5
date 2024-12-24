interface Passage {
  latin: string;
  english: string;
  book: number;
  lines: string;
  context: string;
}

export const passages: Passage[] = [
  {
    latin: `Īn nova fert animus mūtātās dīcere fōrmās
corpora; dī, coeptīs (nam vōs mūtāstis et illās)
adspīrāte meīs prīmāque ab orīgine mundī
ad mea perpetuum dēdūcite tempora carmen.`,
    english: "My mind leads me to speak of forms changed into new bodies; gods, breathe upon my undertakings (for you have changed even these) and lead my continuous song from the world's first beginning to my own times.",
    book: 1,
    lines: "1-4",
    context: "Opening lines of the Metamorphoses"
  },
  {
    latin: `Ante mare et terrās et quod tegit omnia caelum
ūnus erat tōtō nātūrae vultus in orbe,
quem dīxēre chaos: rudis indigestaque mōlēs.`,
    english: "Before the sea and lands and the sky that covers all, there was one face of nature in the whole world, which they called Chaos: a rough and unorganized mass.",
    book: 1,
    lines: "5-7",
    context: "Description of Chaos"
  }
];

export function highlightVerbs(text: string): string {
  const verbPatterns = [
    { pattern: /\b(fert|mūtāstis|adspīrāte|dēdūcite|erat|dīxēre)\b/g, subjunctive: false },
    { pattern: /\b(tegit)\b/g, subjunctive: false }
  ];

  let result = text;
  verbPatterns.forEach(({ pattern, subjunctive }) => {
    result = result.replace(pattern, (match) => {
      return subjunctive 
        ? `<span class="verb subjunctive">${match}</span>`
        : `<span class="verb">${match}</span>`;
    });
  });
  return result;
}