// ─── Public Tropes ────────────────────────────────────────────────────────────
// 69 canonical tropes exposed to users (filter UI, book pages, community tags).
// The `name` field is the canonical string stored in the books.tropes text[] column.
// The `slug` is for future URL routing and community tag endpoints.

export type TropeCategory = "character" | "relationship" | "plot" | "world-magic";

export type PublicTrope = {
  slug: string;
  name: string;
  category: TropeCategory;
  description: string;
  intro?: string;
  /** Up to 6 book slugs that are the definitive examples of this trope */
  bestExamples?: string[];
  /** Slugs of books-like guides relevant to this trope */
  booksLikeGuides?: string[];
  /** Editorial FAQs shown in the visible FAQ section */
  editorialFaqs?: { q: string; a: string }[];
};

export const PUBLIC_TROPES: PublicTrope[] = [

  // ── CHARACTER (16) ────────────────────────────────────────────────────────
  {
    slug: "anti-hero", name: "Anti-Hero", category: "character",
    description: "A morally complex or flawed main character.",
    intro: "Anti-heroes work in fantasy better than almost any other genre because the genre actually follows the consequences. A morally compromised protagonist in a thriller moves the plot; in fantasy, they have to live inside the world they're damaging for hundreds of pages, and the damage accumulates. Joe Abercrombie spent three books letting Logen Ninefingers convince himself he had no choice, then spent three more proving he was wrong. Fantasy's invented worlds strip away the institutions that absorb the fallout from bad choices — no justice system, no social contract that holds — so when an anti-hero breaks something, it stays broken. What readers who love this trope are really after is the relief of watching someone act without the limits they impose on themselves, and the uncomfortable question of what it means that they enjoyed every page of it.",
    bestExamples: ["the-blade-itself", "the-lies-of-locke-lamora", "nevernight", "red-rising", "best-served-cold", "the-poppy-war", "prince-of-thorns"],
    booksLikeGuides: ["the-blade-itself", "the-lies-of-locke-lamora", "red-rising", "nevernight"],
    editorialFaqs: [
      { q: "What separates an anti-hero from a villain protagonist?", a: "Anti-heroes are protagonists readers root for despite their methods — they have goals we're broadly aligned with, even if their means are reprehensible. Villain protagonists make us root for someone whose goals themselves are wrong or destructive. The distinction is the reader's alignment: an anti-hero is someone you follow; a villain protagonist is someone you watch with uncomfortable fascination." },
      { q: "Which anti-hero fantasy books are best for grimdark newcomers?", a: "The Blade Itself by Joe Abercrombie is the standard recommendation — Logen Ninefingers and Glokta are two of the most compelling anti-heroes in modern fantasy, and the first book delivers the genre's core satisfaction without the bleakness of later entries. The Lies of Locke Lamora is a softer entry point: the protagonist is a con artist rather than a killer, and the tone is warmer." },
    ],
  },
  {
    slug: "assassin-protagonist", name: "Assassin Protagonist", category: "character",
    description: "The main character is a trained killer.",
    intro: "The assassin protagonist works in fantasy because the genre takes the job seriously. Other fiction dresses killers in glamour and moves on; fantasy tracks what systematic training for murder actually does to a person over years. Nevernight spends an entire book inside a killing school, and the reader watches the curriculum — loyalty replaced by calculation, empathy deprogrammed by design. When Jay Kristoff's Mia Corvere feels something, it breaks through that conditioning, which makes it infinitely more valuable than ordinary feeling. Readers who love assassin protagonists are drawn to the paradox: someone capable of absolute coldness choosing, repeatedly, not to be cold.",
    bestExamples: ["nevernight", "assassins-apprentice", "throne-of-glass", "six-of-crows", "best-served-cold", "red-sister", "the-cruel-prince"],
    booksLikeGuides: ["nevernight", "assassins-apprentice", "throne-of-glass", "six-of-crows"],
    editorialFaqs: [
      { q: "What makes assassin protagonist fantasy different from standard action fantasy?", a: "The distinction is craft: an assassin protagonist's violence is deliberate, trained, and premeditated — not reactive. These characters have been shaped by a system (a guild, a court, a mentor) that has methodically removed the instinctive hesitation most people feel about killing. That background creates a specific psychological tension — the reader watches someone who is genuinely capable of coldness try to remain human. Action fantasy has warriors who fight; assassin fantasy has protagonists who calculate." },
      { q: "Which assassin fantasy has the best training arc?", a: "Nevernight by Jay Kristoff is the defining example of assassin school fiction in modern fantasy — Mia Corvere's time at the Red Church is tightly plotted, competitive, and cuts several students who don't make it. Assassin's Apprentice by Robin Hobb is the quieter, more psychological alternative: Fitz's training is intimate and morally complex, the skills learned slowly and at real cost. Throne of Glass establishes Celaena's assassin credentials in backstory rather than training — the reputation is already built when the series begins." },
      { q: "Is there assassin fantasy without a guild or school structure?", a: "Yes. Assassin's Apprentice foregoes the guild entirely — Fitz is trained one-on-one in a specific skill set the crown needs. Best Served Cold by Joe Abercrombie turns the trope inside out: Monza Murcatto is a mercenary captain who becomes an assassin through circumstance, working through a revenge list with no institutional backing. Six of Crows features Inej as an assassin within an ensemble rather than as a solo protagonist — the structure is criminal rather than assassination-guild." },
    ],
  },
  {
    slug: "chosen-one", name: "Chosen One", category: "character",
    description: "A protagonist marked by destiny or prophecy.",
    intro: "The Chosen One is fantasy's most contested premise and its most durable one. It works because the genre can hold two contradictory things at once: the sincere belief that some people are called to something larger than themselves, and the relentless questioning of what 'called' actually means. Brandon Sanderson's Mistborn asks whether prophecy is information or manipulation — whether a hero chosen by an ancient text is being guided or used. A Deadly Education does something different, putting the darkest prophesied sorceress alive in a position where she has to actively fight the narrative that wants her to be a monster. What readers are actually after is the fantasy of purpose — the idea that their own particular strangeness might turn out to matter enormously.",
    bestExamples: ["the-name-of-the-wind", "the-final-empire", "the-way-of-kings", "a-deadly-education", "the-eye-of-the-world", "shadow-and-bone", "red-rising"],
    booksLikeGuides: ["the-name-of-the-wind", "the-final-empire", "the-way-of-kings", "shadow-and-bone"],
    editorialFaqs: [
      { q: "Is the Chosen One trope overused in fantasy?", a: "It's everywhere, but overuse is a symptom, not a flaw. Chosen One stories fail when destiny substitutes for character development — the protagonist is special because the plot says so. They succeed when the protagonist earns the role through failure and choice, or when the story actively interrogates whether 'chosen' means anything at all. A Deadly Education is the most incisive recent deconstruction; Mistborn probably the most satisfying fulfilment." },
      { q: "What's the best Chosen One fantasy for readers who are tired of the trope?", a: "A Deadly Education by Naomi Novik is the most anti-Chosen-One Chosen One story in modern fantasy — the protagonist is supposed to be the darkest sorceress alive and refuses the heroic narrative at every turn. Brandon Sanderson's Mistborn trilogy treats prophecy as a puzzle to be solved rather than a destiny to be embraced." },
    ],
  },
  {
    slug: "cursed-character", name: "Cursed Character", category: "character",
    description: "A character bound by magical curse.",
    intro: "A curse in fantasy is different from a problem — a problem can be solved; a curse reshapes everything you're allowed to be. The character can't simply work harder or be cleverer; the constraint is built into the rules of the world, and the story is about learning to live inside it. Elantris puts its protagonist among the living dead who can't die but can't function, trapped in permanent partial sensation, and asks what kind of society two people can build from inside that horror. V.E. Schwab's The Invisible Life of Addie LaRue goes further: Addie's curse isn't pain but erasure, and the cost isn't physical but relational. Readers who love cursed characters are looking for the emotional permission to sit with something unfixable — and the hope that meaning can survive even constraints that never lift.",
    bestExamples: ["a-court-of-thorns-and-roses", "the-invisible-life-of-addie-larue", "elantris", "circe", "spinning-silver", "gild", "the-cruel-prince"],
    booksLikeGuides: ["a-court-of-thorns-and-roses", "elantris", "circe", "spinning-silver"],
    editorialFaqs: [
      { q: "What makes a cursed character different from one who just faces a magical obstacle?", a: "A curse is identity-level, not plot-level. It defines what the character cannot be, cannot have, or cannot escape — and the story forces them to live inside that constraint rather than simply solve it. In Elantris, Raoden's curse turns him into a living dead man who must build a society from within his prison. In The Invisible Life of Addie LaRue, the curse is the premise: every person Addie meets forgets her the moment she leaves. These are not problems to be solved in act two — they are the architecture the entire story is built around." },
      { q: "Is cursed character fantasy a good entry point for romance readers?", a: "Yes, particularly ACOTAR and Gild, which use curses as engines of forced proximity and high-stakes emotional tension. The curse creates a reason why two characters cannot simply walk away from each other, which is catnip for romance pacing. ACOTAR is the most romance-forward and the most accessible. Spinning Silver is slower but the curse creates a similar trapped-together dynamic between Miryem and the Staryk king. If you want romance first and fantasy second, start with ACOTAR or Gild." },
      { q: "Do cursed character stories always end with the curse broken?", a: "No, and the best ones interrogate whether breaking the curse is even desirable. Circe ends on her own terms, not a restoration of her original state. The Invisible Life of Addie LaRue has a resolution, but it reframes rather than simply undoes the premise. Elantris does break its curse, but the emotional cost of what the characters became during it remains. Readers who need clean resolution should read Elantris or ACOTAR; readers who want something more ambiguous should try Circe or Addie LaRue." },
    ],
  },
  {
    slug: "dark-lord", name: "Dark Lord", category: "character",
    description: "A powerful evil ruler threatening the world.",
    intro: "The Dark Lord works in fantasy because the genre can make evil feel like it has weight — architectural, historical, something that has been building for centuries before the protagonist was born. Tolkien's Sauron is barely a character and completely terrifying precisely because he's a presence rather than a person, a will that bends the fabric of the world toward its end. Modern fantasy has largely moved away from that archetype and toward something more unsettling: the Dark Lord whose goals are comprehensible, whose corruption has a traceable beginning, whose shadow was cast by something that made sense at the time. The Stormlight Archive gives us Odium, a god of passion and destruction who argues he's made a terrible kind of mercy. Readers drawn to Dark Lord fantasy are often interested in what power actually does to the person holding it — not the monster at the end, but the steps that led there.",
  },
  {
    slug: "dragon-rider", name: "Dragon Rider", category: "character",
    description: "A character bonded to or riding dragons.",
    intro: "Dragon rider fantasy succeeds or fails entirely on the quality of the bond. The aerial combat and the spectacle matter, but what readers actually return to is the specific texture of a relationship between two minds that shouldn't understand each other and do. Anne McCaffrey built the template over decades of Pern novels, where the bond between rider and dragon is a telepathic connection so total that losing the dragon often means losing the will to live. Fourth Wing modernizes that setup, making the rider-dragon relationship the emotional spine of a military academy story where the dragons are dangerous, opinionated, and not remotely obligated to choose you. Readers who seek out dragon rider stories are looking for a particular kind of intimacy — partnership at a scale that human relationships can't reach.",
  },
  {
    slug: "immortal-character", name: "Immortal Character", category: "character",
    description: "A character who cannot die naturally.",
    intro: "Immortality works in fantasy as a sustained thought experiment about what accumulated loss actually does to a person. After enough centuries, everyone the immortal loved is gone, every home they had is rubble, and they've had to develop mechanisms for surviving grief that no human lifespan ever required. V.E. Schwab's The Invisible Life of Addie LaRue compresses this into an 18th-century woman who cannot die but cannot be remembered, and the result is a portrait of loneliness so specific it feels medical. The older tradition — Tolkien's Elves, the long-lived figures of epic mythology — frames immortality as burden and beauty simultaneously; the modern tradition tends to ditch the beauty. Readers drawn to immortal characters want the perspective that only deep time can give: the view from outside the brief, urgent sprint of a mortal life.",
  },
  {
    slug: "last-of-their-kind", name: "Last Of Their Kind", category: "character",
    description: "A character who is the sole survivor of their race, people, or lineage.",
    intro: "Being the last of your kind in fantasy means carrying your entire history in your body — language, memory, practice, grief — because when you go, it goes with you. The trope forces questions about what survival obligates: is staying alive an act of preservation or an act of selfishness, and does the distinction matter? The Fifth Season's Essun is not quite the last orogene in the world, but she lives close enough to extinction that every choice about hiding her power carries the weight of species-level risk. That pressure — the idea that this person is the only remaining proof that something existed — transforms every scene they're in. Readers who seek out this trope are often drawn to stories about the burden of being the one who remembers.",
  },
  {
    slug: "lost-heir", name: "Lost Heir", category: "character",
    description: "A hidden heir to a throne or power.",
    intro: "The lost heir premise is two stories that don't resolve at the same moment. The first is about discovery — finding out who you actually are and what that means for every relationship that came before the revelation. The second is about legitimacy — the crown doesn't care about your feelings, and the court that controlled the succession during your absence has its own ideas about what you deserve. Shadow and Bone uses this structure to put Alina Starkov at the center of a geopolitical crisis the moment her power is revealed, and the world she's suddenly heir to is deeply hostile to her survival. The tension that makes this trope satisfying is not the reveal but the gap between identity and power — knowing who you are and actually controlling it are completely different skills. What readers want from a lost heir story is the experience of a self being reclaimed against the resistance of everyone who benefited from keeping it hidden.",
  },
  {
    slug: "mentor-figure", name: "Mentor Figure", category: "character",
    description: "A wise guide or parental figure who shapes the protagonist — and may not survive.",
    intro: "The best mentor characters in fantasy are defined by what they failed to become — the limit they hit, the cost they paid, the thing they couldn't cross that the protagonist eventually must. Dumbledore is the most familiar version: infallible on the surface, privately catastrophic in hindsight. Robin Hobb's Chade Fallstar is a quieter and more damning example: a man who has given his entire existence to serving the Farseer crown, who trained Fitz to do the same, and whose mentorship is inseparable from the system that will eventually break them both. The mentor's investment in the student is always partly a way of settling a debt they owed themselves. Readers drawn to mentor figures are often looking for permission to learn from someone who also got things badly wrong.",
  },
  {
    slug: "morally-grey-hero", name: "Morally Grey Hero", category: "character",
    description: "A hero operating outside clear moral lines.",
    intro: "The morally grey hero is distinct from the anti-hero in one crucial way: they still care whether what they're doing is right. They just don't have the luxury of always acting like it. Fantasy puts these characters in positions where the clean choice and the effective choice are rarely the same, which means readers spend entire books watching someone try to hold onto something that the world is actively trying to take from them. Dalinar Kholin in The Stormlight Archive is the most sustained example — a man with a historically brutal past trying to build something just with the same hands that destroyed everything before. Readers who seek out this trope are looking for the emotional weight of watching someone try to be good in a situation specifically designed to prevent it.",
    bestExamples: ["the-blade-itself", "the-lies-of-locke-lamora", "red-rising", "best-served-cold", "the-poppy-war", "nevernight", "prince-of-thorns"],
    booksLikeGuides: ["the-blade-itself", "red-rising", "prince-of-thorns", "the-lies-of-locke-lamora"],
    editorialFaqs: [
      { q: "What separates a morally grey hero from a villain protagonist?", a: "The distinction is usually motivation and self-awareness. A morally grey hero does terrible things but retains some moral compass — they know what they're doing is wrong, or they're trying to serve something larger than themselves. A villain protagonist often lacks that tension; the horror is in how little they register the cost. Logen Ninefingers in The Blade Itself sits right on the line — the whole point is that the line keeps moving." },
      { q: "Which morally grey hero has the best character arc in fantasy?", a: "Dalinar Kholin (The Stormlight Archive) is the most thorough treatment of a morally grey past being fully reckoned with — his arc spans four books and earns its resolution. For a single-book arc, Monza Murcatto in Best Served Cold starts as a revenge machine and ends somewhere complicated. Rin in The Poppy War is the best descent arc: she starts sympathetic and the reader watches every step of the transformation." },
      { q: "Are morally grey heroes always in grimdark fantasy?", a: "They dominate grimdark but they're not exclusive to it. Kaz Brekker in Six of Crows is morally grey within a heist thriller. Locke Lamora in The Lies of Locke Lamora is a con artist operating in morally grey space with a lighter tone than most grimdark. The difference is that grimdark rarely redeems its grey heroes — the grey is the point, not a phase they pass through." },
    ],
  },
  {
    slug: "outcast-hero", name: "Outcast Hero", category: "character",
    description: "A protagonist rejected by society.",
    intro: "The outcast hero's central question isn't whether they'll be accepted — it's whether they'd want to be, once they've seen the system from outside. Fantasy gives the exclusion real teeth: being cast out isn't social awkwardness but survival threat, exile into hostile landscape, or magic that marks you visibly as wrong. Kaz Brekker in Six of Crows was built by Ketterdam's Barrel, the city's lowest stratum, and every choice he makes is downstream of that formation — he's not trying to join the society that discarded him, he's trying to extract everything it owes him. The outcast's advantage is that they have nothing to protect except what they've chosen to care about. What readers are looking for in outcast fantasy is the particular satisfaction of watching someone the system wrote off become the thing the system can't survive.",
  },
  {
    slug: "prophecy-child", name: "Prophecy Child", category: "character",
    description: "A character born into or shaped by prophecy, destined for a role they didn't choose.",
    intro: "The prophecy child trope is about the violence of expectation — the way being defined as what you're for prevents you from becoming who you are. The character hasn't done anything yet; the weight on them is entirely about what someone else decided they would do, often before they were born. Wheel of Time's Rand al'Thor spends thousands of pages learning to be the Dragon Reborn, and a significant portion of that education is about surviving the process of becoming a symbol while remaining a person. The most interesting prophecy child stories treat the prophecy not as a promise but as a kind of possession — the future laying claim to the present. Readers drawn to this trope are usually drawn to the exact pressure it describes: the gap between who you're expected to be and who you actually are.",
  },
  {
    slug: "reluctant-hero", name: "Reluctant Hero", category: "character",
    description: "A hero who does not initially seek their role.",
    intro: "The reluctant hero works because the alternative — someone who eagerly volunteers to save the world — is harder to believe. Fantasy earns its reluctance through specificity: the protagonist has a home, relationships, a life that is small and real and worth protecting, and the call to action asks them to risk all of it. Tolkien's Frodo is the template: a Hobbit whose entire character is defined by what he wants to preserve, not what he wants to achieve, and the reluctance isn't cowardice — it's sanity. What makes the best reluctant heroes compelling is the moment they stop being dragged and start choosing, because the choice comes late and costs something. Readers who gravitate to this trope often want the experience of watching someone become brave not because they were built for it, but because the situation eventually left them no other honest option.",
  },
  {
    slug: "secret-royalty", name: "Secret Royalty", category: "character",
    description: "A protagonist unaware of their royal lineage.",
    intro: "Secret royalty stories work because the reveal is a trap, not a gift. The crown comes with enemies the protagonist didn't know they had, obligations they didn't consent to, and the immediate problem of whether the people around them were friends or positions. Fantasy makes the political dimension unavoidable: in a world organized around bloodlines and succession, knowing who your parents were changes your legal status, your safety, and everyone else's calculation of whether you're useful or dangerous. Most secret royalty narratives use the discovery to test whether a commoner's values survive contact with aristocratic power — and the answer is rarely clean. Readers who love this trope are drawn to identity under pressure: the question of whether who you were before you knew is still who you are after.",
  },
  {
    slug: "villain-protagonist", name: "Villain Protagonist", category: "character",
    description: "The main character begins as or becomes the antagonist.",
    intro: "The villain protagonist is fiction's hardest technical challenge: sustaining readerly investment in someone whose goals are actively wrong. Fantasy handles it best when the protagonist's internal logic is airtight — they're not evil because the story needed a dark protagonist, they have a coherent framework that makes sense from inside their head and horrifies from outside it. R.F. Kuang's Rin in The Poppy War begins sympathetic, ends as a war criminal, and the reader is present for every step of the transformation — which means they're also present for every step where a different choice was possible. The book doesn't forgive her; it just refuses to look away. Readers drawn to villain protagonists are willing to sit in that discomfort — they want the experience of understanding something they can't endorse.",
  },

  // ── RELATIONSHIP (15) ─────────────────────────────────────────────────────
  {
    slug: "betrayal", name: "Betrayal", category: "relationship",
    description: "A trusted ally betrays the protagonist.",
    intro: "A great betrayal in fantasy is one the reader saw coming and chose to discount, because the alternative was too painful. The setup is everything: the more genuine the trust, the more the reader invests in hoping they're wrong, and the harder the landing when they aren't. In Mistborn: The Final Empire, the betrayal hits with mechanical precision — Sanderson has been leaving the pieces in plain sight while readers were watching something else. Betrayal in fantasy doesn't just wound the relationship it touches; it ripples outward through alliances, armies, and the entire structure of who can be trusted with what. What readers who love this trope are actually looking for is the emotional accuracy of it — the recognition that the people most capable of hurting you are the ones you handed the knife to.",
    bestExamples: ["the-final-empire", "the-lies-of-locke-lamora", "six-of-crows", "the-blade-itself", "red-rising", "the-poppy-war", "assassins-apprentice"],
    booksLikeGuides: ["the-final-empire", "the-lies-of-locke-lamora", "six-of-crows", "red-rising"],
    editorialFaqs: [
      { q: "What separates a great fantasy betrayal from a cheap twist?", a: "Setup and motivation. A great betrayal recontextualises everything you've already read — you go back and realise the signs were there, the logic was always there, you just didn't want to see it. The Final Empire does this with Kelsier: the betrayal lands harder because his philosophy almost invited it. The Lies of Locke Lamora does it structurally, with a villain who has been operating in plain sight. A cheap twist is one where the betrayer had no coherent reason, or where the story withheld information unfairly. If you're angry at the character, the betrayal worked. If you're angry at the author, it didn't." },
      { q: "Which betrayal fantasy hits hardest emotionally?", a: "Assassin's Apprentice is the most quietly devastating — the betrayals accumulate slowly, from people who genuinely believe they're acting correctly, which makes them impossible to hate cleanly. Red Rising hits harder in a visceral, gut-punch way: the betrayal in the early section reframes the entire first act. The Poppy War is the most brutal because the betrayal is institutional, not personal — the system itself is the betrayer. Which hits hardest depends on whether you prefer intimate or structural devastation." },
      { q: "Is betrayal fantasy too dark for readers who prefer hopeful stories?", a: "Not necessarily — betrayal is a narrative engine, not a mood. Mistborn: The Final Empire uses betrayal in service of an ultimately hopeful story about rebellion and found family. Six of Crows surrounds its betrayals with tremendous loyalty and camaraderie, so the moments of treachery make the bonds feel more real, not more bleak. The books to avoid if you want lighter fare are The Poppy War, which is genuinely harrowing, and The Blade Itself, which uses moral ambiguity as its core aesthetic. If you want betrayal with warmth, start with Six of Crows or Mistborn." },
    ],
  },
  {
    slug: "bodyguard-romance", name: "Bodyguard Romance", category: "relationship",
    description: "A protector falls for the protected.",
    intro: "The bodyguard romance works because the professional prohibition is a perfect slow-burn engine: every scene between the protector and the protected is charged by the explicit rule that nothing can happen. Fantasy makes the prohibition serious — From Blood and Ash's Hawke is forbidden from touching the Maiden not by social convention but by religious law with death as the penalty, which transforms every stolen glance into an act of genuine risk. The closeness mandated by the job compounds the problem; the protector can't escape the person they're not supposed to want. What makes the fantasy version particularly effective is that the threats to the protected character are real, which means the bodyguard's attraction is always in tension with the fear of what happens if they're distracted at the wrong moment. Readers who gravitate to bodyguard romance want the specific charge of two people trapped together by duty, choosing desire anyway.",
    bestExamples: ["from-blood-and-ash", "fourth-wing", "an-ember-in-the-ashes", "throne-of-glass", "iron-flame", "electric-idol", "a-court-of-thorns-and-roses"],
    booksLikeGuides: ["from-blood-and-ash", "fourth-wing", "throne-of-glass", "a-court-of-thorns-and-roses"],
    editorialFaqs: [
      { q: "What makes bodyguard romance work so well in fantasy settings?", a: "Fantasy raises the stakes on both sides of the dynamic. The protected is usually someone of political, magical, or symbolic importance — which means the threats are real and the cost of failure is catastrophic. The protector's duty becomes a structural reason they cannot act on their feelings, and every scene of closeness carries the weight of that prohibition. From Blood and Ash is the clearest example: Hawke is forbidden from touching the Maiden, which makes every conversation between them a negotiation between desire and duty. Fantasy removes the reader's assumption that both characters will survive, which makes the emotional tension feel genuinely dangerous." },
      { q: "Which bodyguard romance is best for readers who want action alongside the romance?", a: "An Ember in the Ashes prioritises action and political tension as much as romance — the relationship between Laia and Elias develops inside a brutal military setting where survival is not guaranteed. Fourth Wing has the same balance: Violet and Xaden's dynamic unfolds inside a war academy where people die regularly and the romance is one thread among several. Both are good choices if you want the protection fantasy without the story subordinating everything else to the relationship. If you want romance-first with fantasy window-dressing, From Blood and Ash or ACOTAR are the better picks." },
      { q: "Do bodyguard romances usually have a role reversal or power shift?", a: "The best ones do. In Throne of Glass, Celaena is ostensibly the one being controlled and guarded, but she's also the assassin — the power dynamic inverts repeatedly because the person being watched is more dangerous than the watcher. In A Court of Silver Flames, Cassian is assigned to train and protect Nesta, but Nesta's power eventually surpasses his in ways that complicate the protector framing. A flat bodyguard romance where the protected character stays passive throughout tends to feel thinner than one where both characters' capabilities shift across the story." },
    ],
  },
  {
    slug: "enemies-to-lovers", name: "Enemies to Lovers", category: "relationship",
    description: "Rivals develop romantic feelings.",
    intro: "Enemies to lovers is about the exhaustion of maintaining contempt for someone you keep having to rely on. Fantasy gives the enemies genuine grievances — rival courts, opposing factions, someone who actually killed people you loved — which means when the shift happens, it has to work harder and feels more earned than a misunderstanding that could have been cleared up in a conversation. Holly Black's The Cruel Prince spends three books making the antagonism between Jude and Cardan feel structural and real before earning the turn, and that patience is what makes the payoff work. The best versions of this trope don't pretend the enmity disappears — it gets folded into something more complicated, neither purely resolved nor purely sustained. What readers want is the specific thrill of watching resistance fail, slowly and believably, against someone who was never supposed to matter.",
    bestExamples: ["the-cruel-prince", "a-court-of-thorns-and-roses", "six-of-crows", "from-blood-and-ash", "divine-rivals", "serpent-dove", "the-bridge-kingdom"],
    booksLikeGuides: ["the-cruel-prince", "from-blood-and-ash", "a-court-of-thorns-and-roses", "divine-rivals"],
    editorialFaqs: [
      { q: "What makes enemies to lovers work in fantasy specifically?", a: "Fantasy gives enemies genuine, high-stakes reasons to hate each other — rival kingdoms, opposing magic systems, someone who killed your family — rather than a misunderstanding. That means the eventual shift carries real weight: overcoming years of trained enmity, not just a bad first impression." },
      { q: "Which enemies to lovers fantasy has the slowest, most satisfying burn?", a: "For the most agonizing slow burn, The Cruel Prince by Holly Black is the standard recommendation — the antagonism is relentless and the pivot is earned over multiple books. From Blood and Ash by Jennifer L. Armentrout takes longer to deliver on the romantic tension but compensates with constant heat. For something darker and more literary, Nevernight makes the reader wait an entire book before anything resolves." },
      { q: "Are there enemies to lovers books without explicit content?", a: "Yes — enemies to lovers spans every heat level. The Cruel Prince (closed door), Nevernight (open door), and most Sarah J. Maas titles (explicit) all feature the trope at different intensities. Check heat ratings before starting a new series if that matters to you." },
    ],
  },
  {
    slug: "fated-mates", name: "Fated Mates", category: "relationship",
    description: "Two characters bound by destiny.",
    intro: "Fated mates takes the romantic ideal of 'meant to be' and forces it to answer for itself. Fantasy gives the bond physical reality — a magical tether, a shared mark, a compulsion that operates whether the characters want it to or not — which removes the ambiguity that surrounds ordinary attraction and replaces it with a different problem: what does it mean to fall for someone you may not have chosen freely? A Court of Mist and Fury is where the trope hit its current cultural peak, with the mating bond between Feyre and Rhysand resisted across an entire book before both characters acknowledge what it means. The tension in fated mates stories isn't 'will they get together' — it's 'is this a blessing or an imposition, and can the difference even matter?' Readers drawn to this trope want the overwhelming intensity of an attraction that bypasses all the usual defenses — the fantasy of a love that is, on some level, simply true.",
    bestExamples: ["a-court-of-thorns-and-roses", "from-blood-and-ash", "fourth-wing", "a-court-of-mist-and-fury", "iron-flame", "the-cruel-prince", "serpent-dove"],
    booksLikeGuides: ["a-court-of-thorns-and-roses", "from-blood-and-ash", "fourth-wing", "iron-flame"],
    editorialFaqs: [
      { q: "What is fated mates in fantasy?", a: "Fated mates is a romantic fantasy trope where two characters share a supernatural bond — often a soul-mate connection dictated by magic, prophecy, or biological compulsion. Unlike enemies to lovers, the attraction isn't built through conflict; it's imposed from outside. The story tension comes from whether the characters accept, resist, or find a way to rewrite their fate." },
      { q: "Which fated mates fantasy books are most popular?", a: "A Court of Thorns and Roses by Sarah J. Maas established the modern template, with the mating bond introduced fully in A Court of Mist and Fury. From Blood and Ash and Fourth Wing are the other two dominant series in the space, both with fated connections that complicate existing relationships rather than creating them from scratch." },
      { q: "Is fated mates the same as soul mates?", a: "They're related but distinct. Soul mates in fantasy implies destiny and emotional compatibility. Fated mates typically involves a physical, magical bond that affects both characters' behavior — often involuntarily. Fated mates carry higher stakes and more resistance than the soul mate trope, making them better suited to longer, higher-tension narratives." },
    ],
  },
  {
    slug: "forbidden-romance", name: "Forbidden Romance", category: "relationship",
    description: "A romance forbidden by society or duty.",
    intro: "Forbidden romance works because every moment two characters spend together is a choice against the world's clear instruction to stay apart. Fantasy makes that choice genuinely costly — not social embarrassment but exile, war, execution, or something the plot has established as functionally worse. The Jasmine Throne builds its romance between a deposed princess and the woman assigned to be her handmaiden inside a caste system where the power imbalance is encoded in law, and Tasha Suri makes sure both characters understand exactly what they're risking. What distinguishes the best forbidden romances from the merely high-stakes ones is that the forbidding force has its own coherent logic — it isn't just an obstacle, it's a world with reasons. Readers who love forbidden romance are drawn to the declaration of it: two people deciding that what they have is worth more than what they'd lose.",
    bestExamples: ["the-cruel-prince", "a-court-of-thorns-and-roses", "the-jasmine-throne", "from-blood-and-ash", "divine-rivals", "nevernight", "kingdom-of-the-wicked"],
    booksLikeGuides: ["the-cruel-prince", "a-court-of-thorns-and-roses", "the-jasmine-throne", "from-blood-and-ash"],
    editorialFaqs: [
      { q: "What kinds of forbidden romance appear most often in fantasy?", a: "Fantasy's forbidden romance usually falls into three types: political (two people from enemy factions or kingdoms), class-based (royalty and commoner, or master and servant), and supernatural (fae and human, god and mortal). Political forbidden romance tends to carry the highest stakes since the consequences extend beyond the individuals." },
      { q: "Which forbidden romance fantasy books are worth reading beyond ACOTAR?", a: "The Jasmine Throne by Tasha Suri offers a sapphic forbidden romance in a South Asian-inspired setting — the prohibition comes from caste and circumstance rather than supernatural law. Divine Rivals by Rebecca Ross is a lighter option with the romance forbidden by professional rivalry rather than political danger." },
    ],
  },
  {
    slug: "forced-proximity", name: "Forced Proximity", category: "relationship",
    description: "Characters must stay physically close.",
    intro: "Forced proximity removes the option of a tactful exit, which is the only thing keeping most fictional tension from escalating. In ordinary life you can leave; in a fantasy dungeon crawl, an enchanted contract, or a war campaign, you cannot. What makes the trope work so well in fantasy is that the inescapability is structural rather than contrived — the world has engineered an arrangement where these two people must be in proximity, and the story doesn't have to apologize for it. From Blood and Ash's forbidden pairing is forced into constant proximity by the religious function Hawke serves, which means the tension builds through accumulation rather than incidence. Readers who gravitate to forced proximity are responding to what it reveals: stripped of the ability to manage appearances, characters become more honest, more themselves, and eventually more vulnerable than they intended to be.",
  },
  {
    slug: "found-family", name: "Found Family", category: "relationship",
    description: "Unrelated characters form deep familial bonds.",
    intro: "Found family hits differently than blood family in fiction because the choice is visible on the page. These people don't owe each other anything by birth; every act of loyalty is a decision, which means every act of loyalty means something. Fantasy builds found families through the specific alchemy of shared danger — the people you survive something terrible with are bound to you in a way that ordinary friendship can't produce. Six of Crows is the genre standard because Leigh Bardugo earns the bonds individually, giving each member of the Dregs enough interiority that losing any one of them would hurt readers at a specific frequency rather than a general one. Readers who love this trope are often looking for permission to believe that home is something you can build, not just something you were born into.",
    bestExamples: ["six-of-crows", "the-final-empire", "kings-of-the-wyld", "the-poppy-war", "the-lies-of-locke-lamora", "the-way-of-kings", "red-rising"],
    booksLikeGuides: ["six-of-crows", "the-final-empire", "the-lies-of-locke-lamora", "the-way-of-kings"],
    editorialFaqs: [
      { q: "Why is found family so central to fantasy?", a: "Fantasy protagonists are frequently exiles, orphans, or outcasts — people separated from blood family by circumstance or choice. The genre's ensemble quests and shared dangers compress relationship development in ways that ordinary life can't. When you've survived something together, the bond means more." },
      { q: "Which found family fantasy books hit hardest emotionally?", a: "Six of Crows by Leigh Bardugo is the standard recommendation — the crew dynamic is the entire point, and Bardugo writes each member with enough distinct texture that losing any of them would genuinely hurt. Kings of the Wyld by Nicholas Eames takes the found family of aging mercenaries and puts that bond under maximum pressure in a single volume." },
      { q: "Does found family always mean a heist or ensemble crew?", a: "No — found family takes many forms. It can be a lone mentor and protégé (Name of the Wind), a war-forged unit (The Poppy War), a court of rivals who become something more (Way of Kings), or a heist crew (Six of Crows). What defines it isn't structure but emotional stakes: these people choose each other." },
    ],
  },
  {
    slug: "grumpy-sunshine", name: "Grumpy x Sunshine", category: "relationship",
    description: "Opposite personalities clash and attract.",
    intro: "The grumpy/sunshine dynamic works because it is fundamentally about two different theories of how to survive. The guarded character has built walls because walls worked; the open character has stayed open because closing down never felt like protection. Fantasy is useful for this trope because the backstory for the guarded character can be genuinely catastrophic — not just a bad relationship but wars, losses, magic that hurt — which makes the walls feel earned rather than just defensive posturing. The best pairings are ones where the sunshine character isn't simply relentlessly cheerful but actively refuses the grumpy character's premise — they're not naive, they just disagree. Readers drawn to this trope want the particular warmth of watching someone decide that another person is worth softening for.",
  },
  {
    slug: "love-triangle", name: "Love Triangle", category: "relationship",
    description: "Three characters entangled romantically.",
    intro: "The love triangle earns its reputation as a tired trope when it functions as a poll — readers voting for their preferred option while the protagonist wavers. It earns genuine power when both options represent incompatible versions of who the protagonist can become, and choosing one closes the other for good. Fantasy is particularly suited to this because the romantic choice is often structurally tied to political allegiance or magical destiny — Alina Starkov's choice in Shadow and Bone is not just personal but geopolitical, and Leigh Bardugo makes sure the reader feels what each option costs. The triangle becomes compelling when it stops being about preference and starts being about identity: which love demands the protagonist to be the version of themselves they can live with. Readers drawn to love triangles are often drawn to the specific pain of the road not taken — the option that made complete sense and still couldn't be chosen.",
    bestExamples: ["shadow-and-bone", "a-court-of-mist-and-fury", "an-ember-in-the-ashes", "throne-of-glass", "fourth-wing", "from-blood-and-ash", "the-cruel-prince"],
    booksLikeGuides: ["shadow-and-bone", "an-ember-in-the-ashes", "throne-of-glass", "from-blood-and-ash"],
    editorialFaqs: [
      { q: "Do love triangles always get resolved by the end of a series?", a: "In romantasy and YA fantasy, almost always — leaving two options genuinely open tends to frustrate readers enough that authors close it. The question is usually when and how. Shadow and Bone takes three books to fully resolve its triangle, and the resolution divided the fandom sharply. Throne of Glass adds and removes options across six books before settling." },
      { q: "Which fantasy love triangle has the most reader debate?", a: "The Darkling vs Mal debate in Shadow and Bone is the most sustained fandom argument in recent fantasy — years after the series ended, readers still disagree whether Leigh Bardugo made the right narrative choice. Team Darkling argued his arc deserved a different resolution; Team Mal argued the point was always there. An Ember in the Ashes runs a close second, with the Elias/Laia/Keenan dynamic generating genuine uncertainty across four books." },
      { q: "Are there love triangles where the protagonist doesn't end up with either option?", a: "Rare in fantasy, but they exist. Some series resolve the triangle by removing one option through death or betrayal rather than a clean romantic choice — which tends to read as the author dodging the question. The more interesting version is when the protagonist's relationship with herself changes enough that neither original option fits anymore. That's harder to execute but avoids the triangle feeling like a simple either/or." },
    ],
  },
  {
    slug: "mentor-student", name: "Mentor and Student", category: "relationship",
    description: "A guiding teacher and protégé bond.",
    intro: "The mentor-student relationship in fantasy is really a story about the transmission of something fragile: a skill, a way of seeing, a tradition that will disappear if it isn't passed on. What makes it emotionally complex is that the relationship is built on an inherent imbalance the story is designed to dissolve — the teacher's whole purpose is to make themselves unnecessary. Assassin's Apprentice tracks this with Fitz and Chade, where the mentorship is intimate and morally compromised from the beginning, and the skills Fitz learns are precisely the ones that will eventually enable him to act without guidance. The surpassing moment — when the student exceeds the teacher — is one of fantasy's most emotionally loaded scenes when it's handled well. Readers drawn to this trope are looking for a story about formation: what it means to be genuinely shaped by someone else's knowledge and care, and what it costs both people.",
  },
  {
    slug: "political-marriage", name: "Political Marriage", category: "relationship",
    description: "Marriage arranged for power or alliance.",
    intro: "Political marriage works in fantasy because the arrangement is transparent: both characters know exactly why they're together, which eliminates the early-stage pretense of most romances and skips straight to the harder question of what you build when there's nothing personal to begin with. The intimacy is mandatory and the trust is absent, which is an extraordinary setup for watching two people either find something real or perform warmth so convincingly they eventually produce it. The Cruel Prince establishes a marriage-of-convenience dynamic between Jude and Cardan that has all the surface features of political alliance and all the buried tension of people who hate each other in a very specific, personal way. Fantasy's court structures make the stakes obvious: a political marriage that fails in the wrong direction can start wars. Readers drawn to this trope want the slow, grudging negotiation of two people who are stuck with each other discovering they might not mind.",
  },
  {
    slug: "redemption-arc", name: "Redemption Arc", category: "relationship",
    description: "A character seeks redemption for past sins.",
    intro: "Redemption arcs in fantasy are slow because they need to be — the thing being redeemed from has to be real enough that its weight is felt throughout the process, not just acknowledged and set aside. A three-book arc that earns redemption has hundreds of pages of the character behaving differently in situations that cost them something, not a single noble act that cancels out years of damage. Dalinar Kholin in The Stormlight Archive is the genre's most thorough treatment: a warlord who did something so terrible it took Oathbringer's entire flashback structure to deliver, rebuilding across multiple books without the narrative ever suggesting the debt is simply forgiven. The important thing is that the character never gets to decide they're redeemed; only the people they harmed can offer that. Readers who love redemption arcs are looking for the proof that change is possible — not inevitable, not guaranteed, but actually possible.",
    bestExamples: ["the-way-of-kings", "the-blade-itself", "six-of-crows", "the-cruel-prince", "a-court-of-mist-and-fury", "a-little-hatred", "red-rising"],
    booksLikeGuides: ["the-blade-itself", "six-of-crows", "the-cruel-prince", "red-rising"],
    editorialFaqs: [
      { q: "Does a redemption arc require the character to succeed?", a: "No — and the best ones often don't. The arc is about the attempt, not the outcome. Logen Ninefingers across The First Law trilogy is explicitly a test of whether a person can escape what they are. Sanderson's Dalinar (The Stormlight Archive) is the counterexample: one of fantasy's few arcs where the redemption is fully earned and unambiguous. Both are correct; the question is what the story is actually about." },
      { q: "What is the most celebrated redemption arc in fantasy?", a: "Dalinar Kholin in The Stormlight Archive is the most frequently cited. His arc starts with Oathbringer's brutal flashback revelations and pays off across Words of Radiance and beyond — it works because Sanderson makes the reader genuinely uncertain whether redemption is possible before delivering it. Cardan in The Cruel Prince is the most popular romantasy example, though it operates on a much shorter timescale." },
      { q: "Can a villain get a convincing redemption arc in a single book?", a: "It's very hard to do well in isolation — the change needs to feel earned, not convenient, which usually requires substantial page time for the before and after. Cardan in The Cruel Prince manages it across three books. In a single volume, the more common approach is a partial redemption: the character makes one genuinely costly choice that signals change without resolving everything. Full single-book villain redemptions tend to feel rushed unless the book is very long." },
    ],
  },
  {
    slug: "rivals-to-allies", name: "Rivals to Allies", category: "relationship",
    description: "Competitors unite for a common cause.",
    intro: "Rivals to allies is more durable than friends to allies because the rivalry already proves something: these two people saw each other clearly enough to compete. The competitive history isn't baggage to be overcome — it's evidence of mutual respect operating in a hostile form, and when the rivalry pivots, that respect is already there. Fantasy excels at this because it can give rivals genuinely high-stakes reasons to have competed — same school, same resource, same position open — and equally high-stakes reasons to pivot. Six of Crows doesn't have a clean rivals-to-allies arc, but characters move from suspicion to something more layered across the story, and the movement is legible because the initial friction was real. What readers want from this trope is not a rivalry dissolved but a rivalry transformed — the same intelligence and drive that made them competitors pointed at the same problem.",
  },
  {
    slug: "second-chance-romance", name: "Second Chance Romance", category: "relationship",
    description: "Former lovers reunite.",
    intro: "Second chance romance is unusual in the emotional demand it makes: the reader has to believe both in what was lost and in the possibility of recovery, simultaneously. The history has to explain why they separated without making that separation feel like the natural endpoint, which is genuinely difficult to write. Fantasy's long timelines are useful here — a separation of twenty years or two centuries carries different weight than a brief gap, and the world changes enough around the characters that their reunion is also a meeting between two versions of themselves the original relationship never knew. A Court of Silver Flames handles a version of this between Nesta and Cassian, where the damage done during the first series has to be addressed before anything new can grow. Readers drawn to second chance romance are often looking for the specific hope it offers: that something real can survive being broken, given enough time and honesty.",
  },
  {
    slug: "slow-burn", name: "Slow Burn", category: "relationship",
    description: "Romantic or emotional tension develops gradually.",
    intro: "Slow burn is a specific kind of reading experience: you are tracking micro-signals across hundreds of pages — a hand not quite withdrawn, a word chosen very carefully — and the accumulation of those signals is the story. Fantasy is the natural habitat for this because only fantasy has the page count to do it properly; a 600-page epic can sustain months of narrative time between meaningful looks, and that elapsed time is what makes the eventual break feel earned rather than convenient. From Blood and Ash is the clearest current example: Jennifer L. Armentrout builds the tension between Hawke and Poppy across an entire book of forbidden proximity, and readers come back for the ache as much as the resolution. The slow burn is about want maintained at a specific pitch — not satisfied, not abandoned, just sustained. What readers who love this trope are actually after is the experience of longing itself, held open long enough to feel it properly.",
    bestExamples: ["from-blood-and-ash", "divine-rivals", "the-cruel-prince", "a-court-of-thorns-and-roses", "shadow-and-bone", "iron-flame", "the-jasmine-throne"],
    booksLikeGuides: ["from-blood-and-ash", "divine-rivals", "a-court-of-thorns-and-roses", "the-cruel-prince"],
    editorialFaqs: [
      { q: "What makes a slow burn different from just a delayed romance?", a: "A slow burn is about sustained tension — not just postponing the resolution but making every interaction charged with meaning. Readers track micro-signals: a held gaze, an unclenched fist, a deliberate choice not to touch. The delay is the experience, not an obstacle to it." },
      { q: "Which slow burn fantasy series takes the longest to deliver?", a: "From Blood and Ash by Jennifer L. Armentrout is notorious for stringing the tension across multiple books. A Court of Thorns and Roses resolves its first arc but introduces a second slow burn in the sequel that many readers consider the best part of the series. Divine Rivals delivers a complete arc in a single volume — shorter commitment, same ache." },
      { q: "Are there slow burn fantasy books that don't have explicit content?", a: "Yes. The heat level and the slow burn intensity are independent variables. The Cruel Prince (closed door) and Divine Rivals (mostly closed door) both deliver extended romantic tension without explicit scenes. Shadow and Bone is one of the cleanest slow burns in fantasy — the tension spans three books with minimal heat." },
    ],
  },

  // ── PLOT (21) ─────────────────────────────────────────────────────────────
  {
    slug: "ancient-evil-awakens", name: "Ancient Evil Awakens", category: "plot",
    description: "A long-dormant evil returns.",
    intro: "Ancient evil works in fantasy because the horror is doubled: there's the threat itself, and then there's the revelation of how thoroughly the world has forgotten how to face it. Every defense has degraded. Every text that described the enemy has been reinterpreted, discredited, or lost. The people who sealed the thing away are dead, and they apparently didn't think to leave clear instructions. The Eye of the World opens with the Dark One's seals crumbling and a world that has had so many generations of peace that the memory of the last war has drifted into mythology — the defenses weaker, the knowledge thinner, the institutions less capable than they were. What makes this trope devastating when it works is the architectural implication: the world was specifically designed for a different level of threat, and now that threat is back. Readers who love ancient evil stories are drawn to the specific tension of people facing something that was only survivable when they had resources they no longer have.",
    bestExamples: ["the-eye-of-the-world", "the-fellowship-of-the-ring", "the-priory-of-the-orange-tree", "the-way-of-kings", "the-final-empire", "the-fifth-season", "jonathan-strange-mr-norrell"],
    booksLikeGuides: ["the-fellowship-of-the-ring", "the-eye-of-the-world", "the-way-of-kings", "the-priory-of-the-orange-tree"],
    editorialFaqs: [
      { q: "Why does ancient evil work so well as a fantasy plot device?", a: "It weaponises the world's own history against its inhabitants. The horror isn't just the threat itself — it's that every institution, every defence, every piece of inherited knowledge has degraded or been lost in the intervening centuries. In The Eye of the World, the Dark One's seals are crumbling and the world no longer has the Aes Sedai strength to reforge them. In The Way of Kings, the Desolations have passed out of living memory and the knights who once fought the Voidbringers are considered traitors by the culture that replaced them. The evil returning is often less terrifying than the revelation of how unprepared the world is to face it." },
      { q: "What is the best ancient evil awakens book for readers new to epic fantasy?", a: "The Fellowship of the Ring is the archetype — Sauron's return is gradual, the world's forgetting of the last age is structurally important, and Tolkien built the template every subsequent book in the trope is in dialogue with. For readers who want something faster-paced, The Eye of the World is longer but has stronger momentum and a more contemporary prose style. The Priory of the Orange Tree is an excellent standalone option if you want a single complete story rather than the start of a multi-book series." },
      { q: "Does ancient evil always mean a dark lord? Are there subtler versions of the trope?", a: "The dark lord version is the most common, but the most interesting books complicate it. In The Fifth Season, the ancient evil is geological and systemic — the planet itself is the threat, shaped by centuries of human abuse and retaliation. In Jonathan Strange & Mr Norrell, the returning force is more morally ambiguous: the Raven King and the fairy world are not simply evil, but their re-entry into the human world is dangerous in ways no one can predict or control. In Mistborn, what initially appears to be a sealed ancient evil turns out to be something far stranger than expected. If you want the subverted version, these three are the best starting points." },
    ],
  },
  {
    slug: "coming-of-age", name: "Coming of Age", category: "plot",
    description: "A young protagonist matures through trials, mistakes, and growth.",
    intro: "Coming of age in fantasy is different from every other genre's version because the protagonist's growth is consequential in an immediate, structural way. If the teenager in a realistic novel makes a bad decision, someone's feelings get hurt and they learn a lesson. If the teenager in a fantasy novel makes a bad decision, cities burn. Patrick Rothfuss's Kvothe is the clearest illustration: every mistake he makes at the University carries real cost, every skill he develops has an application that goes beyond proving himself, and the gap between who he is at the start and who he is by the end of The Name of the Wind is large and hard-won. Coming of age in fantasy also tends to be compressed — the character has to grow up faster than any realistic timeline would demand because the world is not willing to wait for them to be ready. Readers who seek out coming-of-age fantasy want the intensity of growth under pressure: the experience of becoming someone in conditions specifically designed to break you.",
    bestExamples: ["the-name-of-the-wind", "the-poppy-war", "nevernight", "shadow-and-bone", "a-deadly-education", "the-final-empire", "six-of-crows"],
    booksLikeGuides: ["the-name-of-the-wind", "the-poppy-war", "nevernight", "a-deadly-education"],
    editorialFaqs: [
      { q: "How does coming-of-age work differently in fantasy than in other genres?", a: "In realistic fiction, coming-of-age is metaphorical — the protagonist's inner growth is the story. In fantasy, the growth is literal and consequential. If the protagonist doesn't master the magic, understand the world, or make the right alliances, people die. The failure isn't just embarrassing; it can be catastrophic. That raises the stakes of every mistake." },
      { q: "Which coming-of-age fantasy is best for adult readers?", a: "The Name of the Wind by Patrick Rothfuss is the most celebrated adult coming-of-age in recent fantasy — Kvothe's training at the University is compulsively readable despite its length. The Poppy War by R.F. Kuang starts as school fantasy and becomes something much darker: the coming-of-age is brutal and the protagonist pays for it across the full trilogy." },
    ],
  },
  {
    slug: "end-of-the-world", name: "End of the World Stakes", category: "plot",
    description: "Apocalyptic threat looms.",
    intro: "End-of-the-world stakes only work in fantasy when the reader has already learned to love the world that's threatened. That requires investment built across hundreds of pages — the political geography, the cultural texture, the specific people living in it — and only then does the apocalyptic threat carry real weight. The Fifth Season delivers this inversely: it opens with the world ending, then builds backward to explain how we got there, so the catastrophe is the frame and the love for the world emerges through the horror. Mistborn: The Final Empire spends an entire novel establishing a world already half-destroyed before the stakes of saving it become meaningful. The end-of-world narrative's real question is never whether the world survives — it's what the characters are willing to do, and give up, in the attempt. Readers drawn to apocalyptic fantasy want the moral clarity that only emerges when the stakes are so large that ordinary excuses dissolve.",
    bestExamples: ["the-fifth-season", "the-final-empire", "the-way-of-kings", "the-eye-of-the-world", "the-hero-of-ages", "the-poppy-war", "red-rising"],
    booksLikeGuides: ["the-fifth-season", "the-final-empire", "the-way-of-kings", "red-rising"],
    editorialFaqs: [
      { q: "What separates genuine end-of-world stakes from inflated 'world-ending' marketing?", a: "The difference is whether the world's destruction feels structurally earned. In Mistborn: The Final Empire, the apocalypse is baked into the setting — the ash, the mists, the dead plants are all evidence of a world already half-destroyed. In The Fifth Season, the world ends in the first paragraph and the reader is told it has ended before, and will end again. These aren't threats tacked on for drama; the apocalypse is the architecture. The guides that fail the test are books where the 'world-ending villain' is only introduced in act three — the stakes feel bolted-on rather than woven in." },
      { q: "Which end-of-world fantasy best balances personal story with global catastrophe?", a: "The Fifth Season is the benchmark — the world is ending, but the story is ultimately about a mother looking for her daughter. The global and the intimate are the same story. The Way of Kings does something similar: the Desolation is returning and civilisation is at stake, but Kaladin's arc is about surviving a bridge crew and finding a reason to keep living. If you want the personal thread to stay visible inside the apocalyptic scale, these two handle it better than almost anything else in the genre." },
      { q: "Do end-of-world fantasies usually end with the world saved?", a: "Not always, and the most interesting ones resist clean salvation. The Hero of Ages ends the world to save it — the resolution is a sacrifice that changes the fundamental nature of the planet. The Fifth Season trilogy does not restore the world to a pre-catastrophe state; it offers a different kind of future. Red Rising ends its first book with a victory that is immediately complicated by the second and third books' revelations about what that victory cost. If you need a clearly hopeful ending, Mistborn's final book delivers it. If you want something more morally complex, The Fifth Season or The Poppy War are the better choices." },
    ],
  },
  {
    slug: "heist", name: "Heist", category: "plot",
    description: "A daring robbery or impossible infiltration.",
    intro: "A heist story is fundamentally a story about a plan meeting reality, and the gap between those two things is where all the drama lives. Fantasy gives heists a dimension that mundane crime fiction can't: magical defenses that need to be researched and countered, objects that are themselves dangerous, institutions built specifically to prevent exactly what the crew is attempting. Six of Crows is the genre standard because Leigh Bardugo understands that a heist story needs two things in equal measure: competence — watching smart people be brilliant — and complications — watching those same smart people improvise under conditions their brilliance didn't anticipate. The Lies of Locke Lamora uses the same bones with a con artist crew instead of a thief crew, and achieves the same satisfying effect. What readers who love fantasy heists are after is the specific pleasure of watching a crew dismantle a problem designed to be undismantlable — and then watching what happens when the plan falls apart.",
  },
  {
    slug: "hero-becomes-villain", name: "Hero Becomes Villain", category: "plot",
    description: "Protagonist descends into darkness.",
    intro: "The hero-becomes-villain arc is the genre's version of classical tragedy, which means it only works if the fall is comprehensible every step of the way. A character who turns villain because the plot demanded it is a betrayal; a character who turns villain because readers watched every single decision that made it inevitable is devastating. The Poppy War's Rin doesn't become a war criminal overnight — R.F. Kuang builds the descent across three books, keeping Rin's internal logic coherent even as her methods become atrocities, and the reader is implicated in understanding her because they spent so long inside her perspective when it was still sympathetic. Fantasy's high-stakes settings make the turn possible without feeling contrived: the situations that push characters toward monstrous choices are genuinely monstrous to begin with. Readers who seek out this trope are willing to hold both versions of the character simultaneously — who they were and who they became — because the arc is about the distance between those two points.",
  },
  {
    slug: "hidden-society", name: "Hidden Society", category: "plot",
    description: "A secret magical world exists alongside ours.",
    intro: "The hidden society premise generates tension from the gap between what the protagonist thought was true about the world and what actually is. The moment of revelation isn't just information — it restructures everything that came before it, turning ordinary memories into evidence they didn't know they had. Fantasy within a modern setting uses this to give the hidden world a quality of presence that feels like it was always there, waiting to be seen. Jonathan Strange & Mr Norrell achieves something similar with the history of English magic: a world that has forgotten its own enchanted past, and the revelation of how much was lost in the forgetting. The best hidden society stories don't just give the protagonist access to a secret — they make clear that the secret has a view of the protagonist too, and that access is not the same as belonging. What readers want from hidden society fantasy is the sensation of seeing the world's underlying structure revealed — the grid beneath the surface.",
  },
  {
    slug: "magical-plague", name: "Magical Plague", category: "plot",
    description: "A supernatural disease spreads.",
    intro: "A magical plague is different from a realistic disease in one critical way: it means something. The pattern of how it spreads, who it spares, what it changes in the infected — all of it points toward an origin and a purpose that the protagonist has to uncover. Fantasy uses plague as a vehicle for asking what communities do when the survival instinct conflicts with the social contract, and the magical dimension makes those questions harder to ignore because the plague is often choosing. N.K. Jemisin's orogeny in The Fifth Season functions partly like a plague narrative — a heritable condition that the rest of society treats as disease and containment problem — and the story is partly about what it does to a community to build its entire structure around managing people it fears. Readers drawn to this trope want the focused moral pressure it creates: the situation where every comfortable assumption about care and community gets tested in the worst possible conditions.",
  },
  {
    slug: "political-intrigue", name: "Political Intrigue", category: "plot",
    description: "Schemes, court politics, and power plays.",
    intro: "Political intrigue works in fantasy because the genre can build institutions with real weight — courts, guilds, and factions whose interests are genuinely in conflict and whose decisions affect thousands of lives the reader has learned to care about. In realistic political fiction, the reader watches games played with institutions they already understand; in fantasy, the author built those institutions for this specific story, which means every rule can be a weapon. Red Rising uses this with absolute precision: Pierce Brown's political layers sit inside a society stratified by color, every alliance Darrow makes is also a liability, and every power move has a counter-move already in motion. The Lies of Locke Lamora gets at the same pleasure from a different angle — a city built on competing criminal guilds and the pleasure of watching someone play everyone simultaneously. Readers who love political intrigue are after the satisfaction of watching a scheme in motion: the click of pieces placing themselves exactly where someone needed them to be.",
    bestExamples: ["the-lies-of-locke-lamora", "the-way-of-kings", "red-rising", "the-cruel-prince", "a-memory-called-empire", "the-blade-itself", "gardens-of-the-moon"],
    booksLikeGuides: ["the-lies-of-locke-lamora", "the-way-of-kings", "red-rising", "the-cruel-prince"],
    editorialFaqs: [
      { q: "What makes political intrigue in fantasy different from regular thriller plotting?", a: "Fantasy politics operate on different rules: magic systems create new power imbalances, non-human political actors have alien motivations, and the consequences of a wrong move can extend for centuries. The best political fantasy isn't just complex plotting — it's a lens for examining how power actually works, using invented societies to defamiliarize real dynamics." },
      { q: "Which political intrigue fantasy books are best for readers new to the subgenre?", a: "The Lies of Locke Lamora is the clearest entry point — it's a heist novel at its core, so the schemes have an immediate momentum that pure court intrigue can lack. The Cruel Prince by Holly Black delivers Fae court politics in a much shorter, more propulsive package. For something more epic in scale, Red Rising uses political stratification as the engine for a complete trilogy." },
    ],
  },
  {
    slug: "portal-fantasy", name: "Portal Fantasy", category: "plot",
    description: "A character is transported to another world through a magical portal or doorway.",
    intro: "Portal fantasy's central move is to strip the protagonist of context and competence simultaneously. They arrive with all their personality and none of their relevant knowledge, which creates a very specific dramatic tension: the reader learns the world alongside the character, but the character has to perform in it before they understand it. Fantasy has taken this premise from its classic fairy-tale form into genuinely dark territory — the portals in modern fantasy often don't offer a way back, the destination is hostile rather than wondrous, and the native population has opinions about visitors. Lev Grossman's The Magicians does this deliberately, sending a protagonist who grew up loving Narnia into a version of that world that has no interest in his nostalgia or his assumptions about what he's owed. The portal is both a gift and a severing: everything the character knew is now useless, and whether that's liberation or catastrophe depends entirely on who they turn out to be. Readers who seek out portal fantasy are drawn to the fantasy of starting over in a world that doesn't know what you were before.",
  },
  {
    slug: "power-at-a-cost", name: "Power at a Cost", category: "plot",
    description: "Magic requires sacrifice.",
    intro: "Power at a cost works in fantasy because it makes magic moral rather than just technical. If using power is free, it's a resource question; if using power costs something real, every use is a character moment. The best cost-based systems ask what the character is willing to give up and let that answer define them. Brent Weeks's Lightbringer series goes deep into this: the magic physically destroys the caster over time, which means becoming powerful is also a death sentence, and the most powerful people in the story are choosing how they spend the years they have left. What readers who love cost magic are looking for is the moment the character pays the price — the scene where the power is used and the cost is real and there's no taking it back.",
  },
  {
    slug: "prophecy", name: "Prophecy", category: "plot",
    description: "Events driven by foretold destiny.",
    intro: "Prophecy in fantasy is as much about epistemology as it is about fate — how do you know a prophecy is genuine, and what do you do with that knowledge if you can't be certain? The most interesting prophecy narratives make the prophecy itself a moving target: it was always true, but what it meant only becomes clear in hindsight, and by then the characters have spent the entire story interpreting it wrong. The Wheel of Time's Prophecies of the Dragon are cited constantly and understood incorrectly by almost everyone who quotes them, which is part of the point — prophecy in that series functions as a kind of cultural fog that makes people see what they expect rather than what's there. Patrick Rothfuss treats prophecy differently in The Name of the Wind: Kvothe is narrating his own legend in real time, which means he's constructing the prophecy about himself as he speaks. What readers drawn to prophecy narratives want is the experience of dramatic irony at maximum resolution — watching characters move through the shape of a fate they can't quite see.",
  },
  {
    slug: "pyrrhic-victory", name: "Pyrrhic Victory", category: "plot",
    description: "Victory comes at terrible cost.",
    intro: "A pyrrhic victory is the genre's refusal to let the reader have what they came for without acknowledging what it cost. The protagonist wins — by the narrow technical definition — and the reader is left sitting with what winning required and what it destroyed. Fantasy's world-building investment makes pyrrhic victories hit harder than in any other genre: the reader has spent hundreds of pages inside the thing that gets sacrificed, and its loss is specific and real. The Hero of Ages ends the Mistborn trilogy with a resolution that technically works but requires something so foundational to be destroyed that the victory reshapes the entire cosmology Sanderson built — he earns it because he set up the cost honestly from the beginning. What readers who seek out this trope are really after is emotional honesty — the acknowledgment that the things we want most sometimes survive only by becoming unrecognizable.",
  },
  {
    slug: "quest", name: "Quest", category: "plot",
    description: "A journey to achieve a specific goal.",
    intro: "The quest is the structural core that every other fantasy plot is either built on or in reaction to. It works because the forward momentum of a goal gives even the most digressive world-building a direction, and the accumulation of cost along the way transforms a protagonist from a person with a mission into someone permanently changed by having undertaken it. Tolkien established the archetype: the Fellowship's journey is less about the destination than about what the road takes from each person who walks it, and by the time they arrive, none of them are who they were. Brandon Sanderson's Mistborn uses the quest structure to deliver a heist and a revolution simultaneously, with the destination constantly shifting as the characters learn what they're actually trying to accomplish. The quest trope is also fantasy's most honest admission of what the genre is really offering: not the destination, but the experience of moving through a world worth moving through. Readers who love quest fantasy are looking for the feeling of being in motion toward something that genuinely matters, through a world large enough to reward the attention.",
    bestExamples: ["the-way-of-kings", "the-final-empire", "the-eye-of-the-world", "red-rising", "gardens-of-the-moon", "the-name-of-the-wind", "the-lies-of-locke-lamora"],
    booksLikeGuides: ["the-way-of-kings", "the-final-empire", "red-rising", "the-eye-of-the-world"],
    editorialFaqs: [
      { q: "Do all quest fantasy books follow the same structure?", a: "No — the quest is a container that holds almost anything. Some are linear pilgrimages (Lord of the Rings). Others are multi-layered investigations where the protagonist doesn't know what they're actually seeking until they find it (Name of the Wind). Some quests are military campaigns with a tactical objective; others are personal journeys with no defined destination. The structure is the goal, not the path." },
      { q: "Which quest fantasy is best for readers who want the whole arc in one book?", a: "Red Rising by Pierce Brown is one of the most self-contained quest narratives in recent fantasy — the objective is clear from page one and the story delivers a complete arc in a single volume, even if the trilogy continues it. Kings of the Wyld by Nicholas Eames is another standout single-volume quest: retired mercenaries, one last job, completely satisfying on its own." },
    ],
  },
  {
    slug: "rebellion", name: "Rebellion", category: "plot",
    description: "A fight against oppressive rule.",
    intro: "Rebellion narratives work in fantasy because the genre can build an oppressive system with enough detail to make the reader feel its weight before the first spark of resistance appears. The rebellion isn't an abstract political argument — it's a specific group of people who have specific grievances against a specific structure that has caused specific harm, and the story makes that harm visible before it makes the rebellion heroic. Mistborn: The Final Empire is the genre's most efficient version: Sanderson spends the first act establishing the ash-world and the skaa's degradation so thoroughly that the revolution feels both necessary and terrifying when it begins. Modern fantasy also tends to complicate the aftermath — what the rebellion produces is rarely the clean alternative that the revolutionaries imagined, which is its own kind of horror. Readers drawn to rebellion stories want the moral clarity of righteous resistance alongside the honest reckoning with what resistance actually costs.",
  },
  {
    slug: "revenge-story", name: "Revenge Story", category: "plot",
    description: "A protagonist seeks vengeance.",
    intro: "Revenge stories work because the impulse they describe is one that almost everyone recognizes and most people are trained to suppress. Fantasy escalates both the wrong done and the scale of the reckoning: Best Served Cold by Joe Abercrombie puts Monza Murcatto through a betrayal that kills her brother and nearly kills her, then follows her across an entire campaign of methodical, costly retribution that never lets the reader forget what pursuing it is doing to her. What makes fantasy revenge particularly interesting is that the world can be built specifically to accommodate the consequence — the reckoning can be continent-spanning, the collateral damage can be civilizational, and the ending doesn't have to offer peace. The target is always right in the abstract and complicated in the specific, which is what keeps these stories honest. Readers who love revenge narratives are drawn to the fantasy of an account that finally gets settled — the satisfaction of consequence for people and systems that seemed beyond it.",
  },
  {
    slug: "secret-identity", name: "Secret Identity", category: "plot",
    description: "A character hides who they truly are — by choice or circumstance.",
    intro: "Secret identity plots are built on the gap between who a character is and who they're allowed to be, and the drama lives in watching them manage that gap across hundreds of pages where the wrong person learning the truth would be catastrophic. Fantasy makes secrets more layered than they can be in realistic fiction: the hidden thing isn't just a name or a background but a bloodline with political implications, a power that would reshape every relationship, a history that entire governments are built on suppressing. The Cruel Prince gives Jude a power imbalance she actively works to close through the concealment of what she knows and what she's capable of — the secret becomes the tool. What's interesting about fantasy secret identities is that the revelation usually doesn't resolve the problem; it creates a different and harder one. Readers who love this trope are drawn to the sustained tension of performance — watching a character be two things at once, and waiting to see which one the world will eventually force to the surface.",
  },
  {
    slug: "succession-crisis", name: "Succession Crisis", category: "plot",
    description: "Conflict over who inherits power.",
    intro: "A succession crisis in fantasy is a question of legitimacy made violent: who gets to say they are the right heir, who enforces that claim, and what happens to the people caught between competing answers. Fantasy worlds can build bloodline magic, divine mandate, and ancient law specifically designed to complicate the answer, which means the crisis can be genuinely unresolvable in ways that real-world succession disputes rarely are. Robin Hobb's Farseer trilogy puts the succession problem at its center, with Fitz caught between the legitimate but unfit prince and the charismatic illegitimate one, and makes clear that there may be no good answer. The Stormlight Archive keeps the question of legitimate leadership constantly open — the highprinces all have claims, all have armies, and who the Alethi actually follow is never fully settled. What readers who love succession crisis stories are after is the specific pressure of a situation where every option is wrong in a different way.",
  },
  {
    slug: "survival-journey", name: "Survival Journey", category: "plot",
    description: "Characters struggle to survive harsh conditions.",
    intro: "Survival stories in fantasy share DNA with the best survival fiction in any genre — the stripping away of comfort and resource until the only question is what a person is willing to do to see one more day — and then add a specific layer that other genres can't: the hostile environment might also be actively trying to kill them. A frozen magical wasteland isn't just cold; it has rules and history and things living in it that understand those rules better than the protagonist does. The Fifth Season makes survival personal and geological simultaneously, with Essun's journey through a world in literal collapse while carrying a specific private grief that makes the survival worth caring about. Robin Hobb's Farseer books put Fitz through survival scenarios that are as much emotional as physical — the question is not just whether he lives but whether anything worth saving survives with him. Readers who love survival fantasy want the particular focus that only extreme conditions produce: everything stripped back to what actually matters.",
  },
  {
    slug: "tournament-arc", name: "Tournament Arc", category: "plot",
    description: "Competition determining strength or fate.",
    intro: "Tournament arcs work because competition is fantasy's most efficient engine for simultaneous character revelation and world-building. Every round tells you something about the magic system, the social structure, and who the story considers dangerous — and the brackets create a pacing engine that drives naturally toward confrontation. A Deadly Education uses the Scholomance's competitive structure to reveal exactly who each student is and what they're willing to do under pressure, without ever making the competition itself the point. Fourth Wing builds its entire first act around a military academy where the ranking system is explicitly designed to eliminate the weak, which makes the combat training feel genuinely consequential rather than performative. What readers drawn to tournament arcs are actually after is the satisfaction of a structure that forces capability into the open — no hiding, no hedging, just what you actually are under pressure.",
  },
  {
    slug: "trial-by-combat", name: "Trial by Combat", category: "plot",
    description: "Justice determined through combat.",
    intro: "Trial by combat is political fantasy distilled to its most honest moment: power decides. The entire elaborate structure of courts and laws and claims ultimately resolves into one question — who wins the fight — which is the system admitting what it's actually built on. Fantasy uses this to interrogate whether that admission is tragedy or clarity; some of the genre's best trial by combat scenes work precisely because they make the reader hope for an outcome that the system cannot deliver. George R.R. Martin's trial by combat sequences in A Song of Ice and Fire are definitional here: the outcome is never metaphysically just, only physically decisive, and the gap between those two things is where the horror lives. The trope asks whether a system that calls combat 'justice' is a system at all. Readers who love trial by combat are drawn to the exposure of that gap — the moment the pretense that power and right are related breaks entirely open.",
  },
  {
    slug: "war-between-kingdoms", name: "War Between Kingdoms", category: "plot",
    description: "Large-scale war between nations.",
    intro: "War in fantasy is never just about the battles — the best kingdom-versus-kingdom narratives are about the machinery of conflict: the political decisions that made the war inevitable, the logistics that determine who eats and who starves, and the individual people crushed between forces too large to resist. The genre's invented worlds mean war can be fought over terrain and for reasons that have no direct real-world analogue, which lets authors examine real dynamics in estranged form. The Malazan Book of the Fallen is the most comprehensive treatment in fantasy — Steven Erikson depicts war at an enormous scale while keeping the human cost specific and unflinching. The Poppy War starts as coming-of-age and becomes a war novel with no romantic illusions about combat or victory, tracking exactly what happens to people who started out believing they were fighting for something righteous. What readers who love kingdom-war fantasy want is the full weight of it — not just the spectacle of battle but the everything-else that surrounds it.",
  },

  // ── WORLD & MAGIC (18) ───────────────────────────────────────────────────
  {
    slug: "blood-magic", name: "Blood Magic", category: "world-magic",
    description: "Magic powered by blood sacrifice.",
    intro: "Blood magic works in fantasy because it refuses to let power be clean. Every other magic system — elemental, divine, arcane — can theoretically exist without anyone being hurt. Blood magic cannot. The question of whose blood is used, and whether they consented, is built into the system itself, which means the politics of power are inseparable from the mechanics of it. The Poppy War uses something adjacent to this: Rin's shaman power is drawn from pain and self-destruction, and the escalation of the cost mirrors the escalation of her moral collapse step for step. The most uncomfortable blood magic tends to be the kind where the practitioner is the source — the magic literally carved out of the caster. Readers drawn to blood magic are interested in the question that ordinary magic doesn't ask: what is power made of, and who actually pays for it?",
  },
  {
    slug: "curse-breaking", name: "Curse Breaking", category: "world-magic",
    description: "A curse must be understood and broken — often at great cost.",
    intro: "Curse-breaking is a mystery genre inside fantasy: there is a specific wrong that needs to be understood before it can be undone, and the understanding requires reconstructing something that happened long before the protagonist arrived. The curse has a history — someone was wronged, something was bargained, a line was crossed — and the story is about excavating that history and deciding what to do with it. Spinning Silver builds this into its structure: Miryem doesn't just need to break the Staryk's demands, she needs to understand what made the winter spirits the way they are, and that understanding changes what the answer can be. The breaking in curse-breaking stories almost never looks like what the characters expected — the real curse tends to be different from the apparent one. Readers who love this trope are drawn to its promise: that if you understand something fully enough, you can sometimes undo the damage it caused.",
  },
  {
    slug: "desert-kingdom", name: "Desert Kingdom", category: "world-magic",
    description: "Fantasy set in arid lands.",
    intro: "Desert kingdoms work in fantasy because scarcity is the genre's most honest power structure. When water is the limiting resource, every political decision is also a survival decision, and the hierarchy that controls distribution controls everything. World-builders who start with desert settings are forced to construct societies where the relationship between environment and politics is explicit rather than assumed. Tasha Suri's work — The Jasmine Throne, Realm of Ash — carries this same logic through South Asian-inspired settings where geography is political destiny and survival conditions form the foundation for every social arrangement. The best desert fantasy makes the landscape a character with opinions: it takes from you and it gives according to its own logic, not yours. Readers who seek out desert kingdom fantasy often want the version that doesn't default to English forests and English winters — they want a world with different fundamental assumptions about what survival requires.",
  },
  {
    slug: "divine-magic", name: "Divine Magic", category: "world-magic",
    description: "Power granted by gods.",
    intro: "Divine magic turns every act of power into a negotiation, because the source has interests that don't necessarily align with the practitioner's. Elemental magic is a resource; divine magic is a relationship, and relationships have obligations. What makes this trope compelling is the implication it creates: if the magic comes from a god, then using the magic is doing the god's work, which means the practitioner has to decide whether they're a tool or a partner. The Stormlight Archive explores this with Radiants and their spren — the Nahel bond is a two-way relationship with contractual expectations, and the magic fails if the Radiant fails their oaths, which means every powerful act is also an act of moral accountability. The divine-magic protagonist who loses their power is not just weakened but judged, which is a very different kind of consequence. Readers drawn to divine magic are interested in power with strings — capability that comes with genuine responsibility rather than just risk.",
  },
  {
    slug: "dying-empire", name: "Dying Empire", category: "world-magic",
    description: "An empire in decline.",
    intro: "A dying empire is one of fantasy's richest settings precisely because decline creates complexity that stability can't. The institutions are still present but no longer functioning as designed; the people who benefited from the system are fighting to preserve it while the people it ground down are fighting to accelerate its end; and the protagonist is usually caught somewhere in between. A Memory Called Empire is the clearest recent example — an ambassador from a tiny space station navigating a galactic empire in advanced decay, loving it and fearing it simultaneously, and eventually confronting what it costs to be absorbed by something so much larger than yourself. The dying empire also exerts the specific melancholy of late beauty: the things the empire built at its height are still magnificent, and watching them crumble is grief for something that was genuinely good alongside its horror. Readers drawn to dying empire fantasy are often drawn to this specific tension — the love and the reckoning, held at the same time.",
  },
  {
    slug: "elemental-magic", name: "Elemental Magic", category: "world-magic",
    description: "Magic tied to natural elements.",
    intro: "Elemental magic is fantasy's most legible system, which is both its strength and its limitation: readers understand fire before they've been told the rules, which means authors can spend less time explaining and more time building the world around the system. The best elemental magic narratives use the elements not just as powers but as philosophical frameworks — entire cultures shaped by their relationship to the element they can touch, with values and aesthetics and social structures downstream of that fundamental connection. N.K. Jemisin's Broken Earth series uses geokinesis as a system so culturally embedded that the people who have it are treated as infrastructure rather than individuals, and the horror of that treatment is inseparable from the magic itself. The element a character uses in elemental magic is always also a statement about who they are and where they come from. Readers drawn to elemental magic want the world-building that comes with it — the civilizations shaped by their element, and what happens when those civilizations collide.",
  },
  {
    slug: "fae-court-drama", name: "Fae Court Drama", category: "world-magic",
    description: "Story set in or around Fae courts with intrigue, deals, and glamour.",
    intro: "Fae courts work because the fae are the fantasy genre's most effective vehicle for portraying power that operates entirely outside human moral categories. The courts don't lie, but they use truth as a weapon; they honor their debts, but the interpretation of what constitutes a debt is theirs alone; they are beautiful and they are dangerous and neither of those things is an accident. Holly Black's The Cruel Prince established the contemporary template, building a court where Jude's human status makes her simultaneously invisible and exploitable, and the political intrigue is driven by the alien consistency of fae rules rather than the familiar backstabbing of human courts. What makes fae courts so productive for fantasy is that they force protagonists to think differently — you cannot out-moralize a fae, you can only out-maneuver one. Readers drawn to fae court drama are fascinated by power exercised through obligation and interpretation: a system where the rules are real and the manipulation is entirely legitimate.",
  },
  {
    slug: "floating-islands", name: "Floating Islands", category: "world-magic",
    description: "Sky-bound landmasses and skyships.",
    intro: "Floating island settings are one of fantasy's most efficient world-building choices because they make social hierarchy literal. Who lives at elevation is who has power; the further you fall, the further you've fallen; and the mechanics of ascent are a direct metaphor for the mechanics of status. Fantasy has used this setting to build worlds where the geography argues constantly with the characters who inhabit it, the physical conditions reinforcing or undermining the social ones at every level. The sky becomes genuinely contested space — traversable only by those with the right ships or powers or permissions — which means movement between strata is rare, regulated, and politically charged. The verticality also creates a specific kind of solitude: the high islands are isolated by altitude as much as by choice. Readers who love floating island fantasy want the specific combination of wonder and vertigo the setting creates — the view from above and the terror of how far there is to fall.",
  },
  {
    slug: "forbidden-magic", name: "Forbidden Magic", category: "world-magic",
    description: "Outlawed or dangerous magic.",
    intro: "Forbidden magic narratives are, at their core, about the political economy of power: who gets to decide which abilities are acceptable, and what happens to people whose nature puts them outside those decisions. The prohibition almost always has a history — something happened that made the magic terrifying enough to outlaw — and uncovering that history is often as important as the magic itself. A Deadly Education makes the forbidden magic question central to its premise: Novik's Scholomance is full of students learning which kinds of power are acceptable and which will get them killed by their classmates, and the protagonist's problem is that her natural abilities are specifically the ones the school considers unforgivable. Red Sister by Mark Lawrence takes a different angle — certain magical bloodlines are hunted specifically because they're powerful enough to challenge the institutions that want them controlled. Readers drawn to forbidden magic want the political charge of it: the experience of watching power that the world declared unacceptable be deployed anyway, and what it costs.",
  },
  {
    slug: "frozen-wasteland", name: "Frozen Wasteland", category: "world-magic",
    description: "Story in icy, unforgiving landscapes.",
    intro: "Frozen wasteland fantasy operates on the assumption that cold is clarifying. Strip away the warmth and the surplus and the social niceties, and what you're left with is what people actually are when they can't afford performance. The hostile landscape also carries a moral grammar that other settings don't: the cold doesn't discriminate, doesn't negotiate, and has no interest in your reasons — it is simply the condition. Robin Hobb uses bitter cold most memorably in Assassin's Quest, where Fitz's winter journey is as psychologically punishing as it is physically, and the landscape becomes an externalization of a character who has been stripped to nothing and has to decide what, if anything, to build back. The fantasy frozen wasteland is also a space for mythology — the cold has gods, old bargains, things that have adapted to temperatures no human should survive. Readers who love this setting are drawn to its honesty: the world that does not care about you, and what you learn about yourself when you walk through it anyway.",
  },
  {
    slug: "gothic-castle", name: "Gothic Castle", category: "world-magic",
    description: "Dark castle-centered narrative.",
    intro: "Gothic castles work in fantasy because the genre can make the building's malevolence literal rather than atmospheric. The secret passage isn't just spooky; it leads somewhere real. The sense that the building is watching isn't paranoia; something in the walls actually is. Uprooted by Naomi Novik is built partly on this: the Dragon's tower operates by its own logic, changes the people who live in it, and has preferences about who those people become. The castle as constraint and transformer is the trope's essential element — not a passive setting but an active force with opinions about its inhabitants. Readers drawn to gothic castle fantasy want the building to be dangerous: not just the people inside it, but the architecture itself as an expression of something that happened there long before the protagonist arrived.",
  },
  {
    slug: "magic-tournament", name: "Magic Tournament", category: "world-magic",
    description: "A competitive magical event where participants duel with their powers.",
    intro: "Magic tournaments are fantasy's most explicit form of examination: the system reveals itself under competition in ways that no amount of exposition can match. What the judges reward, what they punish, what the participants consider cheating — all of it speaks to the values of the society that built the tournament. The Goblet of Fire made this trope permanently prominent in contemporary fantasy: a competition that reveals character under pressure, forces alliances and enmities, and exists for purposes beyond what any competitor fully understands. Fourth Wing and A Deadly Education both use academic competition structures that function as tournaments — brutal sorting mechanisms where the ranking system is the world's most honest statement about what it actually values. What readers who love magic tournaments are after is the performance-under-observation quality of it — watching characters show who they actually are in conditions specifically designed to make hiding impossible.",
  },
  {
    slug: "magical-artifacts", name: "Magical Artifacts", category: "world-magic",
    description: "Powerful enchanted objects.",
    intro: "A great magical artifact has a history that matters more than its power. The object was made by someone, for a purpose, at a cost — and the story is about discovering what that purpose was and whether it aligns with what the current holder needs it for. Fantasy's rich invented histories make artifact archaeology genuinely compelling: Tolkien's One Ring isn't just a ring, it's a cosmological argument made physical, and its journey is also a story about what pure will-to-dominate does when it's poured into an object and sent out into the world. The artifact that turns out to have a perspective — one that doesn't passively wait to be used but exerts influence on those who carry it — is the trope's most powerful variation. Readers who love artifact fantasy are drawn to the sense of history made physical: the object that carries the weight of everything that happened to it before the protagonist picked it up.",
  },
  {
    slug: "necromancy", name: "Necromancy", category: "world-magic",
    description: "Raising or controlling the dead.",
    intro: "Necromancy is fantasy's most ethically loaded magic system because it makes the question of consent unavoidable. The dead did not agree to be raised; using them is either a violation or a rescue or both, depending on what you believe about death and what remains after it. Fantasy has moved the necromancer from pure villain into protagonist with full awareness of the discomfort that creates — the necromancer-hero carries the ethical problem with them into every scene. Gideon the Ninth by Tamsyn Muir treats necromancy as a science and aristocratic practice simultaneously, which means the ethical questions are submerged into a society that has normalized them, and the horror emerges as the reader understands what normalization has actually cost. The necromancer who raises the dead for grief rather than power is the trope's most devastating version: the inability to accept loss, made magical and literal. Readers drawn to necromancy fantasy are willing to sit with the discomfort it insists on — the magic that makes mortality a question rather than a fact.",
  },
  {
    slug: "pirate-fantasy", name: "Pirate Fantasy", category: "world-magic",
    description: "Seafaring adventures and sea raiders.",
    intro: "Pirate fantasy is built on the political premise that there are people who have stepped outside the arrangement that everyone else agreed to — and the sea is large enough to make that choice survivable. Fantasy gives the premise real teeth: the ocean has gods with opinions, creatures that don't appear on maps, and weather that looks like something is angry. The freedom of the pirate's existence is also the exposure of it — no port will reliably shelter you, no alliance will definitely hold, and the crew's loyalty is real only as long as their circumstances align with yours. The best pirate fantasy uses the ship as a pressure cooker for the found family trope: people locked together by circumstance and necessity, learning whether they trust each other through successive crises in the middle of nowhere. What readers who love pirate fantasy are after is the specific combination of freedom and risk — the life outside the system, with all of what that actually means.",
  },
  {
    slug: "sentient-weapon", name: "Sentient Weapon", category: "world-magic",
    description: "A weapon with its own consciousness.",
    intro: "A sentient weapon changes the fundamental power dynamic between wielder and tool. The sword knows things the warrior doesn't; the weapon can refuse; the object that was meant to serve has accumulated enough history and perspective to have views about whether this particular use is appropriate. Fantasy has built entire magic systems around this tension — the weapon as partner, as conscience, as possession waiting to transfer to someone more deserving. Sanderson's Shardblades are the genre's most systematic treatment: weapons so powerful that their history of trauma has encoded something like a scream into the object itself, audible to those sensitive enough to hear it. The sentient weapon asks what we mean when we say something is a tool — and what we owe it. Readers drawn to this trope want the relationship that weaponhood creates: the conversation between purpose and conscience that happens when the weapon has both.",
  },
  {
    slug: "underground-city", name: "Underground City", category: "world-magic",
    description: "Civilization beneath the surface.",
    intro: "Underground cities work in fantasy because the underground has always carried two contradictory meanings: refuge and burial, survival and entombment. A community that went underground did so for a reason, and that reason shapes everything about the society they built in the dark — their mythology, their relationship to light, their memory of the surface and whether it's remembered as something lost or something fled. Tolkien's Moria is the template for the subterranean ruin: a civilization that built something magnificent underground and was eventually consumed by what they dug toward. Modern fantasy tends to use underground cities as living spaces with active cultures rather than ruins, which creates a different kind of world-building challenge — making the dark feel livable, specific, and like a choice rather than a consolation. The contrast with the surface is always politically charged: who lives up there, why do we live down here, and is the world above worth returning to. Readers who love underground city fantasy are drawn to the world-building density that comes with an enclosed space — a civilization that had to be entirely self-sufficient and shows it.",
  },
  {
    slug: "viking-inspired", name: "Viking-Inspired World", category: "world-magic",
    description: "Norse-inspired fantasy setting.",
    intro: "Viking-inspired fantasy draws on a mythology designed for tragedy from the beginning: Ragnarok is not a threat in Norse cosmology but a scheduled event, which means the entire world-view is built around the knowledge of what's coming and the decision about how to live anyway. That fatalism gives fantasy built on it a specific emotional register — honor and courage matter not because they'll save you but because they're the measure of who you are when the end arrives. Neil Gaiman's Norse Mythology made this legible to modern audiences, but the tradition runs much deeper in fantasy: Joe Abercrombie's grimdark aesthetics carry Norse influence, and his worldview shares the same fundamental skepticism about heroism and clean endings. The Norse pantheon is also distinct in that the gods are not safe — Odin is secretive and manipulative, Thor is reckless, Loki is transformative and uncontrollable — which means divine intervention in Norse-flavored fantasy is almost as dangerous as the threats it addresses. Readers drawn to Viking-inspired fantasy often want the specific combination of brutal clarity and cosmic scope that Norse mythology provides: the world is ending, you know it's ending, and the question is what kind of person you'll be about it.",
  },

];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export const TROPE_BY_SLUG = Object.fromEntries(
  PUBLIC_TROPES.map((t) => [t.slug, t])
) as Record<string, PublicTrope>;

