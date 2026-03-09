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
};

export const PUBLIC_TROPES: PublicTrope[] = [

  // ── CHARACTER (16) ────────────────────────────────────────────────────────
  {
    slug: "anti-hero", name: "Anti-Hero", category: "character",
    description: "A morally complex or flawed main character.",
    intro: "Anti-heroes pursue their goals through questionable means — lying, manipulating, and sometimes killing — while the reader roots for them anyway. Unlike traditional heroes, they force us to question what we'd do in their place. Fantasy's sprawling epics give this trope room to develop across thousands of pages of moral erosion.",
  },
  {
    slug: "assassin-protagonist", name: "Assassin Protagonist", category: "character",
    description: "The main character is a trained killer.",
    intro: "Assassin protagonists are methodical and lethal — yet surprisingly human beneath the craft. Their professional detachment makes every moment of genuine feeling hit harder, and the tactical tension of a life spent in disguise bleeds into every scene. Fantasy's grey morality is the natural home for killers with complicated consciences.",
  },
  {
    slug: "chosen-one", name: "Chosen One", category: "character",
    description: "A protagonist marked by destiny or prophecy.",
    intro: "The Chosen One is singled out by fate to face a challenge no one else can meet — a premise that works best when the story interrogates the idea of destiny itself. The most compelling versions feature protagonists who push back, fail, or turn the prophecy inside out. Fantasy has produced both the purest examples and the sharpest deconstructions of this trope.",
  },
  {
    slug: "cursed-character", name: "Cursed Character", category: "character",
    description: "A character bound by magical curse.",
    intro: "Curses in fantasy are rarely just obstacles — they're character-defining conditions that force impossible choices about loyalty, sacrifice, and survival. A cursed character must navigate every relationship and decision under the shadow of something they cannot remove. The best examples explore what it costs to live under an unbreakable constraint.",
  },
  {
    slug: "dark-lord", name: "Dark Lord", category: "character",
    description: "A powerful evil ruler threatening the world.",
    intro: "Dark Lords anchor epic fantasy's biggest stakes, giving heroes something monumental to fight and authors a canvas for exploring power, corruption, and the nature of evil. The trope has evolved far beyond its archetypes — modern takes often make the Dark Lord the most psychologically interesting character in the book. What they want, and why, is usually the real story.",
  },
  {
    slug: "dragon-rider", name: "Dragon Rider", category: "character",
    description: "A character bonded to or riding dragons.",
    intro: "Dragon rider stories live on the bond itself — the trust built across species, the communication forged under pressure, and what happens when that bond is tested. Few fantasy tropes deliver the same combination of wonder, aerial spectacle, and emotional depth. The dragon is never just a mount; it's a partner whose perspective reshapes the protagonist's.",
  },
  {
    slug: "immortal-character", name: "Immortal Character", category: "character",
    description: "A character who cannot die naturally.",
    intro: "Immortality in fantasy is rarely a gift — it's an isolation, a weight, a slowly accumulating distance from everyone the immortal has ever loved. These characters carry centuries of memory, loss, and perspective that ordinary mortals can't access. The best immortal protagonists are defined less by their age than by what they've chosen to remember and what they've tried to forget.",
  },
  {
    slug: "last-of-their-kind", name: "Last Of Their Kind", category: "character",
    description: "A character who is the sole survivor of their race, people, or lineage.",
    intro: "This trope explores grief at a civilizational scale: what it means to be a living archive, and whether survival alone constitutes a kind of duty. The last of their kind carries a world's worth of loss in every interaction. Fantasy gives it mythic weight — the extinction is total, the loneliness is absolute, and the question of what to rebuild haunts everything.",
  },
  {
    slug: "lost-heir", name: "Lost Heir", category: "character",
    description: "A hidden heir to a throne or power.",
    intro: "Lost heir stories fuse mystery with politics — uncovering the truth is only the beginning, because claiming power is a completely different challenge. The dramatic irony of an identity hiding in plain sight gives these books a slow-burn tension that rewards patient readers. Fantasy's world-building depth makes the political stakes of succession genuinely complex.",
  },
  {
    slug: "mentor-figure", name: "Mentor Figure", category: "character",
    description: "A wise guide or parental figure who shapes the protagonist — and may not survive.",
    intro: "The mentor exists at the intersection of hope and tragedy: they invest everything in someone else's story, often knowing they may be a stepping stone rather than a destination. What distinguishes great mentor characters is that they have their own arcs — their own failures and regrets — not just wisdom to dispense. Fantasy has given us some of literature's most memorable mentors, from the gently guiding to the ruthlessly demanding.",
  },
  {
    slug: "morally-grey-hero", name: "Morally Grey Hero", category: "character",
    description: "A hero operating outside clear moral lines.",
    intro: "Morally grey heroes make hard choices that conventional heroes aren't supposed to make — and force both readers and supporting characters to decide what \"good\" actually means. They're not villains, but they're not clean either; they do what works and live with the residue. Fantasy's high stakes make every grey choice feel consequential in a way that contemporary fiction rarely allows.",
  },
  {
    slug: "outcast-hero", name: "Outcast Hero", category: "character",
    description: "A protagonist rejected by society.",
    intro: "The outcast trope drives enormous narrative energy: the resentment of rejection, the need to prove worth, and the fundamental question of whether acceptance is even the right goal. Outcast heroes must decide if they want in or if they want to burn the whole system down. Fantasy worlds offer unique ways to define exclusion — by blood, by magic, by knowledge — making the outsider status feel genuinely dangerous.",
  },
  {
    slug: "prophecy-child", name: "Prophecy Child", category: "character",
    description: "A character born into or shaped by prophecy, destined for a role they didn't choose.",
    intro: "The prophecy child carries a weight from birth — a future written before they could speak, a purpose that may or may not align with who they actually are. The friction between fate and selfhood is what makes these stories compelling; the prophecy is often the obstacle as much as the destination. Fantasy has explored every possible relationship between a character and the destiny that defines them.",
  },
  {
    slug: "reluctant-hero", name: "Reluctant Hero", category: "character",
    description: "A hero who does not initially seek their role.",
    intro: "Reluctance makes heroes believable — we trust protagonists who would rather stay home, because most of us would too. The reluctant hero's arc is about the series of events that makes staying neutral impossible, each escalation stripping away another reason not to act. Fantasy has perfected this escalation, turning ordinary people into world-changers through accumulation of consequence.",
  },
  {
    slug: "secret-royalty", name: "Secret Royalty", category: "character",
    description: "A protagonist unaware of their royal lineage.",
    intro: "The secret royalty reveal changes everything: relationships, enemies, obligations — and forces the character to decide what the crown actually means to them. Living as a commoner before learning the truth gives the protagonist a perspective that matters later, when they must decide what kind of ruler to become. Fantasy uses this trope to explore the gap between inherited identity and chosen identity.",
  },
  {
    slug: "villain-protagonist", name: "Villain Protagonist", category: "character",
    description: "The main character begins as or becomes the antagonist.",
    intro: "Villain protagonists challenge every assumption about narrative sympathy: we follow characters who do terrible things and are made to understand exactly how. The best examples don't excuse the protagonist — they explain them, and the explanation is the uncomfortable part. Fantasy's morally complex worlds make this trope devastating when the author commits to it fully.",
  },

  // ── RELATIONSHIP (15) ─────────────────────────────────────────────────────
  {
    slug: "betrayal", name: "Betrayal", category: "relationship",
    description: "A trusted ally betrays the protagonist.",
    intro: "Betrayal in fantasy is most powerful when it's earned — when readers saw it coming and hoped they were wrong. The aftermath reshapes every relationship in the story; the protagonist must recalibrate who they trust and what trust even means. Fantasy escalates the consequences: a betrayal here doesn't just wound a friendship, it can topple kingdoms.",
  },
  {
    slug: "bodyguard-romance", name: "Bodyguard Romance", category: "relationship",
    description: "A protector falls for the protected.",
    intro: "The power imbalance is built in from the start — one character is responsible for the other's survival, which makes every moment of vulnerability charged with meaning. Fantasy escalates both the threats and the consequences: distraction isn't just embarrassing, it's potentially fatal. The best bodyguard romances use the professional dynamic to delay and complicate what both characters want.",
  },
  {
    slug: "enemies-to-lovers", name: "Enemies to Lovers", category: "relationship",
    description: "Rivals develop romantic feelings.",
    intro: "The slow shift from hatred to something else is one of fiction's most satisfying arcs — because readers watch two people actively resist what's happening to them. Fantasy's high-conflict settings give enemies genuine reasons to hate each other, which makes the eventual turn more credible and more earned. The genre's long page counts allow the tension to build across hundreds of pages of friction before anything breaks.",
  },
  {
    slug: "fated-mates", name: "Fated Mates", category: "relationship",
    description: "Two characters bound by destiny.",
    intro: "Fated mates stories live in the tension between fate and agency — what it means to be drawn toward someone by forces outside your control. Fantasy literalizes that pull through magic, prophecy, or supernatural bonds that the characters must decide whether to accept or fight. The best examples treat the fating as a complication, not a shortcut.",
  },
  {
    slug: "forbidden-romance", name: "Forbidden Romance", category: "relationship",
    description: "A romance forbidden by society or duty.",
    intro: "The prohibition gives forbidden romances their charge: every stolen moment is dangerous, every choice to continue is a declaration. Fantasy heightens the stakes by making the consequences literal — banishment, war, death, or something worse. The best forbidden romance stories make the thing doing the forbidding genuinely compelling, not just an obstacle.",
  },
  {
    slug: "forced-proximity", name: "Forced Proximity", category: "relationship",
    description: "Characters must stay physically close.",
    intro: "Shared danger strips away pretense, and characters learn more about each other in days than they would in years of ordinary contact. Forced proximity turns physical space into emotional pressure — there's nowhere to retreat, no way to manage the impression you're making. Fantasy excels at creating scenarios that make the closeness genuinely inescapable.",
  },
  {
    slug: "found-family", name: "Found Family", category: "relationship",
    description: "Unrelated characters form deep familial bonds.",
    intro: "Found family is fantasy's most beloved emotional core: the team that becomes something more, the strangers who learn to be home for each other through shared danger and choice. Unlike blood family, found family is earned — and that's exactly why it hits so hard when the bonds are tested. The genre's ensemble casts and long series format give these relationships room to genuinely develop.",
  },
  {
    slug: "grumpy-sunshine", name: "Grumpy x Sunshine", category: "relationship",
    description: "Opposite personalities clash and attract.",
    intro: "The friction is the point: neither character can pretend to be what they're not around the other, and the cracks that result let the light in. One is guarded and sharp; the other open and relentlessly warm; together they're unstable in the best possible way. Fantasy pairs this dynamic with plots that force the two together in ways neither can escape.",
  },
  {
    slug: "love-triangle", name: "Love Triangle", category: "relationship",
    description: "Three characters entangled romantically.",
    intro: "Love triangles work when both options represent real and incompatible futures — not just preferences, but paths that change who the protagonist becomes. Fantasy raises the stakes by tying the romantic choice to the fate of kingdoms, alliances, or magic systems. The best examples give readers genuine investment in both possibilities, making the resolution both satisfying and costly.",
  },
  {
    slug: "mentor-student", name: "Mentor and Student", category: "relationship",
    description: "A guiding teacher and protégé bond.",
    intro: "The mentor-student relationship in fantasy carries undertones of legacy, transfer of power, and inevitable loss — because the story ends when the student no longer needs the teacher. The dynamic shifts across every book: respect, frustration, surpassing, grief. Fantasy's long series format gives this progression room to feel earned rather than rushed.",
  },
  {
    slug: "political-marriage", name: "Political Marriage", category: "relationship",
    description: "Marriage arranged for power or alliance.",
    intro: "Two characters with no reason to trust each other, forced into the most intimate proximity possible — political marriage is one of fantasy's most productive setups. What grows in that cold soil, if anything, is the whole story. The genre's court politics and dynastic stakes give the arrangement genuine weight beyond the personal.",
  },
  {
    slug: "redemption-arc", name: "Redemption Arc", category: "relationship",
    description: "A character seeks redemption for past sins.",
    intro: "Redemption arcs are about proof: the character cannot simply say they've changed, they must demonstrate it in circumstances that cost them something real. Fantasy's long series format gives this time to breathe — the arc can span thousands of pages, letting the change feel earned rather than convenient. The best examples don't guarantee the character succeeds.",
  },
  {
    slug: "rivals-to-allies", name: "Rivals to Allies", category: "relationship",
    description: "Competitors unite for a common cause.",
    intro: "The rivals-to-allies arc works because the rivalry doesn't disappear — it becomes the foundation for something more durable than friendship. Two people who've pushed each other to their limits know each other better than anyone else. Fantasy's ensemble casts and world-ending threats give competitors genuine reasons to set aside their conflict without pretending it never happened.",
  },
  {
    slug: "second-chance-romance", name: "Second Chance Romance", category: "relationship",
    description: "Former lovers reunite.",
    intro: "Second chance romances carry the past as an active presence — old wounds that need to be re-examined before anything new can grow. The characters know each other too well for pretense and too painfully for comfort. Fantasy's timelines can span decades or centuries, giving the separation genuine weight and the reunion the feeling of something recovered against the odds.",
  },
  {
    slug: "slow-burn", name: "Slow Burn", category: "relationship",
    description: "Romantic or emotional tension develops gradually.",
    intro: "Slow burn readers aren't waiting for the payoff — they're addicted to the tension itself, the ache of two characters circling each other across hundreds of pages of near-misses and charged silences. Fantasy's extended page counts are built for exactly this kind of prolonged, exquisite delay. The genre's life-or-death stakes make every moment of near-connection more desperate.",
  },

  // ── PLOT (21) ─────────────────────────────────────────────────────────────
  {
    slug: "ancient-evil-awakens", name: "Ancient Evil Awakens", category: "plot",
    description: "A long-dormant evil returns.",
    intro: "Ancient evil works because the danger is compounded by ignorance — the world has forgotten how to fight it, and the protagonist must reconstruct lost knowledge while the threat grows. Fantasy's invented histories make the horror of forgetting feel genuinely catastrophic. The longer the evil has been sealed, the worse the implications of its return.",
  },
  {
    slug: "coming-of-age", name: "Coming of Age", category: "plot",
    description: "A young protagonist matures through trials, mistakes, and growth.",
    intro: "Coming-of-age in fantasy works differently than in realism because the stakes are literal: the growth that transforms a teenager into an adult might also determine whether the world survives. Mistakes here have real consequences, and the trials are genuinely dangerous rather than metaphorically so. The genre has produced some of the form's defining examples, from school stories to war narratives to quiet personal reckonings.",
  },
  {
    slug: "end-of-the-world", name: "End of the World Stakes", category: "plot",
    description: "Apocalyptic threat looms.",
    intro: "End-of-the-world stakes force characters to act at the limits of their capacity — there's no safety net, no second chance, no partial victory that leaves the world intact. Fantasy's world-building depth makes a fictional apocalypse feel genuinely devastating; readers have invested in this world, and the threat of losing it is real. These stories ask what's worth saving and what the characters are willing to become to save it.",
  },
  {
    slug: "heist", name: "Heist", category: "plot",
    description: "A daring robbery or impossible infiltration.",
    intro: "Heist stories are built on competence and cleverness — readers love watching a crew dismantle an impossible problem and love it even more when something goes wrong mid-plan. Fantasy adds magical complications that make heists feel genuinely unpredictable: wards, detection spells, and powers that can't be pickpocketed around. The genre's diverse cast options give every crew a distinctive, memorable makeup.",
  },
  {
    slug: "hero-becomes-villain", name: "Hero Becomes Villain", category: "plot",
    description: "Protagonist descends into darkness.",
    intro: "Hero-to-villain arcs are tragedy in their purest form: readers watch someone they've been rooting for make choices that hollow them out one by one. Each step feels justified from inside the protagonist's perspective, and that's exactly what makes it devastating. Fantasy's moral frameworks make the fall legible — we see exactly where it went wrong.",
  },
  {
    slug: "hidden-society", name: "Hidden Society", category: "plot",
    description: "A secret magical world exists alongside ours.",
    intro: "Hidden society stories turn the familiar world into a mystery — something vast has always been hiding in plain sight, and the protagonist's discovery of it recontextualizes everything that came before. The moment of revelation is only the beginning; learning the rules of a hidden world is a completely different education. Fantasy excels at making the hidden world feel genuinely vast rather than just a backdrop.",
  },
  {
    slug: "magical-plague", name: "Magical Plague", category: "plot",
    description: "A supernatural disease spreads.",
    intro: "Magical plagues raise questions that ordinary disease can't: what is the plague's purpose, who or what created it, and what is it changing in those it touches? Fantasy gives them agency, pattern, and meaning — the affliction is rarely random. The best magical plague stories use the disease as a lens for examining what communities do when survival requires impossible choices.",
  },
  {
    slug: "political-intrigue", name: "Political Intrigue", category: "plot",
    description: "Schemes, court politics, and power plays.",
    intro: "Political intrigue in fantasy works because the stakes are civilizational — what happens in the throne room shapes the entire world. Information is the most dangerous weapon, alliances shift faster than armies, and the sharpest mind in the room rarely holds the most power. The best examples give readers the satisfying click of watching a scheme assemble or unravel.",
  },
  {
    slug: "portal-fantasy", name: "Portal Fantasy", category: "plot",
    description: "A character is transported to another world through a magical portal or doorway.",
    intro: "Portal fantasy generates immediate tension from displacement: the protagonist arrives without resources, context, or allies — and must navigate unfamiliar rules while readers discover those rules alongside them. The power of the trope lies in the contrast between who the character was and who they must become. Fantasy has taken this premise from its classic \"fish out of water\" origins into genuinely dark and subversive territory.",
  },
  {
    slug: "power-at-a-cost", name: "Power at a Cost", category: "plot",
    description: "Magic requires sacrifice.",
    intro: "Cost-based magic systems force genuine stakes into every spell cast: the power is real, and so is what it takes. Characters must decide what they're willing to give up — health, memory, years, or something irreplaceable — which turns every use of magic into a character moment. Fantasy uses this to explore the oldest question: is the trade ever worth making?",
  },
  {
    slug: "prophecy", name: "Prophecy", category: "plot",
    description: "Events driven by foretold destiny.",
    intro: "Prophecy in fantasy is rarely straightforward — interpretations shift, characters try to subvert it, and fulfillment almost always arrives in the least expected form. The trope invites exploration of free will, fate, and the nature of knowledge itself. What makes prophecy compelling is not that it tells the future but that it shapes the choices of everyone who hears it.",
  },
  {
    slug: "pyrrhic-victory", name: "Pyrrhic Victory", category: "plot",
    description: "Victory comes at terrible cost.",
    intro: "Pyrrhic victories resist the satisfaction of a clean ending: the protagonist wins, but the price of winning changes them and the world irrevocably. Fantasy has the scale to make those losses feel monumental — battles won at the cost of everyone who made winning possible. These endings linger because they ask whether what was saved was worth what was sacrificed.",
  },
  {
    slug: "quest", name: "Quest", category: "plot",
    description: "A journey to achieve a specific goal.",
    intro: "The quest is fantasy's oldest and most elastic structure — it can carry any tone, any theme, any cast of characters across any imaginable world. What matters is not the destination but what the journey costs and changes. The genre has taken the template from Tolkien's mythic proportions down to intimate single-volume character studies and back again.",
  },
  {
    slug: "rebellion", name: "Rebellion", category: "plot",
    description: "A fight against oppressive rule.",
    intro: "Rebellion stories explore the gap between idealism and the messy reality of tearing down power — the compromises made, the people lost, and the question of whether the new order will repeat the old one's mistakes. Fantasy gives the stakes a mythic scale while still forcing characters to make decisions at the human level. The best examples don't romanticize revolt; they interrogate it.",
  },
  {
    slug: "revenge-story", name: "Revenge Story", category: "plot",
    description: "A protagonist seeks vengeance.",
    intro: "Revenge narratives are driven by one of the most universal human impulses — but the best examples complicate it, asking whether the target is right and what justice actually looks like. Fantasy escalates both the wrong done and the consequences of seeking payback across world-spanning scales. The cost of revenge in these stories is rarely just physical.",
  },
  {
    slug: "secret-identity", name: "Secret Identity", category: "plot",
    description: "A character hides who they truly are — by choice or circumstance.",
    intro: "Secret identity plots run on dramatic irony: readers often know what other characters don't, and the tension of potential revelation never fully eases. Fantasy allows for identities that go far deeper than names — hidden bloodlines, suppressed powers, forbidden histories that would reshape every relationship if known. The concealment is itself a form of character: what someone chooses to hide tells you who they are.",
  },
  {
    slug: "succession-crisis", name: "Succession Crisis", category: "plot",
    description: "Conflict over who inherits power.",
    intro: "Succession crises are political fantasy at its most elemental — the question of who rules determines everything else about how the world works. The best examples give readers multiple claimants with genuine legitimacy, making the outcome genuinely uncertain. Fantasy's invented dynasties and magical inheritance rules allow for complications that no real-world succession ever produced.",
  },
  {
    slug: "survival-journey", name: "Survival Journey", category: "plot",
    description: "Characters struggle to survive harsh conditions.",
    intro: "Survival stories strip away almost everything and ask what remains: what people are willing to do, who they protect, and what they're prepared to sacrifice to see one more day. Fantasy's hostile worlds — frozen wastes, cursed lands, dying empires — create unique survival challenges that go beyond physical endurance. The genre's willingness to let characters die makes the danger feel real.",
  },
  {
    slug: "tournament-arc", name: "Tournament Arc", category: "plot",
    description: "Competition determining strength or fate.",
    intro: "Tournament arcs deliver escalating confrontations with natural pacing — each round raises the stakes and reveals character under pressure. Fantasy's magical combat systems transform these into spectacles that conventional sports fiction can't match: powers that surprise, opponents with hidden abilities, and rules that can be bent in unexpected ways. The tournament structure also forces characters to face each other directly rather than through armies.",
  },
  {
    slug: "trial-by-combat", name: "Trial by Combat", category: "plot",
    description: "Justice determined through combat.",
    intro: "Trial by combat compresses political and moral tension into a single confrontation — one fight that carries the weight of an entire story's worth of stakes. Fantasy uses it to interrogate ideas of justice, power, and what it means for a system to be \"fair\" when the outcome depends on strength. The trope is most powerful when the right person and the strong person are very different characters.",
  },
  {
    slug: "war-between-kingdoms", name: "War Between Kingdoms", category: "plot",
    description: "Large-scale war between nations.",
    intro: "War stories in fantasy operate at both the strategic and the human scale — the campaigns and sieges alongside the individual soldiers trying to survive them. The genre's imagined worlds can stage conflicts with causes and consequences that feel both alien and achingly familiar. The best examples refuse to make war glorious, even when the battles are spectacular.",
  },

  // ── WORLD & MAGIC (18) ───────────────────────────────────────────────────
  {
    slug: "blood-magic", name: "Blood Magic", category: "world-magic",
    description: "Magic powered by blood sacrifice.",
    intro: "Blood magic is fantasy's most viscerally transgressive system — it literalizes the idea that real power always costs someone something. The question is who bears that cost and whether the wielder ever fully reckons with what they're asking for. Stories built around blood magic tend to be dark, morally urgent, and unflinching about the gap between power and its price.",
  },
  {
    slug: "curse-breaking", name: "Curse Breaking", category: "world-magic",
    description: "A curse must be understood and broken — often at great cost.",
    intro: "Curse-breaking stories are detective stories with magical stakes: the mystery of the curse's origin is as important as the mechanics of its removal. Fantasy excels at curses that turn out to be more complicated than they first appear — bound to a person's history, a place's grief, or a bargain made generations ago. The breaking often costs something that can't be recovered.",
  },
  {
    slug: "desert-kingdom", name: "Desert Kingdom", category: "world-magic",
    description: "Fantasy set in arid lands.",
    intro: "Desert kingdoms offer world-builders a canvas completely different from the European template that dominates fantasy: different political structures, different mythologies, different relationships between survival and status. Scarcity is power; water is wealth; the desert itself becomes a character. The best examples make the landscape inseparable from the story being told.",
  },
  {
    slug: "divine-magic", name: "Divine Magic", category: "world-magic",
    description: "Power granted by gods.",
    intro: "Divine magic introduces a complication that elemental systems don't: it comes from beings with their own agendas. The gods in these stories aren't passive sources — they watch, intervene, and sometimes take their gifts back. The politics of divine favor bleed into the politics of mortals in ways that make for endlessly layered fantasy.",
  },
  {
    slug: "dying-empire", name: "Dying Empire", category: "world-magic",
    description: "An empire in decline.",
    intro: "Dying empire stories are elegies for power — they ask what's worth preserving, what deserves to fall, and what comes after the collapse. Fantasy's imagined civilizations can be rendered at a scale that makes their decline genuinely catastrophic, affecting millions of lives across continents. The characters caught inside the fall must decide whether to prop it up, accelerate it, or build something new in the rubble.",
  },
  {
    slug: "elemental-magic", name: "Elemental Magic", category: "world-magic",
    description: "Magic tied to natural elements.",
    intro: "Elemental magic systems offer immediate readability: readers understand what fire does before they've been told a single rule. The best examples use the elements not just as power sources but as cultural and philosophical frameworks — entire civilizations shaped by which force their people can touch. The clash between elements becomes a clash between worldviews.",
  },
  {
    slug: "fae-court-drama", name: "Fae Court Drama", category: "world-magic",
    description: "Story set in or around Fae courts with intrigue, deals, and glamour.",
    intro: "Fae courts operate on alien logic — contracts matter more than morality, beauty conceals threat, and power is exercised through obligation rather than force. The drama emerges from protagonists trying to navigate rules they don't fully understand while avoiding becoming someone else's plot. Fantasy's fae have evolved from folklore curiosities into one of the genre's richest settings for political intrigue.",
  },
  {
    slug: "floating-islands", name: "Floating Islands", category: "world-magic",
    description: "Sky-bound landmasses and skyships.",
    intro: "Floating island worlds build vertical hierarchy into the geography itself — who lives high, who lives low, and what it takes to cross the air between them. The setting is inherently kinetic: falling is the ultimate consequence, and the sky is both freedom and danger. Fantasy's most imaginative world-building often starts with this premise and goes somewhere genuinely unexpected.",
  },
  {
    slug: "forbidden-magic", name: "Forbidden Magic", category: "world-magic",
    description: "Outlawed or dangerous magic.",
    intro: "Forbidden magic stories live in the gap between law and necessity — the magic is banned for a reason, but so is a lot of things that turn out to be indispensable. The enforcement is usually lethal and the forbidden power genuinely transformative, which makes every use a calculated risk. Fantasy gives the prohibition real weight by showing exactly what the power can do in the hands of someone desperate enough to use it.",
  },
  {
    slug: "frozen-wasteland", name: "Frozen Wasteland", category: "world-magic",
    description: "Story in icy, unforgiving landscapes.",
    intro: "Frozen wastes strip survival down to its essentials while creating a visual language of bleakness and endurance that resonates beyond the physical. Cold in fantasy is never just temperature — it carries mythological weight, moral meaning, and the particular loneliness of a landscape that is actively hostile to human life. The best examples make warmth feel like grace.",
  },
  {
    slug: "gothic-castle", name: "Gothic Castle", category: "world-magic",
    description: "Dark castle-centered narrative.",
    intro: "Gothic castles in fantasy inherit a centuries-old tradition of architecture as character — the building itself is complicit in what happens inside it. Secrets in the walls, darkness in the history, something wrong in the stones themselves: the castle is never just a setting. Fantasy's willingness to make the supernatural literal transforms gothic atmosphere into something that can reach out and hurt you.",
  },
  {
    slug: "magic-tournament", name: "Magic Tournament", category: "world-magic",
    description: "A competitive magical event where participants duel with their powers.",
    intro: "Magic tournaments put the world-building on display: every spell cast reveals something about the system, its limits, and what kind of person excels within it. The competition structure exposes which powers the society values — and which it fears. Fantasy uses magic tournaments to showcase training, rivalry, and the politics that determine who gets to compete at all.",
  },
  {
    slug: "magical-artifacts", name: "Magical Artifacts", category: "world-magic",
    description: "Powerful enchanted objects.",
    intro: "Magical artifacts are fantasy's most versatile plot devices — they can be quests, threats, revelations, or weapons, often all at once. The best examples have personalities, histories, and costs that make them feel like characters rather than tools. An artifact's origin is usually as important as its power: who made it, why, and what it cost them tells you everything about the world.",
  },
  {
    slug: "necromancy", name: "Necromancy", category: "world-magic",
    description: "Raising or controlling the dead.",
    intro: "Necromancy sits at the intersection of death, ethics, and the limits of grief — it raises immediate questions about consent, the sanctity of death, and what people are willing to do for love or power. Fantasy has taken the trope from pure villainy into complex protagonists who use it with full awareness of its cost. The best necromancy stories make the ethical weight inseparable from the magic itself.",
  },
  {
    slug: "pirate-fantasy", name: "Pirate Fantasy", category: "world-magic",
    description: "Seafaring adventures and sea raiders.",
    intro: "Pirate fantasy is inherently kinetic: the ship is a mobile setting, the sea is hostile, and the crew is a pressure-cooker for relationships. Fantasy adds monsters, magic, and mythological depth to the age-of-sail template — cursed treasure that actually curses, sea gods with opinions, and ports that exist outside any ordinary map. The freedom of the open ocean gives these stories a distinctive energy.",
  },
  {
    slug: "sentient-weapon", name: "Sentient Weapon", category: "world-magic",
    description: "A weapon with its own consciousness.",
    intro: "Sentient weapons complicate the warrior narrative from inside: the weapon has power the wielder needs, and the weapon knows it. Opinions, needs, history, and the ability to refuse — these qualities make the weapon a character rather than a tool. Fantasy's magical traditions have produced some of the genre's most memorable non-human presences in this form.",
  },
  {
    slug: "underground-city", name: "Underground City", category: "world-magic",
    description: "Civilization beneath the surface.",
    intro: "Underground cities offer world-builders a complete alternative to the surface: different light, different economy, different mythologies, different threats. Fantasy's subterranean civilizations often carry the weight of exile, refuge, or resistance — communities that went underground for a reason and built something remarkable in the dark. The contrast with the surface world above is always part of the story.",
  },
  {
    slug: "viking-inspired", name: "Viking-Inspired World", category: "world-magic",
    description: "Norse-inspired fantasy setting.",
    intro: "Viking-inspired fantasy draws on a rich mythological tradition that feels simultaneously ancient and immediate: Ragnarok-scale stakes, honor cultures with genuine costs, and pantheons that act more like dangerous relatives than distant deities. The setting gives fantasy a distinctive voice that stands apart from its medieval-European defaults. Norse mythology's inherent tragedy — a world built to end — gives these stories a fatalistic energy few other templates can match.",
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
