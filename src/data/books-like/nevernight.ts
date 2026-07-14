import type { BooksLikeEntry } from '../books-like';

export const nevernight: BooksLikeEntry = {
  slug: 'nevernight',
  source: {
    title: 'Nevernight',
    author: 'Jay Kristoff',
    darkness_level: 4,
    heat_level: 'Fiery',
    series: 'The Nevernight Chronicle',
    series_number: 1,
    tropes: [
      'Assassin Protagonist',
      'Dark Magic School',
      'Unreliable Narrator',
      'Revenge Quest',
      'Forbidden Romance',
      'Morally Grey Cast',
      'Found Family',
      'Political Intrigue',
    ],
    angle:
      'Grimdark assassin school with a razor-sharp narrator and operatic violence',
    answer_line:
      'If you loved Nevernight for its blistering prose, its morally unhinged protagonist, or its dark academic murder school, start with The Lies of Locke Lamora, Red Sister, and The Poppy War.',
    why_people_love:
      "Mia Corvere wants to become the deadliest assassin in the Republic so she can kill the men who destroyed her family. And the Red Church, a murder cult hidden inside a sealed mountain, is the only place to learn. Nevernight is one of the most stylistically distinctive fantasy novels of the past decade: Kristoff writes in a breathless, sardonic first person with an unreliable narrator who comments on her own story via acerbic footnotes, so the prose itself is a character. The Red Church is a dark academic fantasy done right: not a cosy magical school but a lethal competition where the curriculum is poison, blades, and seduction and students regularly end up dead. Mia herself is what makes the series so beloved: brilliantly capable, genuinely funny, absolutely ruthless, and emotionally broken in ways the narrative never softens or resolves cleanly. The sex is explicit and the violence is operatic, so this isn't a book for everyone. But for readers who want grimdark with genuine wit and a female protagonist who belongs in the same conversation as Locke Lamora and Jorg Ancrath, there's nothing quite like it.",
    why_people_love_rich: [
      { type: 'paragraph', text: "Nevernight works because Kristoff made the narrative voice inseparable from the protagonist's damage. Mia Corvere watches her family destroyed when she is ten years old, and the footnoted sardonic first-person register (a voice that can't stop commenting on its own story) is what a specific kind of grief looks like when it has had years to calcify into something hard and funny and precise. The prose is not stylistic decoration; it is character." },
      { type: 'labeled', label: 'The Red Church:', text: "A murder cult inside a sealed mountain, where the curriculum is poison, blades, and seduction and students regularly die. Kristoff builds the Red Church with the logic of a real institution: hierarchy, politics, rivalries between instructors, the specific cruelties of students who understand that this is a competition for their lives. The world-building is in the procedures, not the exposition." },
      { type: 'paragraph', text: "Mia herself is what makes the series so devotedly loved. She is brilliantly capable, genuinely funny, absolutely ruthless, and emotionally broken in ways the narrative never softens or resolves. The shadows that eat darkness for her are a physical expression of what she is: something that consumes what others fear. The sex is explicit, the violence is operatic, and neither is there for shock. Both are expressions of a protagonist whose entire self has been weaponised." },
      { type: 'warning', text: "The footnote-heavy style is either something you love immediately or find exhausting. There is no middle ground. The series darkens considerably across three books. Readers who want grimdark without explicit content will need to look elsewhere; readers who want a female antihero in the same conversation as Locke Lamora and Jorg Ancrath will find nothing closer." },
    ],
  },
  aspects: [
    {
      heading:
        'If you loved the voice: the sardonic first-person narration, the footnotes, the way Kristoff makes wit and brutality feel like the same thing...',
      recs: [
        {
          title: 'The Lies of Locke Lamora',
          author: 'Scott Lynch',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Gentleman Bastard',
          series_number: 1,
          series_label: 'Series (ongoing)',
          audiobook: true,
          note: "Locke Lamora is the most charming thief in a city of thieves, running elaborate cons on the nobility of Camorr while something far more dangerous closes in on him and his crew. Lynch writes with the same crackling energy as Kristoff: the banter is surgical, the plotting is elaborate, and the violence, when it finally arrives, is genuinely shocking after all that wit. The world-building is as meticulous as the Red Church's hierarchy: Camorr is built from ancient alien architecture no one understands, and the criminal ecosystem layered on top of it is one of the most convincing in fantasy. If Mia's voice is the thing that hooked you, Locke is her closest male equivalent.",
          caveat: "No footnotes and no assassin school; Locke is a con artist rather than a killer-in-training, and the connection is in the voice and the damaged genius rather than shared structure.",
          tags: [
            'Heist',
            'Con Artist',
            'Dark City',
            'Morally Grey',
            'Ensemble Cast',
            'Grimdark',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Lies+of+Locke+Lamora+Scott+Lynch&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Lies+of+Locke+Lamora+Scott+Lynch&affiliate=122720',
        },
        {
          title: 'Prince of Thorns',
          author: 'Mark Lawrence',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Broken Empire',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "Jorg Ancrath is fourteen years old, leads a band of mercenary killers, and has been planning his revenge since the day he watched his mother and brother murdered. Like Mia, he is a child shaped entirely by trauma who weaponised that damage before most people finish school, and Lawrence writes his interiority with the same uncomfortable intimacy Kristoff uses for Mia's: you're inside the logic of someone you're not sure you should be rooting for. The prose is leaner than Nevernight but equally precise, and the grimdark credentials are at least as uncompromising. Readers who find Mia too dark rarely find Jorg easier, and vice versa.",
          caveat: "No dark-academy structure at all, and Jorg's voice is colder and less witty than Mia's. Readers sensitive to a teenage narrator committing atrocities with little narrative judgment should know what they're signing up for.",
          warning: 'Graphic violence, sexual assault, child soldier committing atrocities.',
          tags: [
            'Revenge Quest',
            'Morally Grey Protagonist',
            'Child Soldier',
            'Grimdark',
            'Post-Apocalyptic Medieval',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Prince+of+Thorns+Mark+Lawrence&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Prince+of+Thorns+Mark+Lawrence&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the dark magic school: the Red Church as a lethal institution, the curriculum of assassination, the deadly competition between students...',
      recs: [
        {
          title: 'Red Sister',
          author: 'Mark Lawrence',
          darkness_level: 3,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Book of the Ancestor',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          note: "Nona Grey is rescued from the gallows and brought to the Convent of Sweet Mercy, where nuns train girls to become soldiers, assassins, and holy warriors in service of a dying world. Lawrence essentially wrote the female dark magic school novel before Nevernight and from the opposite gender direction: where Mia is irreverent and sardonic, Nona is fierce and loyal, but both are dangerous children learning to be killers inside a rigidly hierarchical institution that will test them to destruction. The convent politics, the found family of training partners, and the revelation of Nona's true nature all follow a similar emotional logic to the Red Church arc. The trilogy is complete and consistently excellent.",
          caveat: "Considerably gentler in register than Nevernight despite the lethal setting; less sex, less sardonic humour, and Nona's voice is sincere rather than acerbic.",
          tags: [
            'Dark Magic School',
            'Female Protagonist',
            'Assassin Training',
            'Found Family',
            'Dying World',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Red+Sister+Mark+Lawrence&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Red+Sister+Mark+Lawrence&affiliate=122720',
        },
        {
          title: 'Six of Crows',
          author: 'Leigh Bardugo',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Six of Crows Duology',
          series_number: 1,
          series_label: 'Duology (complete)',
          audiobook: true,
          note: "Kaz Brekker is the most feared criminal in Ketterdam, and he needs five other specialists to pull off the impossible heist of a heavily guarded magical prison. Six of Crows isn't a school story but it has the same ensemble-of-dangerous-specialists dynamic as the Red Church graduates: each POV character is morally compromised in specific and interesting ways, each has a backstory of damage that explains their edge, and Bardugo's plot is constructed with the same intricate precision Kristoff uses for the Red Church's trials. The romance is more prominent (and more restrained) than Nevernight, but the found family and the heist structure deliver the same emotional satisfaction as watching Mia outmanoeuvre the Red Church hierarchy.",
          caveat: "No dark-academy setting and considerably less explicit than Nevernight; the romance subplots also carry more narrative weight here than anything in the Nevernight Chronicle.",
          tags: [
            'Heist',
            'Morally Grey Ensemble',
            'Assassin',
            'Criminal Underworld',
            'Found Family',
            'Enemies to Lovers',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Six+of+Crows+Leigh+Bardugo&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Six+of+Crows+Leigh+Bardugo&affiliate=122720',
        },
      ],
    },
    {
      heading:
        'If you loved the revenge arc: a protagonist who has been building toward a single act of vengeance since childhood, and the cost that obsession extracts...',
      recs: [
        {
          title: 'The Poppy War',
          author: 'R.F. Kuang',
          darkness_level: 5,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'The Poppy War',
          series_number: 1,
          series_label: 'Trilogy (complete)',
          audiobook: true,
          warning: 'war atrocities, genocide, drug use, graphic violence',
          note: "Rin passes the empire's most brutal examination to earn a place at the elite military academy, discovers she has a power that should be impossible, and watches the world she wanted to succeed inside collapse into war. Kuang and Kristoff are doing the same thing from different cultural directions: both are writing protagonists who gain institutional recognition through exceptional ruthlessness, both are interrogating what it costs a person to become capable of the violence the plot requires, and both trilogies follow those protagonists past the point where the revenge fantasy stops feeling satisfying. The Poppy War is more historically grounded (Sino-Japanese War analogue) and the darkness is more sustained, but Rin and Mia are sisters under the skin.",
          caveat: "The academy setting is confined to the first act; once Rin leaves it, the book becomes a war novel, and the tone turns grimmer rather than sardonic.",
          tags: [
            'Revenge Quest',
            'Military Academy',
            'Dark Power',
            'War',
            'Female Protagonist',
            'Moral Descent',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=The+Poppy+War+RF+Kuang&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=The+Poppy+War+R.F.+Kuang&affiliate=122720',
        },
        {
          title: 'Red Rising',
          author: 'Pierce Brown',
          darkness_level: 4,
          heat_level: 'Closed Door',
          standalone: false,
          series: 'Red Rising',
          series_number: 1,
          series_label: 'Series (6 books)',
          audiobook: true,
          note: "Darrow is a low-caste miner who infiltrates the ruling class's brutal military academy to tear the entire caste system down from inside. Where Mia's revenge is personal and operatic, Darrow's is systemic and political, but the emotional architecture is identical: a protagonist remade by loss, inserted into a lethal training competition, who discovers that surviving the institution requires becoming someone you're not sure you want to be. Brown writes action at the same velocity as Kristoff, and the academy section of the first book (Darrow learning to survive and then to dominate) lands with the same addictive momentum as the Red Church's trials. The series gets progressively more epic in scope.",
          caveat: "No wit or narrative playfulness in Kristoff's register; Darrow's voice is earnest rather than acerbic, and this is science fiction dressed as gladiatorial fantasy rather than secondary-world fantasy.",
          tags: [
            'Revenge Quest',
            'Class War',
            'Survival Competition',
            'Undercover',
            'Political Intrigue',
            'Action-Driven',
          ],
          amazon_url:
            'https://www.amazon.com/s?k=Red+Rising+Pierce+Brown&tag=librariancura-20',
          bookshop_url:
            'https://bookshop.org/search?keywords=Red+Rising+Pierce+Brown&affiliate=122720',
        },
      ],
    },
  ],
  recommendations: [],
  related: [
    {
      title: 'Books Like The Lies of Locke Lamora',
      slug: 'the-lies-of-locke-lamora',
    },
    { title: 'Books Like Six of Crows', slug: 'six-of-crows' },
    { title: 'Books Like The Poppy War', slug: 'the-poppy-war' },
  ],
};