export const TROPE_BY_NAME = Object.fromEntries(
  PUBLIC_TROPES.map((t) => [t.name, t])
) as Record<string, PublicTrope>;

export const TROPES_BY_CATEGORY = PUBLIC_TROPES.reduce<Record<TropeCategory, PublicTrope[]>>(
  (acc, t) => { (acc[t.category] ??= []).push(t); return acc; },
  {} as Record<TropeCategory, PublicTrope[]>
);

// ─── Internal Tags ────────────────────────────────────────────────────────────
// 150 micro-tags (2 per public trope) for future community tagging.
// Stored in: book_tags(book_id, tag_slug, user_id, votes, created_at)
// No books table restructuring needed.

export type InternalTagType =
  | "microtrope"
  | "character-trait"
  | "relationship-micro"
  | "plot-micro"
  | "setting-micro"
  | "magic-micro";

export type InternalTag = {
  slug: string;
  name: string;
  type: InternalTagType;
  parentTrope: string; // slug of the public trope this belongs to
};

export const INTERNAL_TAGS: InternalTag[] = [

  // chosen-one
  { slug: "destined-hero",         name: "Destined Hero",          type: "plot-micro",       parentTrope: "chosen-one" },
  { slug: "prophecy-marked",       name: "Prophecy Marked",        type: "plot-micro",       parentTrope: "chosen-one" },

  // reluctant-hero
  { slug: "refuses-the-call",      name: "Refuses the Call",       type: "plot-micro",       parentTrope: "reluctant-hero" },
  { slug: "dragged-into-fate",     name: "Dragged Into Fate",      type: "plot-micro",       parentTrope: "reluctant-hero" },

  // anti-hero
  { slug: "ends-justify-means",    name: "Ends Justify the Means", type: "character-trait",  parentTrope: "anti-hero" },
  { slug: "flawed-protagonist",    name: "Flawed Protagonist",     type: "character-trait",  parentTrope: "anti-hero" },

  // villain-protagonist
  { slug: "criminal-lead",         name: "Criminal Lead",          type: "character-trait",  parentTrope: "villain-protagonist" },
  { slug: "morality-inversion",    name: "Morality Inversion",     type: "plot-micro",       parentTrope: "villain-protagonist" },

  // morally-grey-hero
  { slug: "pragmatic-hero",        name: "Pragmatic Hero",         type: "character-trait",  parentTrope: "morally-grey-hero" },
  { slug: "dirty-hands-hero",      name: "Dirty Hands Hero",       type: "character-trait",  parentTrope: "morally-grey-hero" },

  // dark-lord
  { slug: "evil-overlord",         name: "Evil Overlord",          type: "character-trait",  parentTrope: "dark-lord" },
  { slug: "shadow-army",           name: "Shadow Army",            type: "plot-micro",       parentTrope: "dark-lord" },

  // secret-royalty
  { slug: "hidden-lineage",        name: "Hidden Lineage",         type: "plot-micro",       parentTrope: "secret-royalty" },
  { slug: "royal-blood-secret",    name: "Royal Blood Secret",     type: "plot-micro",       parentTrope: "secret-royalty" },

  // lost-heir
  { slug: "heir-in-hiding",        name: "Heir in Hiding",         type: "plot-micro",       parentTrope: "lost-heir" },
  { slug: "claim-to-the-throne",   name: "Claim to the Throne",    type: "plot-micro",       parentTrope: "lost-heir" },

  // assassin-protagonist
  { slug: "guild-trained-assassin",name: "Guild-Trained Assassin", type: "character-trait",  parentTrope: "assassin-protagonist" },
  { slug: "contract-killer-lead",  name: "Contract Killer Lead",   type: "character-trait",  parentTrope: "assassin-protagonist" },

  // dragon-rider
  { slug: "dragon-bond",           name: "Dragon Bond",            type: "microtrope",       parentTrope: "dragon-rider" },
  { slug: "dragon-aerial-combat",  name: "Dragon Aerial Combat",   type: "plot-micro",       parentTrope: "dragon-rider" },

  // immortal-character
  { slug: "ageless-wanderer",      name: "Ageless Wanderer",       type: "character-trait",  parentTrope: "immortal-character" },
  { slug: "cannot-die-curse",      name: "Cannot Die Curse",       type: "magic-micro",      parentTrope: "immortal-character" },

  // cursed-character
  { slug: "curse-with-a-price",    name: "Curse With a Price",     type: "magic-micro",      parentTrope: "cursed-character" },
  { slug: "curse-affects-others",  name: "Curse Affects Others",   type: "plot-micro",       parentTrope: "cursed-character" },

  // outcast-hero
  { slug: "banished-protagonist",  name: "Banished Protagonist",   type: "plot-micro",       parentTrope: "outcast-hero" },
  { slug: "societys-reject",       name: "Society's Reject",       type: "character-trait",  parentTrope: "outcast-hero" },

  // mentor-figure (NEW)
  { slug: "wise-old-mentor",       name: "Wise Old Mentor",        type: "character-trait",  parentTrope: "mentor-figure" },
  { slug: "mentor-who-dies",       name: "Mentor Who Dies",        type: "plot-micro",       parentTrope: "mentor-figure" },

  // last-of-their-kind
  { slug: "sole-survivor",         name: "Sole Survivor",          type: "character-trait",  parentTrope: "last-of-their-kind" },
  { slug: "dying-lineage",         name: "Dying Lineage",          type: "plot-micro",       parentTrope: "last-of-their-kind" },

  // prophecy-child
  { slug: "born-of-prophecy",      name: "Born of Prophecy",       type: "plot-micro",       parentTrope: "prophecy-child" },
  { slug: "marked-from-birth",     name: "Marked From Birth",      type: "character-trait",  parentTrope: "prophecy-child" },

  // found-family
  { slug: "fellowship-party",      name: "Fellowship Party",       type: "relationship-micro",parentTrope: "found-family" },
  { slug: "team-bonding",          name: "Team Bonding",           type: "relationship-micro",parentTrope: "found-family" },

  // enemies-to-lovers
  { slug: "betrayal-to-love",      name: "Betrayal to Love",       type: "relationship-micro",parentTrope: "enemies-to-lovers" },
  { slug: "rivals-romance",        name: "Rivals Romance",         type: "relationship-micro",parentTrope: "enemies-to-lovers" },

  // slow-burn
  { slug: "longing-glances",       name: "Longing Glances",        type: "relationship-micro",parentTrope: "slow-burn" },
  { slug: "yearning-build",        name: "Yearning Build",         type: "relationship-micro",parentTrope: "slow-burn" },

  // forbidden-romance
  { slug: "duty-vs-desire",        name: "Duty vs Desire",         type: "relationship-micro",parentTrope: "forbidden-romance" },
  { slug: "taboo-relationship",    name: "Taboo Relationship",     type: "relationship-micro",parentTrope: "forbidden-romance" },

  // political-marriage
  { slug: "marriage-of-convenience",name: "Marriage of Convenience",type: "relationship-micro",parentTrope: "political-marriage" },
  { slug: "alliance-wedding",      name: "Alliance Wedding",       type: "relationship-micro",parentTrope: "political-marriage" },

  // mentor-student
  { slug: "training-montage",      name: "Training Montage",       type: "plot-micro",       parentTrope: "mentor-student" },
  { slug: "teacher-protege-bond",  name: "Teacher–Protégé Bond",   type: "relationship-micro",parentTrope: "mentor-student" },

  // rivals-to-allies
  { slug: "forced-alliance",       name: "Forced Alliance",        type: "relationship-micro",parentTrope: "rivals-to-allies" },
  { slug: "common-enemy",          name: "Common Enemy",           type: "plot-micro",       parentTrope: "rivals-to-allies" },

  // redemption-arc
  { slug: "seeking-forgiveness",   name: "Seeking Forgiveness",    type: "relationship-micro",parentTrope: "redemption-arc" },
  { slug: "atonement-quest",       name: "Atonement Quest",        type: "plot-micro",       parentTrope: "redemption-arc" },

  // betrayal
  { slug: "traitor-reveal",        name: "Traitor Reveal",         type: "plot-micro",       parentTrope: "betrayal" },
  { slug: "knife-in-the-back",     name: "Knife in the Back",      type: "relationship-micro",parentTrope: "betrayal" },

  // love-triangle
  { slug: "two-loves-one-choice",  name: "Two Loves, One Choice",  type: "relationship-micro",parentTrope: "love-triangle" },
  { slug: "romantic-rivalry",      name: "Romantic Rivalry",       type: "relationship-micro",parentTrope: "love-triangle" },

  // bodyguard-romance
  { slug: "protective-guard",      name: "Protective Guard",       type: "relationship-micro",parentTrope: "bodyguard-romance" },
  { slug: "danger-close",          name: "Danger Close",           type: "plot-micro",       parentTrope: "bodyguard-romance" },

  // fated-mates
  { slug: "soulbond",              name: "Soulbond",               type: "magic-micro",      parentTrope: "fated-mates" },
  { slug: "destiny-pairing",       name: "Destiny Pairing",        type: "relationship-micro",parentTrope: "fated-mates" },

  // forced-proximity
  { slug: "stuck-together",        name: "Stuck Together",         type: "relationship-micro",parentTrope: "forced-proximity" },
  { slug: "one-bed",               name: "One Bed",                type: "relationship-micro",parentTrope: "forced-proximity" },

  // grumpy-sunshine
  { slug: "ice-and-fire-dynamic",  name: "Ice & Fire Dynamic",     type: "relationship-micro",parentTrope: "grumpy-sunshine" },
  { slug: "cynic-meets-optimist",  name: "Cynic Meets Optimist",   type: "relationship-micro",parentTrope: "grumpy-sunshine" },

  // second-chance-romance
  { slug: "exes-reunite",          name: "Exes Reunite",           type: "relationship-micro",parentTrope: "second-chance-romance" },
  { slug: "old-wounds",            name: "Old Wounds",             type: "relationship-micro",parentTrope: "second-chance-romance" },

  // quest
  { slug: "artifact-quest",        name: "Artifact Quest",         type: "plot-micro",       parentTrope: "quest" },
  { slug: "dangerous-journey",     name: "Dangerous Journey",      type: "plot-micro",       parentTrope: "quest" },

  // prophecy
  { slug: "prophecy-interpretation",name: "Prophecy Interpretation",type: "plot-micro",      parentTrope: "prophecy" },
  { slug: "self-fulfilling-prophecy",name: "Self-Fulfilling Prophecy",type: "plot-micro",    parentTrope: "prophecy" },

  // rebellion
  { slug: "underground-resistance",name: "Underground Resistance", type: "plot-micro",       parentTrope: "rebellion" },
  { slug: "uprising-sparks",       name: "Uprising Sparks",        type: "plot-micro",       parentTrope: "rebellion" },

  // political-intrigue
  { slug: "court-conspiracy",      name: "Court Conspiracy",       type: "plot-micro",       parentTrope: "political-intrigue" },
  { slug: "court-spy",             name: "Court Spy",              type: "plot-micro",       parentTrope: "political-intrigue" },

  // war-between-kingdoms
  { slug: "battle-campaign",       name: "Battle Campaign",        type: "plot-micro",       parentTrope: "war-between-kingdoms" },
  { slug: "siege-warfare",         name: "Siege Warfare",          type: "plot-micro",       parentTrope: "war-between-kingdoms" },

  // revenge-story
  { slug: "blood-feud",            name: "Blood Feud",             type: "plot-micro",       parentTrope: "revenge-story" },
  { slug: "vengeance-mission",     name: "Vengeance Mission",      type: "plot-micro",       parentTrope: "revenge-story" },

  // ancient-evil-awakens
  { slug: "sealed-evil-released",  name: "Sealed Evil Released",   type: "plot-micro",       parentTrope: "ancient-evil-awakens" },
  { slug: "forgotten-ruins",       name: "Forgotten Ruins",        type: "setting-micro",    parentTrope: "ancient-evil-awakens" },

  // tournament-arc
  { slug: "combat-tournament",     name: "Combat Tournament",      type: "plot-micro",       parentTrope: "tournament-arc" },
  { slug: "ranking-competition",   name: "Ranking Competition",    type: "plot-micro",       parentTrope: "tournament-arc" },

  // heist
  { slug: "impossible-infiltration",name: "Impossible Infiltration",type: "plot-micro",      parentTrope: "heist" },
  { slug: "ragtag-crew",           name: "Ragtag Crew",            type: "relationship-micro",parentTrope: "heist" },

  // succession-crisis
  { slug: "claimants-to-throne",   name: "Claimants to the Throne",type: "plot-micro",      parentTrope: "succession-crisis" },
  { slug: "royal-coup",            name: "Royal Coup",             type: "plot-micro",       parentTrope: "succession-crisis" },

  // survival-journey
  { slug: "harsh-wilderness",      name: "Harsh Wilderness",       type: "setting-micro",    parentTrope: "survival-journey" },
  { slug: "scarcity-and-hardship", name: "Scarcity & Hardship",    type: "plot-micro",       parentTrope: "survival-journey" },

  // hidden-society
  { slug: "secret-mages",          name: "Secret Mages",           type: "plot-micro",       parentTrope: "hidden-society" },
  { slug: "hidden-city-within-city",name: "Hidden City Within City",type: "setting-micro",   parentTrope: "hidden-society" },

  // portal-fantasy
  { slug: "fish-out-of-water",     name: "Fish Out of Water",      type: "plot-micro",       parentTrope: "portal-fantasy" },
  { slug: "way-back-home",         name: "Way Back Home",          type: "plot-micro",       parentTrope: "portal-fantasy" },

  // trial-by-combat
  { slug: "duel-for-justice",      name: "Duel for Justice",       type: "plot-micro",       parentTrope: "trial-by-combat" },
  { slug: "champion-fights-for-you",name: "Champion Fights for You",type: "plot-micro",     parentTrope: "trial-by-combat" },

  // end-of-the-world
  { slug: "apocalypse-prophecy",   name: "Apocalypse Prophecy",    type: "plot-micro",       parentTrope: "end-of-the-world" },
  { slug: "last-stand",            name: "Last Stand",             type: "plot-micro",       parentTrope: "end-of-the-world" },

  // magical-plague
  { slug: "cursed-sickness",       name: "Cursed Sickness",        type: "magic-micro",      parentTrope: "magical-plague" },
  { slug: "quarantine-city",       name: "Quarantine City",        type: "setting-micro",    parentTrope: "magical-plague" },

  // hero-becomes-villain
  { slug: "corruption-arc",        name: "Corruption Arc",         type: "plot-micro",       parentTrope: "hero-becomes-villain" },
  { slug: "power-corrupts",        name: "Power Corrupts",         type: "plot-micro",       parentTrope: "hero-becomes-villain" },

  // pyrrhic-victory
  { slug: "victory-with-losses",   name: "Victory With Losses",    type: "plot-micro",       parentTrope: "pyrrhic-victory" },
  { slug: "hollow-triumph",        name: "Hollow Triumph",         type: "plot-micro",       parentTrope: "pyrrhic-victory" },

  // power-at-a-cost
  { slug: "sacrifice-for-power",   name: "Sacrifice for Power",    type: "magic-micro",      parentTrope: "power-at-a-cost" },
  { slug: "magic-drains-life",     name: "Magic Drains Life",      type: "magic-micro",      parentTrope: "power-at-a-cost" },

  // coming-of-age (NEW)
  { slug: "youthful-discovery",    name: "Youthful Discovery",     type: "plot-micro",       parentTrope: "coming-of-age" },
  { slug: "trials-of-maturity",    name: "Trials of Maturity",     type: "plot-micro",       parentTrope: "coming-of-age" },

  // secret-identity (NEW)
  { slug: "hidden-true-self",      name: "Hidden True Self",       type: "character-trait",  parentTrope: "secret-identity" },
  { slug: "unmasking-moment",      name: "Unmasking Moment",       type: "plot-micro",       parentTrope: "secret-identity" },

  // magic-tournament
  { slug: "spell-duel",            name: "Spell Duel",             type: "magic-micro",      parentTrope: "magic-tournament" },
  { slug: "tournament-of-power",   name: "Tournament of Power",    type: "plot-micro",       parentTrope: "magic-tournament" },

  // fae-court-drama (NEW)
  { slug: "fae-politics",          name: "Fae Politics",           type: "plot-micro",       parentTrope: "fae-court-drama" },
  { slug: "glamour-and-deception", name: "Glamour & Deception",    type: "magic-micro",      parentTrope: "fae-court-drama" },

  // dying-empire
  { slug: "crumbling-institutions",name: "Crumbling Institutions", type: "plot-micro",       parentTrope: "dying-empire" },
  { slug: "last-days-of-empire",   name: "Last Days of Empire",    type: "plot-micro",       parentTrope: "dying-empire" },

  // desert-kingdom
  { slug: "sand-seas",             name: "Sand Seas",              type: "setting-micro",    parentTrope: "desert-kingdom" },
  { slug: "oasis-cities",          name: "Oasis Cities",           type: "setting-micro",    parentTrope: "desert-kingdom" },

  // frozen-wasteland
  { slug: "arctic-expedition",     name: "Arctic Expedition",      type: "plot-micro",       parentTrope: "frozen-wasteland" },
  { slug: "endless-winter",        name: "Endless Winter",         type: "setting-micro",    parentTrope: "frozen-wasteland" },

  // pirate-fantasy
  { slug: "sea-raiders",           name: "Sea Raiders",            type: "plot-micro",       parentTrope: "pirate-fantasy" },
  { slug: "cursed-treasure",       name: "Cursed Treasure",        type: "magic-micro",      parentTrope: "pirate-fantasy" },

  // viking-inspired
  { slug: "norse-myth-vibes",      name: "Norse Myth Vibes",       type: "setting-micro",    parentTrope: "viking-inspired" },
  { slug: "raids-and-clans",       name: "Raids & Clans",          type: "plot-micro",       parentTrope: "viking-inspired" },

  // gothic-castle
  { slug: "haunted-halls",         name: "Haunted Halls",          type: "setting-micro",    parentTrope: "gothic-castle" },
  { slug: "dark-family-secrets",   name: "Dark Family Secrets",    type: "plot-micro",       parentTrope: "gothic-castle" },

  // floating-islands
  { slug: "skyships",              name: "Skyships",               type: "setting-micro",    parentTrope: "floating-islands" },
  { slug: "sky-cities",            name: "Sky Cities",             type: "setting-micro",    parentTrope: "floating-islands" },

  // underground-city
  { slug: "subterranean-civilization",name: "Subterranean Civilization",type: "setting-micro",parentTrope: "underground-city" },
  { slug: "tunnel-networks",       name: "Tunnel Networks",        type: "setting-micro",    parentTrope: "underground-city" },

  // elemental-magic
  { slug: "fire-and-ice-magic",    name: "Fire & Ice Magic",       type: "magic-micro",      parentTrope: "elemental-magic" },
  { slug: "stormcalling",          name: "Stormcalling",           type: "magic-micro",      parentTrope: "elemental-magic" },

  // blood-magic
  { slug: "ritual-sacrifice",      name: "Ritual Sacrifice",       type: "magic-micro",      parentTrope: "blood-magic" },
  { slug: "life-force-spells",     name: "Life-Force Spells",      type: "magic-micro",      parentTrope: "blood-magic" },

  // forbidden-magic
  { slug: "banned-spells",         name: "Banned Spells",          type: "magic-micro",      parentTrope: "forbidden-magic" },
  { slug: "occult-practices",      name: "Occult Practices",       type: "magic-micro",      parentTrope: "forbidden-magic" },

  // necromancy
  { slug: "raise-the-dead",        name: "Raise the Dead",         type: "magic-micro",      parentTrope: "necromancy" },
  { slug: "undead-army",           name: "Undead Army",            type: "magic-micro",      parentTrope: "necromancy" },

  // divine-magic
  { slug: "god-blessed",           name: "God-Blessed",            type: "magic-micro",      parentTrope: "divine-magic" },
  { slug: "cleric-miracles",       name: "Cleric Miracles",        type: "magic-micro",      parentTrope: "divine-magic" },

  // magical-artifacts
  { slug: "legendary-relic",       name: "Legendary Relic",        type: "magic-micro",      parentTrope: "magical-artifacts" },
  { slug: "corrupting-artifact",   name: "Corrupting Artifact",    type: "magic-micro",      parentTrope: "magical-artifacts" },

  // sentient-weapon
  { slug: "talking-sword",         name: "Talking Sword",          type: "magic-micro",      parentTrope: "sentient-weapon" },
  { slug: "weapon-with-a-will",    name: "Weapon With a Will",     type: "magic-micro",      parentTrope: "sentient-weapon" },

  // curse-breaking (NEW)
  { slug: "loophole-in-curse",     name: "Loophole in the Curse",  type: "magic-micro",      parentTrope: "curse-breaking" },
  { slug: "breaking-the-binding",  name: "Breaking the Binding",   type: "magic-micro",      parentTrope: "curse-breaking" },

];
