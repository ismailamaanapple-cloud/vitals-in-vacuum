export type ScrollStep = {
  tag: string;
  title: string;
  body: string;
  stat?: { value: string; label: string };
};

export type SliderData = {
  title: string;
  caption: string;
  earthLabel: string;
  spaceLabel: string;
  earth: { headline: string; points: string[] };
  space: { headline: string; points: string[] };
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type ClinicalCase = {
  title: string;
  scenario: string;
  vitals: { label: string; value: string }[];
  question: string;
  options: { label: string; correct: boolean; feedback: string }[];
  teaching: string;
};

export type ModuleColor =
  | "cyan"
  | "vital"
  | "plasma"
  | "solar"
  | "azure"
  | "magenta"
  | "ember";

export type ModuleVisual =
  | "heart"
  | "bone"
  | "brain"
  | "radiation"
  | "mind"
  | "immune"
  | "mission";

export type DeepDive = {
  title: string;
  paragraphs: string[];
};

export type KeyTerm = {
  term: string;
  definition: string;
};

export type Misconception = {
  myth: string;
  reality: string;
};

export type Countermeasure = {
  title: string;
  body: string;
  status: string;
};

export type Module = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  color: ModuleColor;
  accent: string;
  summary: string;
  duration: string;
  visual: ModuleVisual;
  facts: { value: string; label: string }[];
  steps: ScrollStep[];
  slider: SliderData;
  quiz: QuizQuestion[];
  case: ClinicalCase;
  deepDive: DeepDive;
  keyTerms: KeyTerm[];
  misconceptions: Misconception[];
  countermeasures: Countermeasure[];
};

export const MODULES: Module[] = [
  {
    slug: "cardiovascular",
    index: "01",
    title: "Cardiovascular",
    subtitle: "Fluid shifts & the deconditioned heart",
    color: "cyan",
    accent: "#38e1ff",
    summary:
      "Without gravity to pull blood toward the feet, fluid redistributes headward — remodeling the heart, blunting the baroreflex, and setting up orthostatic intolerance on return.",
    duration: "8 min",
    visual: "heart",
    facts: [
      { value: "~2 L", label: "Fluid shifted headward in first 48 h" },
      { value: "−10–15%", label: "Plasma volume loss within days" },
      { value: "~1%/wk", label: "Loss of left-ventricular mass" },
      { value: "60–80%", label: "Crew with post-flight orthostatic intolerance" },
    ],
    steps: [
      {
        tag: "Launch + 0h",
        title: "Gravity lets go",
        body: "On Earth, gravity holds roughly two-thirds of your blood below heart level. In microgravity that hydrostatic gradient vanishes, and 1.5–2 liters of fluid surge from the legs into the thorax, neck, and head.",
        stat: { value: "2 L", label: "headward fluid shift" },
      },
      {
        tag: "Hours 1–48",
        title: "Puffy face, bird legs",
        body: "Crew develop facial edema and engorged neck veins while leg volume falls — the classic 'puffy-face, bird-leg' appearance. Stretched receptors in the heart and great vessels read this as volume overload.",
      },
      {
        tag: "Days 1–7",
        title: "The body dumps volume",
        body: "Cardiopulmonary baroreceptors trigger a diuresis and suppress thirst. Plasma volume falls 10–15%, red-cell mass is downregulated, and the astronaut becomes relatively hypovolemic — adapted to space, mismatched for Earth.",
        stat: { value: "−15%", label: "plasma volume" },
      },
      {
        tag: "Weeks +",
        title: "A heart with less work to do",
        body: "Unloaded by the absence of gravity, the left ventricle atrophies and becomes more spherical, losing about 1% of mass per week. Cardiac function in space is fine — the problem is what happens at re-entry.",
        stat: { value: "~1%/wk", label: "LV mass loss" },
      },
      {
        tag: "Re-entry",
        title: "Standing up again",
        body: "Back under gravity with low plasma volume, a deconditioned baroreflex, and a smaller heart, blood pools in the legs on standing. The result is orthostatic intolerance — lightheadedness, presyncope, or frank syncope.",
      },
    ],
    slider: {
      title: "Fluid distribution: 1G vs microgravity",
      caption: "Drag to compare where blood and interstitial fluid sit.",
      earthLabel: "On Earth (1G)",
      spaceLabel: "In orbit (µG)",
      earth: {
        headline: "Gravity-dominated gradient",
        points: [
          "~70% of blood volume pooled below the heart",
          "Legs bear the hydrostatic column",
          "Baroreflex tuned to upright posture",
          "Normal plasma volume & RBC mass",
        ],
      },
      space: {
        headline: "Headward redistribution",
        points: [
          "1.5–2 L shifted to thorax, neck, head",
          "Facial edema, distended jugular veins",
          "Diuresis → 10–15% plasma volume loss",
          "Baroreflex blunted, LV remodeled",
        ],
      },
    },
    quiz: [
      {
        q: "What primarily drives the cephalad fluid shift seen on entering microgravity?",
        options: [
          "Increased capillary permeability",
          "Loss of the gravitational hydrostatic gradient",
          "Acute kidney injury",
          "Hyperaldosteronism",
        ],
        answer: 1,
        explanation:
          "Microgravity removes the head-to-foot hydrostatic pressure gradient that normally keeps most blood below the heart, so fluid redistributes headward.",
      },
      {
        q: "Why are returning astronauts prone to orthostatic intolerance?",
        options: [
          "Expanded plasma volume and a hypertrophied heart",
          "Reduced plasma volume, blunted baroreflex, and cardiac atrophy",
          "Chronically elevated catecholamines",
          "Increased red-cell mass causing hyperviscosity",
        ],
        answer: 1,
        explanation:
          "Spaceflight lowers plasma volume, deconditions the baroreflex, and shrinks the left ventricle — so on standing under gravity, blood pools and cerebral perfusion drops.",
      },
      {
        q: "Roughly how much left-ventricular mass is lost per week in microgravity?",
        options: ["~0.1%", "~1%", "~5%", "~10%"],
        answer: 1,
        explanation:
          "The unloaded ventricle atrophies at about 1% of mass per week and becomes more spherical.",
      },
    ],
    case: {
      title: "Egress on landing day",
      scenario:
        "A 44-year-old astronaut returns after 6 months on the ISS. During the post-landing stand test she reports lightheadedness and tunnel vision after 3 minutes upright.",
      vitals: [
        { label: "Supine HR", value: "72 bpm" },
        { label: "Standing HR", value: "118 bpm" },
        { label: "Standing BP", value: "92/64" },
        { label: "Symptom", value: "Presyncope" },
      ],
      question: "What is the best immediate countermeasure?",
      options: [
        {
          label: "Have her lie down and give IV/oral fluid + salt loading",
          correct: true,
          feedback:
            "Correct — restoring intravascular volume directly addresses the spaceflight-induced hypovolemia driving orthostatic intolerance. Fluid loading is a standard re-entry countermeasure.",
        },
        {
          label: "Administer a beta-blocker",
          correct: false,
          feedback:
            "Incorrect — the tachycardia is a compensatory response to maintain perfusion. Blunting it would worsen hypotension.",
        },
        {
          label: "Start her walking to 'push through it'",
          correct: false,
          feedback:
            "Incorrect — continued upright posture risks frank syncope and injury.",
        },
      ],
      teaching:
        "Operational countermeasures combine fluid/salt loading before re-entry, compression garments (anti-G suits), and in-flight lower-body negative pressure and exercise to preserve plasma volume and baroreflex sensitivity.",
    },
    deepDive: {
      title: "The heart as a pressure system without a pump-down",
      paragraphs: [
        "On Earth, the cardiovascular system is engineered around a constant 1G load. Standing upright places a roughly 200 mmHg hydrostatic difference between the head and the feet, and the body counters it continuously: leg veins have one-way valves, the calf muscle pump pushes blood upward, and the arterial baroreflex makes split-second adjustments to heart rate and vascular tone to keep the brain perfused. None of this machinery gets a day off — until orbit.",
        "In microgravity the gradient simply disappears, so all of that compensatory tone becomes unnecessary. The body, efficient to a fault, downregulates what it no longer uses. Central venous pressure paradoxically falls despite the headward fluid shift, the kidneys offload what they read as excess volume, and the baroreflex 'set point' drifts. The left ventricle, no longer fighting gravity, remodels toward a smaller, more spherical shape within weeks.",
        "The clinical punchline is that astronauts are not sick in space — they are superbly adapted to space. The danger is the transition. Re-entry reintroduces the full 1G load to a system that has dismantled its defenses, which is why orthostatic intolerance, not in-flight cardiac failure, is the dominant cardiovascular risk of spaceflight. Understanding this mirrors what clinicians see in prolonged bed rest, deconditioning, and autonomic failure on Earth.",
      ],
    },
    keyTerms: [
      {
        term: "Hydrostatic gradient",
        definition:
          "The pressure difference within a fluid column caused by gravity. In an upright human it keeps roughly two-thirds of blood volume below the heart; microgravity abolishes it.",
      },
      {
        term: "Baroreflex",
        definition:
          "A rapid negative-feedback loop using pressure sensors in the carotid sinus and aortic arch to adjust heart rate and vascular tone, stabilizing blood pressure with posture changes.",
      },
      {
        term: "Orthostatic intolerance",
        definition:
          "The inability to maintain blood pressure and cerebral perfusion on standing, producing lightheadedness or syncope — the hallmark post-flight cardiovascular problem.",
      },
      {
        term: "Cardiac atrophy",
        definition:
          "Loss of myocardial mass when the heart is mechanically unloaded. The spaceflight left ventricle loses about 1% of mass per week and becomes more spherical.",
      },
      {
        term: "Lower-body negative pressure (LBNP)",
        definition:
          "A countermeasure device that applies suction to the lower body, pulling fluid footward to simulate gravity's effect and re-train the cardiovascular system.",
      },
    ],
    misconceptions: [
      {
        myth: "Astronauts' hearts work harder in space.",
        reality:
          "The opposite — without gravity to pump against, the heart is unloaded and actually atrophies. The strain comes on return to Earth.",
      },
      {
        myth: "The puffy face means astronauts are gaining fluid.",
        reality:
          "Total body fluid falls. Fluid is redistributed headward, but the kidneys soon dump volume, leaving crew relatively hypovolemic.",
      },
      {
        myth: "Fainting after landing means something is wrong with the heart.",
        reality:
          "It reflects normal, predictable adaptation: low plasma volume plus a deconditioned baroreflex. The heart itself is structurally fine.",
      },
    ],
    countermeasures: [
      {
        title: "Fluid & salt loading",
        body: "Crew drink a measured salt-and-water load shortly before re-entry to acutely re-expand plasma volume ahead of the gravity transition.",
        status: "Standard practice",
      },
      {
        title: "Compression garments",
        body: "Anti-G suits and graded compression on the legs and abdomen limit venous pooling on standing during the high-risk landing window.",
        status: "Standard practice",
      },
      {
        title: "Lower-body negative pressure",
        body: "In-flight LBNP sessions pull fluid footward to preserve baroreflex sensitivity; portable suit-based versions are in active testing.",
        status: "In development",
      },
    ],
  },
  {
    slug: "musculoskeletal",
    index: "02",
    title: "Musculoskeletal",
    subtitle: "Bone you can't feel losing",
    color: "vital",
    accent: "#5dffc2",
    summary:
      "Mechanical unloading uncouples bone remodeling and silences postural muscles. Bone resorption outpaces formation while antigravity muscles atrophy — a fracture and performance risk for long missions.",
    duration: "8 min",
    visual: "bone",
    facts: [
      { value: "1–1.5%", label: "Bone mineral density lost per month" },
      { value: "~10×", label: "Faster than postmenopausal bone loss" },
      { value: "−20%", label: "Muscle volume in calf over months" },
      { value: "2.5 h/day", label: "Exercise crew perform to fight it" },
    ],
    steps: [
      {
        tag: "Unloading",
        title: "Wolff's law in reverse",
        body: "Bone adapts to the loads placed on it. Remove gravity and the weight-bearing skeleton — spine, pelvis, femur — senses near-zero strain. Osteocytes stop signaling for maintenance.",
      },
      {
        tag: "Remodeling",
        title: "Resorption wins the tug-of-war",
        body: "Osteoclast activity rises while osteoblast formation lags. The remodeling balance tips negative, and weight-bearing sites lose 1–1.5% of mineral density every month — about ten times the rate of postmenopausal osteoporosis.",
        stat: { value: "1.5%/mo", label: "BMD loss at the hip" },
      },
      {
        tag: "Calcium",
        title: "A rising stone risk",
        body: "Liberated calcium floods the blood and is excreted by the kidneys, raising urinary calcium and the risk of renal stones — a problem compounded by spaceflight dehydration.",
      },
      {
        tag: "Muscle",
        title: "Antigravity muscles fall silent",
        body: "Postural muscles — calf, quadriceps, paraspinals — are barely recruited in microgravity. They atrophy fastest, shifting toward fatigue-prone fast-twitch fibers and losing up to 20% of volume.",
        stat: { value: "−20%", label: "calf muscle volume" },
      },
      {
        tag: "Countermeasures",
        title: "Loading the body on purpose",
        body: "Crew train ~2.5 hours daily on the Advanced Resistive Exercise Device (ARED), treadmill, and cycle. Combined with bisphosphonates and nutrition, this dramatically slows — but does not fully prevent — losses.",
        stat: { value: "2.5 h", label: "daily exercise" },
      },
    ],
    slider: {
      title: "Trabecular bone: loaded vs unloaded",
      caption: "Drag to compare bone microarchitecture over a long mission.",
      earthLabel: "Loaded (1G)",
      spaceLabel: "Unloaded (µG)",
      earth: {
        headline: "Dense, well-connected trabeculae",
        points: [
          "Daily weight-bearing strain maintains mass",
          "Balanced osteoblast / osteoclast remodeling",
          "Normal urinary calcium",
          "Robust antigravity muscle tone",
        ],
      },
      space: {
        headline: "Thinned, disconnected trabeculae",
        points: [
          "1–1.5% mineral density lost per month",
          "Resorption outpaces formation",
          "Hypercalciuria → renal stone risk",
          "Calf & spine muscle atrophy",
        ],
      },
    },
    quiz: [
      {
        q: "Which sites lose bone fastest in spaceflight?",
        options: [
          "Skull and mandible",
          "Forearm and wrist",
          "Weight-bearing sites: hip, spine, pelvis",
          "Bone loss is uniform throughout",
        ],
        answer: 2,
        explanation:
          "Loss tracks mechanical unloading, so the normally weight-bearing axial and lower-limb skeleton is most affected.",
      },
      {
        q: "What is the mechanism of microgravity bone loss?",
        options: [
          "Increased osteoblast activity",
          "Resorption (osteoclasts) outpacing formation (osteoblasts)",
          "Vitamin D toxicity",
          "Parathyroid adenoma",
        ],
        answer: 1,
        explanation:
          "Unloading uncouples remodeling: osteoclastic resorption rises and osteoblastic formation falls, producing net loss.",
      },
      {
        q: "Which is the primary in-flight countermeasure against bone and muscle loss?",
        options: [
          "Bed rest",
          "High-dose vitamin C",
          "Resistive and aerobic exercise (e.g., ARED)",
          "Supplemental oxygen",
        ],
        answer: 2,
        explanation:
          "Daily resistive exercise reloads the skeleton and muscles; it is the cornerstone countermeasure, often paired with bisphosphonates.",
      },
    ],
    case: {
      title: "Flank pain at mission day 120",
      scenario:
        "A crew member reports sudden severe right flank pain radiating to the groin, with microscopic hematuria on the in-flight urinalysis. He has been drinking less water to reduce bathroom trips.",
      vitals: [
        { label: "Pain", value: "9/10, colicky" },
        { label: "Urine", value: "Micro hematuria" },
        { label: "Hydration", value: "Reduced intake" },
        { label: "Mission day", value: "120" },
      ],
      question: "What is the most likely diagnosis and contributing factor?",
      options: [
        {
          label: "Renal calculus from hypercalciuria + dehydration",
          correct: true,
          feedback:
            "Correct — bone resorption raises urinary calcium, and reduced fluid intake concentrates urine, dramatically increasing stone risk. This is a recognized operational hazard.",
        },
        {
          label: "Acute appendicitis",
          correct: false,
          feedback:
            "Less likely — colicky flank pain radiating to the groin with hematuria points to the urinary tract, not the appendix.",
        },
        {
          label: "Muscle strain from exercise",
          correct: false,
          feedback:
            "Incorrect — hematuria and colicky radiating pain are not explained by a strain.",
        },
      ],
      teaching:
        "Spaceflight hypercalciuria plus low urine volume favors stone formation. Prevention emphasizes hydration, sometimes potassium citrate, and bone-loss countermeasures. Stones are a serious concern for exploration missions with no rapid return.",
    },
    deepDive: {
      title: "Bone is a living organ that listens to load",
      paragraphs: [
        "Bone is not inert scaffolding — it is a metabolically active tissue in constant turnover. Osteoclasts resorb old bone while osteoblasts lay down new matrix, and the balance between them is tuned by mechanical strain. This is Wolff's law: bone adapts its strength and architecture to the loads habitually placed on it. Embedded osteocytes act as the strain sensors, signaling for maintenance whenever the skeleton is loaded.",
        "Remove gravity and the weight-bearing skeleton senses near-zero strain. Osteocyte signaling falls quiet, osteoclast activity rises, and formation lags behind resorption. The result is a net loss of 1–1.5% of bone mineral density per month at the hip and spine — roughly ten times faster than postmenopausal osteoporosis, and crucially, from sites that bear the body's weight on Earth. The liberated calcium raises blood and urine calcium, compounding kidney-stone risk.",
        "Muscle follows the same use-it-or-lose-it logic on a faster timescale. Antigravity postural muscles — the calf, quadriceps, and paraspinals — are barely recruited in microgravity and can lose up to 20% of their volume over months, shifting toward fatigue-prone fibers. The unsettling feature of both losses is that they are painless and invisible day to day: an astronaut cannot feel bone dissolving, which is exactly why rigorous, scheduled countermeasures matter.",
      ],
    },
    keyTerms: [
      {
        term: "Wolff's law",
        definition:
          "The principle that bone remodels in response to the mechanical loads placed on it — strengthening under load and weakening when unloaded.",
      },
      {
        term: "Osteoclast / osteoblast",
        definition:
          "Osteoclasts resorb (break down) bone; osteoblasts form new bone. Their balance governs bone mass, and microgravity tips it toward net resorption.",
      },
      {
        term: "Bone mineral density (BMD)",
        definition:
          "A measure of mineral content per area of bone, used clinically to gauge fracture risk. Spaceflight reduces BMD at 1–1.5% per month at weight-bearing sites.",
      },
      {
        term: "Hypercalciuria",
        definition:
          "Elevated urinary calcium. Bone resorption floods the blood with calcium that the kidneys excrete, raising renal stone risk — worsened by spaceflight dehydration.",
      },
      {
        term: "ARED",
        definition:
          "The Advanced Resistive Exercise Device on the ISS, which uses vacuum cylinders to simulate free-weight resistance training in microgravity.",
      },
    ],
    misconceptions: [
      {
        myth: "Bone loss in space is just like the calcium you lose with age.",
        reality:
          "It is about ten times faster than postmenopausal osteoporosis and concentrated at weight-bearing sites, driven by unloading rather than hormones.",
      },
      {
        myth: "Exercise in space fully prevents bone and muscle loss.",
        reality:
          "Daily resistive exercise dramatically slows losses but does not eliminate them; some bone density may not fully recover even after return.",
      },
      {
        myth: "Astronauts can feel their bones weakening.",
        reality:
          "Bone and muscle loss are silent. The first sign can be a fracture or a kidney stone — which is why monitoring and scheduled loading are essential.",
      },
    ],
    countermeasures: [
      {
        title: "Resistive exercise",
        body: "About 2.5 hours of daily training on the ARED, treadmill, and cycle ergometer reloads the skeleton and recruits antigravity muscles.",
        status: "Standard practice",
      },
      {
        title: "Bisphosphonates",
        body: "Anti-resorptive drugs (e.g., alendronate) paired with exercise further suppress osteoclast activity and help preserve bone mineral density.",
        status: "Standard practice",
      },
      {
        title: "Nutrition & hydration",
        body: "Adequate calcium, vitamin D, protein, and fluid intake support bone metabolism and lower the urinary-stone risk from hypercalciuria.",
        status: "Standard practice",
      },
    ],
  },
  {
    slug: "neuro-vestibular",
    index: "03",
    title: "Balance & Vision",
    subtitle: "Why space scrambles balance and pressures the eyes",
    color: "plasma",
    accent: "#b06bff",
    summary:
      "With no gravity, the inner ear can no longer tell which way is down, so the brain gets confused and most crew feel space-sick at first. Over months, fluid building up in the head presses on the eyes and can blur vision — a problem doctors call SANS (Spaceflight-Associated Neuro-ocular Syndrome).",
    duration: "9 min",
    visual: "brain",
    facts: [
      { value: "60–70%", label: "Crew with space motion sickness" },
      { value: "2–4 days", label: "Typical adaptation time" },
      { value: ">60%", label: "Long-duration crew with SANS findings" },
      { value: "Months+", label: "Some ocular changes persist post-flight" },
    ],
    steps: [
      {
        tag: "Otoliths",
        title: "Gravity sensors with no gravity",
        body: "The otolith organs (utricle, saccule) sense linear acceleration and gravity. In orbit they no longer report 'down', so the brain receives vestibular signals that conflict with vision and proprioception.",
      },
      {
        tag: "Sensory conflict",
        title: "Space motion sickness",
        body: "This sensory mismatch produces space motion sickness — nausea, malaise, and disorientation — in the majority of crew during their first days. The brain reweights its inputs and most adapt within 2–4 days.",
        stat: { value: "~70%", label: "affected early" },
      },
      {
        tag: "Re-adaptation",
        title: "Two adaptations, two transitions",
        body: "Having adapted to microgravity, crew must re-adapt to gravity on return, with renewed imbalance, vertigo, and gait instability — a key operational risk for landing on Mars with no support crew.",
      },
      {
        tag: "Fluid + eye",
        title: "Pressure behind the eye",
        body: "The same headward fluid shift raises intracranial and ocular pressures over months. This is thought to drive SANS — Spaceflight-Associated Neuro-ocular Syndrome.",
      },
      {
        tag: "SANS",
        title: "Optic disc edema & hyperopic shift",
        body: "SANS features optic disc edema, globe flattening, choroidal folds, and a hyperopic (farsighted) refractive shift. Found in over half of long-duration crew, some changes persist for months after return.",
        stat: { value: ">60%", label: "with SANS signs" },
      },
    ],
    slider: {
      title: "The eye: ground vs long-duration flight",
      caption: "Drag to compare ocular structure in SANS.",
      earthLabel: "Pre-flight",
      spaceLabel: "Long-duration",
      earth: {
        headline: "Normal globe & optic disc",
        points: [
          "Spherical globe, sharp disc margins",
          "Normal intracranial pressure dynamics",
          "Stable refraction",
          "Otoliths sense true 'down'",
        ],
      },
      space: {
        headline: "SANS changes",
        points: [
          "Optic disc edema, choroidal folds",
          "Posterior globe flattening",
          "Hyperopic refractive shift",
          "Vestibular reweighting / disorientation",
        ],
      },
    },
    quiz: [
      {
        q: "What sensory organs are most directly disrupted at the onset of space motion sickness?",
        options: [
          "Cochlear hair cells",
          "Otolith organs of the vestibular system",
          "Retinal photoreceptors",
          "Olfactory epithelium",
        ],
        answer: 1,
        explanation:
          "The otoliths sense gravity/linear acceleration; in microgravity they give signals that conflict with vision and proprioception, driving sensory-conflict sickness.",
      },
      {
        q: "Which best describes SANS?",
        options: [
          "Inner-ear infection from spaceflight",
          "Neuro-ocular changes (disc edema, globe flattening, hyperopic shift) linked to fluid shift",
          "Acute retinal detachment from launch G-forces",
          "Color blindness from cosmic radiation",
        ],
        answer: 1,
        explanation:
          "SANS is a constellation of neuro-ocular findings associated with the chronic headward fluid shift and altered pressure dynamics of long-duration flight.",
      },
      {
        q: "Roughly how long does it take most crew to adapt to space motion sickness?",
        options: ["A few minutes", "2–4 days", "6 weeks", "It never resolves"],
        answer: 1,
        explanation:
          "Most crew habituate within 2–4 days as the brain reweights conflicting sensory inputs.",
      },
    ],
    case: {
      title: "Blurred vision at month 4",
      scenario:
        "A long-duration crew member notices she now needs reading glasses she never required on Earth. Fundoscopy via the station's imaging shows mild optic disc edema and choroidal folds.",
      vitals: [
        { label: "Refraction", value: "Hyperopic shift" },
        { label: "Disc", value: "Mild edema" },
        { label: "Retina", value: "Choroidal folds" },
        { label: "Pain", value: "None" },
      ],
      question: "What is the most likely explanation?",
      options: [
        {
          label: "Spaceflight-Associated Neuro-ocular Syndrome (SANS)",
          correct: true,
          feedback:
            "Correct — painless hyperopic shift with disc edema and choroidal folds in a long-duration crew member is the classic SANS picture, linked to the chronic headward fluid shift.",
        },
        {
          label: "Acute angle-closure glaucoma",
          correct: false,
          feedback:
            "Incorrect — that presents with acute pain, a red eye, and halos, not a painless hyperopic shift.",
        },
        {
          label: "Optic neuritis",
          correct: false,
          feedback:
            "Less likely — optic neuritis typically causes painful vision loss and an afferent pupillary defect, not this constellation.",
        },
      ],
      teaching:
        "SANS is a leading physiological risk for Mars-class missions. Countermeasures under study include lower-body negative pressure, thigh cuffs, and controlled CO2 — all aimed at the underlying fluid shift.",
    },
    deepDive: {
      title: "When the brain's sense of 'down' goes missing",
      paragraphs: [
        "Balance is not a single sense but a continuous negotiation between three streams of information: the vestibular system in the inner ear, vision, and proprioception from muscles and joints. The otolith organs — the utricle and saccule — contain tiny calcium-carbonate crystals that shift with gravity and linear acceleration, giving the brain a reliable signal for 'down'. In orbit, those crystals no longer settle, so the otoliths report a 'down' that contradicts what the eyes and body feel.",
        "This sensory conflict is what produces space motion sickness — nausea, malaise, and disorientation — in the majority of crew during their first days. The brain resolves the conflict by reweighting its inputs, trusting vision and touch more than the now-unreliable otoliths, and most crew adapt within two to four days. The catch is that this hard-won adaptation has to be unlearned on return, producing renewed vertigo and gait instability under gravity.",
        "Layered on top is a slower, more insidious problem. The same chronic headward fluid shift that puffs the face appears to raise pressure around the brain and eye over months, producing Spaceflight-Associated Neuro-ocular Syndrome (SANS): optic-disc edema, flattening of the back of the eyeball, choroidal folds, and a hyperopic (farsighted) shift in vision. Found in over half of long-duration crew and sometimes persisting after landing, SANS is one of the least-understood and highest-priority risks for a multi-year Mars mission.",
      ],
    },
    keyTerms: [
      {
        term: "Otolith organs",
        definition:
          "The utricle and saccule of the inner ear, which sense gravity and linear acceleration via crystal-laden membranes. They lose their reference in microgravity.",
      },
      {
        term: "Sensory conflict",
        definition:
          "A mismatch between vestibular, visual, and proprioceptive signals. The brain interprets the conflict as motion sickness until it reweights its inputs.",
      },
      {
        term: "Vestibular reweighting",
        definition:
          "The adaptive process by which the brain shifts trust away from unreliable otolith signals toward vision and proprioception, allowing crew to function within days.",
      },
      {
        term: "SANS",
        definition:
          "Spaceflight-Associated Neuro-ocular Syndrome: a cluster of eye and optic-nerve changes linked to the chronic headward fluid shift of long-duration flight.",
      },
      {
        term: "Hyperopic shift",
        definition:
          "A move toward farsightedness caused by flattening of the posterior globe in SANS, leaving some crew needing reading glasses they never used on Earth.",
      },
    ],
    misconceptions: [
      {
        myth: "Space motion sickness means an astronaut is unfit to fly.",
        reality:
          "It affects the majority of crew regardless of fitness and almost always resolves within a few days as the brain adapts.",
      },
      {
        myth: "Once you adapt to space, the balance problems are over.",
        reality:
          "Re-entry forces a second, opposite re-adaptation to gravity, bringing renewed vertigo and unsteady gait — a key risk for landing on Mars unaided.",
      },
      {
        myth: "SANS is just temporary blurry vision.",
        reality:
          "It involves structural changes — disc edema, globe flattening, choroidal folds — and some findings can persist for months after returning to Earth.",
      },
    ],
    countermeasures: [
      {
        title: "Pre-flight adaptation training",
        body: "Familiarization with motion and rotation helps crew habituate faster; medications like scopolamine manage acute space motion sickness symptoms.",
        status: "Standard practice",
      },
      {
        title: "Lower-body negative pressure",
        body: "Drawing fluid footward is being studied to relieve the chronic headward shift thought to drive SANS, alongside thigh cuffs.",
        status: "In development",
      },
      {
        title: "Cabin CO₂ & monitoring",
        body: "Controlling cabin carbon dioxide and routine in-flight ocular imaging aim to detect and limit SANS progression before it becomes permanent.",
        status: "Under study",
      },
    ],
  },
  {
    slug: "radiation",
    index: "04",
    title: "Radiation & Systems",
    subtitle: "The invisible exposure",
    color: "solar",
    accent: "#ffb23e",
    summary:
      "Beyond Earth's magnetosphere, galactic cosmic rays and solar particle events raise cancer and CNS risk. Layered on top: immune dysregulation, disrupted circadian rhythm, and the psychology of isolation.",
    duration: "9 min",
    visual: "radiation",
    facts: [
      { value: "~50–100×", label: "Deep-space dose vs sea level" },
      { value: "GCR + SPE", label: "Two distinct radiation threats" },
      { value: "Disrupted", label: "Circadian rhythm (16 sunrises/day)" },
      { value: "Reactivated", label: "Latent viruses from immune shifts" },
    ],
    steps: [
      {
        tag: "Sources",
        title: "Two kinds of radiation",
        body: "Deep space carries galactic cosmic rays (GCR) — high-energy heavy ions from outside the solar system — and solar particle events (SPE), sudden storms of protons from the Sun. Each poses a different risk profile.",
      },
      {
        tag: "Shielding",
        title: "Earth's missing shield",
        body: "On the ground, the atmosphere and magnetosphere absorb most of this. The ISS in low Earth orbit gets partial protection; beyond it — to the Moon or Mars — crews lose that shield entirely.",
        stat: { value: "50–100×", label: "dose vs Earth" },
      },
      {
        tag: "Biology",
        title: "Damage at the DNA level",
        body: "Heavy ions create dense tracks of ionization, causing complex double-strand DNA breaks that are hard to repair. This raises lifetime cancer risk and may injure the central nervous system.",
      },
      {
        tag: "Immune",
        title: "An immune system off-balance",
        body: "Microgravity, stress, and radiation dysregulate immunity — shifting cytokines and reactivating latent viruses such as Epstein–Barr and varicella-zoster, sometimes with skin or systemic symptoms.",
      },
      {
        tag: "Mind & clock",
        title: "Circadian and psychological strain",
        body: "With 16 sunrises a day, circadian rhythm and sleep suffer. Isolation, confinement, and high workload add behavioral-health risk — a major focus for missions measured in years.",
        stat: { value: "16", label: "sunrises per day on ISS" },
      },
    ],
    slider: {
      title: "Radiation environment: Earth vs deep space",
      caption: "Drag to compare exposure and protection.",
      earthLabel: "On Earth",
      spaceLabel: "Deep space",
      earth: {
        headline: "Shielded biosphere",
        points: [
          "Atmosphere + magnetosphere absorb cosmic rays",
          "~1–3 mSv/year background dose",
          "Stable 24-hour light/dark cycle",
          "Intact immune regulation",
        ],
      },
      space: {
        headline: "Unshielded exposure",
        points: [
          "Galactic cosmic rays + solar particle events",
          "Dose 50–100× higher; complex DNA breaks",
          "Disrupted circadian rhythm & sleep",
          "Immune dysregulation, viral reactivation",
        ],
      },
    },
    quiz: [
      {
        q: "What makes galactic cosmic ray (GCR) exposure especially hazardous?",
        options: [
          "It is easily blocked by thin aluminum",
          "High-energy heavy ions cause complex, hard-to-repair DNA damage",
          "It only affects the skin",
          "It is identical to a chest X-ray",
        ],
        answer: 1,
        explanation:
          "Heavy ions deposit dense ionization tracks producing complex double-strand breaks, raising cancer and CNS risk; they are difficult to shield against.",
      },
      {
        q: "Why is the ISS less exposed than a Mars-transit vehicle?",
        options: [
          "It flies above the radiation belts",
          "Low Earth orbit retains partial magnetospheric protection",
          "It is made of lead",
          "Astronauts there take antioxidants",
        ],
        answer: 1,
        explanation:
          "Low Earth orbit still benefits from much of Earth's magnetosphere; beyond it, that protection is lost.",
      },
      {
        q: "Which non-radiation systemic effect is commonly reported in spaceflight?",
        options: [
          "Improved deep sleep",
          "Reactivation of latent viruses due to immune dysregulation",
          "Permanent immunity boost",
          "Resolution of all allergies",
        ],
        answer: 1,
        explanation:
          "Stress, microgravity, and radiation shift immune function and can reactivate latent herpesviruses such as EBV and VZV.",
      },
    ],
    case: {
      title: "Solar storm warning in transit",
      scenario:
        "Mid-transit to Mars, ground control relays that solar observatories have detected a major coronal mass ejection. A solar particle event is expected to reach the vehicle within hours.",
      vitals: [
        { label: "Threat", value: "Solar particle event" },
        { label: "Lead time", value: "~Hours" },
        { label: "Location", value: "Deep space" },
        { label: "Crew", value: "Asymptomatic" },
      ],
      question: "What is the priority action?",
      options: [
        {
          label: "Move crew into the heavily shielded storm shelter and minimize EVA",
          correct: true,
          feedback:
            "Correct — SPEs are acute, high-flux proton events. Sheltering in the most shielded compartment (often surrounded by water/supplies) is the primary protective action; the dose can be acutely dangerous.",
        },
        {
          label: "Ignore it — radiation is a chronic, not acute, concern",
          correct: false,
          feedback:
            "Incorrect — while GCR is chronic, a major SPE can deliver an acute, potentially incapacitating dose within hours.",
        },
        {
          label: "Increase cabin oxygen to counteract radiation",
          correct: false,
          feedback:
            "Incorrect — oxygen does not mitigate radiation and raising it adds fire risk.",
        },
      ],
      teaching:
        "Operational radiation protection layers passive shielding, storm shelters for SPEs, dose monitoring, and mission timing relative to the solar cycle. GCR remains the hardest unsolved problem for human Mars exploration.",
    },
    deepDive: {
      title: "The exposure you cannot see, shield, or outrun",
      paragraphs: [
        "Earth's surface is a remarkably sheltered place. The atmosphere and the planet's magnetic field together absorb or deflect the overwhelming majority of cosmic radiation, holding background dose to roughly 1–3 millisieverts per year. Low Earth orbit, where the ISS flies, still sits largely inside the magnetosphere and retains much of that protection. Beyond it — on the way to the Moon or Mars — crews lose the shield entirely and face two distinct threats.",
        "The first is galactic cosmic rays (GCR): a constant rain of high-energy heavy ions originating outside the solar system. Because they carry so much energy and mass, GCR particles punch through spacecraft hulls and tissue, leaving dense tracks of ionization that cause complex, clustered DNA double-strand breaks the cell struggles to repair. This raises lifetime cancer risk and may injure the central nervous system, and — frustratingly — thin aluminium shielding can make it worse by shattering particles into secondary showers. The second threat, solar particle events (SPEs), are sudden storms of protons from the Sun that can deliver an acute, potentially incapacitating dose within hours.",
        "Radiation rarely acts alone. Microgravity, psychological stress, and disrupted sleep dysregulate the immune system, shifting cytokine balance and reactivating latent viruses such as Epstein–Barr and varicella-zoster. With sixteen sunrises a day on the ISS, circadian rhythm and sleep suffer, and the isolation and confinement of a multi-year mission add a serious behavioral-health burden. Space medicine therefore treats radiation as one thread in a tangle of interacting systemic stresses — and GCR remains the single hardest unsolved problem standing between humans and Mars.",
      ],
    },
    keyTerms: [
      {
        term: "Galactic cosmic rays (GCR)",
        definition:
          "High-energy heavy ions from beyond the solar system. They penetrate shielding, cause complex DNA damage, and are the dominant chronic radiation risk in deep space.",
      },
      {
        term: "Solar particle event (SPE)",
        definition:
          "A sudden burst of energetic protons from the Sun that can deliver a dangerous acute dose within hours, requiring crew to shelter quickly.",
      },
      {
        term: "Magnetosphere",
        definition:
          "Earth's protective magnetic field, which deflects much incoming charged radiation. Crews leaving low Earth orbit lose this shielding.",
      },
      {
        term: "Double-strand break",
        definition:
          "A severe form of DNA damage in which both strands are cut. Heavy-ion radiation produces clustered breaks that are difficult to repair, raising cancer risk.",
      },
      {
        term: "Sievert (Sv)",
        definition:
          "The unit of biologically weighted radiation dose. Deep-space exposure can be 50–100× the ~1–3 mSv/year background at sea level.",
      },
    ],
    misconceptions: [
      {
        myth: "Spacecraft walls block radiation like a lead apron.",
        reality:
          "Thin shielding can worsen GCR exposure by fragmenting heavy ions into secondary particle showers; GCR is extremely hard to stop.",
      },
      {
        myth: "Radiation is purely a slow, long-term cancer risk.",
        reality:
          "Galactic cosmic rays act chronically, but a major solar particle event can deliver an acute, potentially incapacitating dose within hours.",
      },
      {
        myth: "Radiation is the only systemic danger of deep space.",
        reality:
          "It travels with immune dysregulation, viral reactivation, circadian disruption, and the psychological strain of isolation — all interacting.",
      },
    ],
    countermeasures: [
      {
        title: "Storm shelters",
        body: "A heavily shielded compartment — often surrounded by water, food, and supplies — protects crew during the acute, high-flux window of a solar particle event.",
        status: "Standard practice",
      },
      {
        title: "Dose monitoring & mission timing",
        body: "Personal dosimeters track cumulative exposure, and missions are timed against the ~11-year solar cycle to limit peak radiation risk.",
        status: "Standard practice",
      },
      {
        title: "Advanced shielding & pharmacology",
        body: "Hydrogen-rich materials, water walls, and candidate radioprotective drugs are under study, but no full solution to GCR yet exists.",
        status: "Research frontier",
      },
    ],
  },
  {
    slug: "sleep-and-mind",
    index: "05",
    title: "Sleep & the Mind",
    subtitle: "A broken clock and a crew under pressure",
    color: "azure",
    accent: "#4d8bff",
    visual: "mind",
    summary:
      "With sixteen sunrises a day, the body's internal clock loses its anchor, sleep gets short and fragmented, and performance suffers. Add isolation, confinement, and constant risk, and behavioral health becomes one of the make-or-break factors of a long mission.",
    duration: "8 min",
    facts: [
      { value: "16", label: "Sunrises and sunsets every 24 hours on the ISS" },
      { value: "~6 h", label: "Average sleep crew actually get per night" },
      { value: "~75%", label: "Of crew use sleep medication at some point" },
      { value: "2.5 yr", label: "Round-trip isolation expected for a Mars mission" },
    ],
    steps: [
      {
        tag: "The clock",
        title: "An internal day with no external cue",
        body: "Almost every cell runs on a roughly 24-hour circadian rhythm, kept in sync by the master clock in the brain that reads daylight. In orbit the Sun rises and sets every 90 minutes, so that anchoring signal is scrambled and the body's clock begins to drift.",
        stat: { value: "90 min", label: "length of one orbital 'day'" },
      },
      {
        tag: "Lost sleep",
        title: "Short, broken nights",
        body: "Between a drifting clock, noise, excitement, workload, and a headward fluid shift that congests the head, crew average only about six hours of often-fragmented sleep — chronically less than they need.",
        stat: { value: "~6 h", label: "actual sleep per night" },
      },
      {
        tag: "Performance",
        title: "Tired brains make mistakes",
        body: "Sleep loss erodes attention, reaction time, mood, and decision-making — exactly the faculties a crew operating complex, high-stakes systems cannot afford to lose. Fatigue has contributed to errors across aviation and spaceflight history.",
      },
      {
        tag: "Isolation",
        title: "Confined, isolated, and far from home",
        body: "Spaceflight is the ultimate 'ICE' environment — Isolated, Confined, and Extreme. A small crew shares a cramped volume for months, cut off from family, nature, and normal life, under continuous low-level danger.",
      },
      {
        tag: "Behavioral health",
        title: "The mind is mission-critical",
        body: "Over long missions, mood, motivation, and crew cohesion can fray, with risks of depression, anxiety, interpersonal conflict, and reduced performance. On a Mars mission, with no resupply and a 20-minute comms delay, psychological resilience becomes a primary safety system.",
        stat: { value: "20 min", label: "one-way comms delay at Mars" },
      },
    ],
    slider: {
      title: "Day and mind: Earth vs orbit",
      caption: "Drag to compare the body clock and mental load.",
      earthLabel: "On Earth",
      spaceLabel: "In orbit",
      earth: {
        headline: "Anchored rhythm, restorative sleep",
        points: [
          "One sunrise sets a stable 24-hour clock",
          "Typically 7–9 hours of consolidated sleep",
          "Open space, nature, and social support",
          "Help and escape are always close at hand",
        ],
      },
      space: {
        headline: "Drifting clock, strained mind",
        points: [
          "16 sunrises scramble circadian cues",
          "~6 hours of short, fragmented sleep",
          "Isolated, confined, extreme environment",
          "Continuous workload, risk, and separation",
        ],
      },
    },
    quiz: [
      {
        q: "Why does the circadian clock drift in low Earth orbit?",
        options: [
          "Microgravity directly damages the brain's clock",
          "The Sun rises and sets every ~90 minutes, removing a stable light cue",
          "Astronauts are not allowed to sleep",
          "Cosmic rays reset the clock hourly",
        ],
        answer: 1,
        explanation:
          "The master clock is normally entrained by the 24-hour light/dark cycle. With ~16 sunrises a day, that anchoring signal is lost and the rhythm drifts.",
      },
      {
        q: "Which best describes spaceflight as a behavioral-health environment?",
        options: [
          "Spacious, social, and low-stress",
          "Isolated, Confined, and Extreme (an 'ICE' environment)",
          "Identical to life on Earth",
          "Risk-free once in orbit",
        ],
        answer: 1,
        explanation:
          "Spaceflight is a classic ICE environment — isolated, confined, and extreme — which is why behavioral health is a major focus for long missions.",
      },
      {
        q: "Why is fatigue an operational safety concern, not just a comfort issue?",
        options: [
          "It only affects sleep, nothing else",
          "Sleep loss degrades attention, reaction time, mood, and decisions",
          "It improves performance over time",
          "It has no measurable effect on crews",
        ],
        answer: 1,
        explanation:
          "Chronic sleep loss impairs exactly the cognitive functions crews rely on to operate complex systems safely, contributing to error risk.",
      },
    ],
    case: {
      title: "Errors creep in at week six",
      scenario:
        "A crew member on a long-duration mission is making uncharacteristic procedural slips and seems irritable and withdrawn. Sleep logs show 5–6 hours a night with frequent awakenings, and he has been skipping scheduled downtime to keep up with tasks.",
      vitals: [
        { label: "Sleep", value: "5–6 h, broken" },
        { label: "Mood", value: "Irritable, low" },
        { label: "Errors", value: "Increasing" },
        { label: "Downtime", value: "Often skipped" },
      ],
      question: "What is the most appropriate first response?",
      options: [
        {
          label: "Protect and restore sleep: enforce a sleep schedule, optimize light, and reduce overload",
          correct: true,
          feedback:
            "Correct — restoring sleep and reducing workload directly target the root cause. Scheduled sleep, bright/dim light timing, and offloading non-critical tasks are first-line behavioral-health countermeasures.",
        },
        {
          label: "Add more tasks to 'keep him focused'",
          correct: false,
          feedback:
            "Incorrect — increasing workload would deepen sleep debt and worsen performance and mood.",
        },
        {
          label: "Ignore it; performance dips are normal and need no action",
          correct: false,
          feedback:
            "Incorrect — rising error rates and mood change are warning signs that warrant active management, especially far from help.",
        },
      ],
      teaching:
        "Behavioral health is managed proactively: protected sleep, circadian lighting, meaningful work and rest balance, private family communication, and psychological support. On exploration missions, autonomy and crew-led tools become essential because real-time ground support is delayed.",
    },
    deepDive: {
      title: "The clock you can't see is running the whole body",
      paragraphs: [
        "Buried deep in the brain, the suprachiasmatic nucleus acts as a master clock, and it sets the tempo for nearly every tissue — hormone release, body temperature, alertness, digestion, and sleep all rise and fall on a roughly 24-hour cycle. That clock is not perfectly 24 hours on its own; it has to be re-set daily, and the dominant signal that re-sets it is light hitting the eye each morning. Remove a single, reliable sunrise and the whole system starts to wander.",
        "In orbit, the Sun comes up every 90 minutes, so that anchoring cue is effectively meaningless. Combine the drifting clock with noise, a demanding schedule, the excitement of being in space, elevated cabin carbon dioxide, and a headward fluid shift that leaves the head feeling congested, and the result is predictable: crews sleep less and worse than they would on Earth, and a large fraction rely on sleep medication. Sleep debt then compounds, quietly eroding attention, reaction time, memory, and mood — the exact capacities a crew needs to stay safe.",
        "Layered on top of biology is psychology. Spaceflight is the textbook 'ICE' environment — isolated, confined, and extreme — where a few people share a cramped volume for months, far from family and the natural world, under unrelenting low-level risk. Over the timescale of a Mars mission, with no resupply and a communication delay that makes real-time conversation with Earth impossible, crew cohesion and individual resilience stop being soft factors and become hard mission-critical systems. This is why space agencies study sleep and behavioral health as seriously as they study bone or radiation.",
      ],
    },
    keyTerms: [
      {
        term: "Circadian rhythm",
        definition:
          "The body's roughly 24-hour internal cycle governing sleep, alertness, hormones, and temperature, normally synchronized by daily light exposure.",
      },
      {
        term: "Suprachiasmatic nucleus (SCN)",
        definition:
          "A small region of the brain's hypothalamus that serves as the master circadian clock, entrained by light signals from the eyes.",
      },
      {
        term: "Sleep debt",
        definition:
          "The accumulated deficit from getting less sleep than the body needs; it builds over days and degrades cognition and mood until repaid.",
      },
      {
        term: "ICE environment",
        definition:
          "Isolated, Confined, and Extreme — the class of settings (spaceflight, polar stations, submarines) that stress behavioral health.",
      },
      {
        term: "Circadian lighting",
        definition:
          "Engineered lighting that shifts in brightness and color over the day to mimic a natural cycle and help anchor the body clock in space.",
      },
    ],
    misconceptions: [
      {
        myth: "Astronauts sleep great because they're weightless and relaxed.",
        reality:
          "Most sleep less and more poorly than on Earth — about six broken hours — and many rely on sleep medication.",
      },
      {
        myth: "Mental health is a 'soft' concern compared to physical risks.",
        reality:
          "On long missions, behavioral health and crew cohesion are mission-critical safety systems, studied as rigorously as bone or radiation.",
      },
      {
        myth: "You can just push through fatigue with willpower.",
        reality:
          "Sleep loss measurably degrades attention, reaction time, and judgment regardless of motivation — which is why sleep is actively protected.",
      },
    ],
    countermeasures: [
      {
        title: "Protected sleep & scheduling",
        body: "Crews have scheduled, defended sleep periods and managed workloads, with naps and caffeine timed strategically to limit fatigue.",
        status: "Standard practice",
      },
      {
        title: "Circadian lighting",
        body: "Tunable LED lighting that brightens and shifts color through the day helps re-anchor the body clock against the 90-minute orbital cycle.",
        status: "Standard practice",
      },
      {
        title: "Behavioral-health support",
        body: "Private family conferencing, psychological check-ins, meaningful downtime, and crew-selection and training aim to sustain mood and cohesion.",
        status: "Standard practice",
      },
    ],
  },
  {
    slug: "immune-and-infection",
    index: "06",
    title: "Immune & Infection",
    subtitle: "A defense system thrown off balance",
    color: "magenta",
    accent: "#ff5db1",
    visual: "immune",
    summary:
      "Microgravity, stress, radiation, and disrupted sleep all nudge the immune system off balance — some parts overreacting, others underperforming. Dormant viruses can wake up, wounds heal more slowly, and a sealed spacecraft becomes its own small ecosystem of microbes.",
    duration: "8 min",
    facts: [
      { value: "~50%", label: "Of crew shed reactivated latent viruses in flight" },
      { value: "EBV · VZV · CMV", label: "Herpesviruses that can wake up in space" },
      { value: "Altered", label: "T-cell function and cytokine signaling" },
      { value: "Slower", label: "Wound healing observed in microgravity studies" },
    ],
    steps: [
      {
        tag: "Dysregulation",
        title: "Not weaker — unbalanced",
        body: "It is tempting to say the immune system is simply 'suppressed' in space, but the reality is messier. Some immune cells become less effective while others are over-activated, and the chemical signals (cytokines) that coordinate them shift. The system is dysregulated rather than uniformly weakened.",
      },
      {
        tag: "Why",
        title: "A perfect storm of stressors",
        body: "Microgravity changes how immune cells move and signal. Stress hormones, disrupted sleep, and radiation pile on. Together they push the immune system out of its normal operating range — a state that can both blunt defenses and stoke unhelpful inflammation.",
      },
      {
        tag: "Reactivation",
        title: "Sleeping viruses wake up",
        body: "Most adults carry dormant herpesviruses — Epstein–Barr (EBV), varicella-zoster (VZV, the chickenpox/shingles virus), and cytomegalovirus (CMV) — held in check by the immune system. In flight, around half of crew begin shedding at least one of these reactivated viruses, occasionally with symptoms like rashes.",
        stat: { value: "~50%", label: "shed a latent virus" },
      },
      {
        tag: "Healing",
        title: "Wounds and barriers under strain",
        body: "Studies suggest wounds may heal more slowly in microgravity, and skin — the body's first barrier — can become more irritable. In a closed environment, even a minor infection or slow-healing cut carries more weight.",
      },
      {
        tag: "The cabin",
        title: "A spacecraft is a shared microbiome",
        body: "A sealed spacecraft recirculates air and water and hosts its own community of microbes from the crew and surfaces. Microbes can change behavior in microgravity, and a dysregulated immune system meeting an altered microbial environment is a combination flight surgeons watch closely.",
      },
    ],
    slider: {
      title: "Immune balance: Earth vs microgravity",
      caption: "Drag to compare the body's defenses.",
      earthLabel: "On Earth",
      spaceLabel: "In microgravity",
      earth: {
        headline: "Balanced, well-coordinated defense",
        points: [
          "Immune cells patrol and signal normally",
          "Latent viruses kept dormant",
          "Wounds heal at the expected rate",
          "Stable, familiar microbial environment",
        ],
      },
      space: {
        headline: "Dysregulated defense",
        points: [
          "Some cells blunted, others over-activated",
          "~50% of crew reactivate latent viruses",
          "Slower wound healing in studies",
          "Closed cabin microbiome, altered microbes",
        ],
      },
    },
    quiz: [
      {
        q: "Which phrase best captures what spaceflight does to the immune system?",
        options: [
          "Uniformly strengthens it",
          "Uniformly destroys it",
          "Dysregulates it — some parts blunted, others over-activated",
          "Has no measurable effect",
        ],
        answer: 2,
        explanation:
          "Spaceflight dysregulates immunity: certain functions are reduced while others are heightened, and cytokine signaling shifts — it is imbalance, not simple suppression.",
      },
      {
        q: "Which viruses are classically reactivated in spaceflight?",
        options: [
          "Influenza and the common cold",
          "Latent herpesviruses such as EBV, VZV, and CMV",
          "HIV",
          "No viruses reactivate in space",
        ],
        answer: 1,
        explanation:
          "Dormant herpesviruses normally controlled by the immune system — EBV, VZV, and CMV — can reactivate when immunity is dysregulated, and about half of crew shed at least one.",
      },
      {
        q: "Why is infection risk a special concern aboard a spacecraft?",
        options: [
          "Microbes cannot survive in space at all",
          "A closed, recirculating environment plus dysregulated immunity raises stakes",
          "There are no microbes once in orbit",
          "Antibiotics work instantly in microgravity",
        ],
        answer: 1,
        explanation:
          "A sealed cabin shares air, water, and microbes among a small crew whose immune systems are off-balance, so even minor infections carry more risk far from definitive care.",
      },
    ],
    case: {
      title: "An itchy rash in orbit",
      scenario:
        "A crew member develops a painful, blistering rash in a band along one side of his torso during a long-duration mission. He had chickenpox as a child. In-flight saliva samples from the crew have shown viral shedding.",
      vitals: [
        { label: "Rash", value: "Banded, one side" },
        { label: "Pain", value: "Burning" },
        { label: "History", value: "Childhood chickenpox" },
        { label: "Shedding", value: "Detected in crew" },
      ],
      question: "What is the most likely diagnosis?",
      options: [
        {
          label: "Reactivation of varicella-zoster virus (shingles)",
          correct: true,
          feedback:
            "Correct — a painful, dermatomal (banded, one-sided) rash in someone with prior chickenpox is classic shingles, caused by reactivation of latent VZV when immunity is dysregulated — a documented spaceflight phenomenon.",
        },
        {
          label: "A new bacterial skin infection from a cut",
          correct: false,
          feedback:
            "Less likely — the banded, one-sided pattern and burning pain point to dermatomal viral reactivation rather than a localized bacterial wound.",
        },
        {
          label: "An allergic reaction to cabin materials",
          correct: false,
          feedback:
            "Incorrect — allergy would not typically produce a painful blistering rash confined to a single dermatome with this history.",
        },
      ],
      teaching:
        "Latent virus reactivation is a well-documented effect of spaceflight immune dysregulation. Management includes antiviral medication carried in the medical kit, monitoring, and reducing contributing stressors. Reactivation also serves researchers as a sensitive marker of immune status.",
    },
    deepDive: {
      title: "Defense by committee — and what happens when it loses coordination",
      paragraphs: [
        "The immune system is less a single shield than a vast, coordinated committee: barrier tissues like skin, fast-acting innate cells, slower but precise adaptive cells such as T and B lymphocytes, and a chemical messaging network of cytokines that tells everyone what to do. Its power comes from balance and communication — knowing when to attack, how hard, and when to stand down. Spaceflight does not so much disarm this committee as throw off its coordination.",
        "Several stressors act at once. Microgravity itself alters how immune cells move, cluster, and switch genes on and off. Stress hormones released during a demanding, high-stakes mission reshape immune signaling. Poor sleep and radiation add further perturbation. The net effect is dysregulation: some defensive functions are blunted while inflammatory signals can be inappropriately raised. One of the clearest fingerprints of this state is the reawakening of dormant herpesviruses — EBV, VZV, and CMV — which a healthy immune system normally keeps silent; roughly half of crew shed at least one in flight, sometimes with visible symptoms like shingles.",
        "The stakes are amplified by the setting. A spacecraft is a sealed ecosystem that recirculates its air and water and carries its own microbial community, and some microbes behave differently — occasionally more aggressively — in microgravity. Wounds may close more slowly, and the first-barrier skin can become more reactive. None of this is catastrophic on a short, well-supported mission near Earth, but for a multi-year journey to Mars with no resupply and no quick return, keeping the immune committee coordinated becomes a serious piece of the medical puzzle — and a window into how stress, sleep, and environment shape immunity for patients on Earth, too.",
      ],
    },
    keyTerms: [
      {
        term: "Immune dysregulation",
        definition:
          "A loss of normal balance and coordination in the immune system — some functions reduced, others heightened — rather than simple suppression.",
      },
      {
        term: "Latent virus reactivation",
        definition:
          "The reawakening of dormant viruses (e.g., EBV, VZV, CMV) that a healthy immune system normally keeps silent; common in spaceflight.",
      },
      {
        term: "Cytokines",
        definition:
          "Signaling molecules that coordinate immune cells. Their balance shifts in spaceflight, altering inflammation and defense.",
      },
      {
        term: "T lymphocytes (T cells)",
        definition:
          "Adaptive immune cells central to controlling viruses and coordinating responses; their function is altered in microgravity.",
      },
      {
        term: "Dermatome",
        definition:
          "A strip of skin served by a single spinal nerve. Shingles (reactivated VZV) classically produces a painful rash confined to one dermatome.",
      },
    ],
    misconceptions: [
      {
        myth: "Space simply weakens the immune system.",
        reality:
          "It dysregulates it — some defenses are blunted while others are over-activated and inflammation can rise. It's imbalance, not uniform weakening.",
      },
      {
        myth: "There are no germs in a clean spacecraft.",
        reality:
          "A sealed cabin carries its own microbiome from the crew and surfaces, and some microbes behave differently in microgravity.",
      },
      {
        myth: "Reactivated viruses in astronauts are always harmless.",
        reality:
          "Most shedding is silent, but reactivation can cause symptoms like shingles and is an important marker and risk on long missions.",
      },
    ],
    countermeasures: [
      {
        title: "Pre-flight screening & vaccination",
        body: "Crew health screening, immunization, and quarantine before launch reduce the chance of carrying an active infection into orbit.",
        status: "Standard practice",
      },
      {
        title: "Onboard medical kit",
        body: "Antivirals, antibiotics, and wound-care supplies let crew treat reactivations and infections in flight, guided by ground physicians.",
        status: "Standard practice",
      },
      {
        title: "Stress, sleep & exercise",
        body: "Because sleep loss and stress drive dysregulation, protecting rest and maintaining exercise are also indirect immune countermeasures.",
        status: "Standard practice",
      },
    ],
  },
  {
    slug: "medicine-far-from-earth",
    index: "07",
    title: "Medicine Far From Earth",
    subtitle: "Practicing care when there is no hospital",
    color: "ember",
    accent: "#ff6b3d",
    visual: "mission",
    summary:
      "On the ISS, a sick crew member can be home in hours. On the way to Mars, that option vanishes: no evacuation, a 20-minute comms delay, finite supplies, and a tiny medical kit. Exploration medicine is about delivering care autonomously, far beyond the reach of help.",
    duration: "9 min",
    facts: [
      { value: "~3–9 mo", label: "From the ISS escape window to Mars one-way" },
      { value: "20 min", label: "One-way communication delay at Mars" },
      { value: "0", label: "Resupply or evacuation once Mars-bound" },
      { value: "Finite", label: "Drugs, oxygen, and blood the crew can carry" },
    ],
    steps: [
      {
        tag: "Today",
        title: "Low Earth orbit has a safety net",
        body: "Aboard the ISS, the medical strategy leans on Earth. Serious illness or injury can trigger an emergency return in a matter of hours, ground physicians advise in real time, and supplies are replenished by regular cargo flights.",
        stat: { value: "Hours", label: "to return from the ISS" },
      },
      {
        tag: "The cliff",
        title: "Beyond the point of no return",
        body: "On a Mars trajectory, that safety net disappears. There is no quick way home, no resupply, and — because the spacecraft is millions of kilometers away — a communication delay of up to 20 minutes each way that makes real-time guidance impossible.",
        stat: { value: "20 min", label: "each-way comms delay" },
      },
      {
        tag: "Autonomy",
        title: "The crew becomes the hospital",
        body: "Care must therefore be delivered autonomously. A crew medical officer — often not a physician — must diagnose and treat with the supplies on board, supported by checklists, decision-support software, and stored expertise rather than a live specialist.",
      },
      {
        tag: "Microgravity care",
        title: "Medicine where everything floats",
        body: "Even basic procedures change without gravity. Fluids and blood form floating droplets, IV lines behave differently, chest compressions require restraint systems, and contamination control is harder. Surgery, if ever needed, would demand enclosed systems to keep fluids contained.",
      },
      {
        tag: "Resources",
        title: "Every gram and every dose counts",
        body: "Mass and volume are precious, so the medical kit is finite and carefully chosen. Medications also degrade over a multi-year mission, especially under radiation. Planners must anticipate the most likely and most dangerous problems and pack — and ration — accordingly.",
      },
    ],
    slider: {
      title: "Care delivery: low Earth orbit vs deep space",
      caption: "Drag to compare the medical safety net.",
      earthLabel: "ISS (near Earth)",
      spaceLabel: "Mars transit",
      earth: {
        headline: "Tethered to Earth's healthcare",
        points: [
          "Emergency return possible in hours",
          "Real-time advice from ground physicians",
          "Regular cargo resupply of medicine",
          "Backup if the medical kit falls short",
        ],
      },
      space: {
        headline: "On their own",
        points: [
          "No evacuation and no resupply",
          "Up to 20-minute communication delay",
          "Finite, slowly degrading supplies",
          "Crew must diagnose and treat autonomously",
        ],
      },
    },
    quiz: [
      {
        q: "What is the single biggest medical difference between the ISS and a Mars mission?",
        options: [
          "There is no gravity on the ISS but there is on Mars transit",
          "The loss of rapid evacuation, resupply, and real-time ground support",
          "Astronauts don't get sick on the ISS",
          "Mars missions carry unlimited supplies",
        ],
        answer: 1,
        explanation:
          "Low Earth orbit retains a safety net — fast return, resupply, and live advice. A Mars mission loses all three, forcing autonomous care.",
      },
      {
        q: "Why does a communication delay matter for in-flight medical care?",
        options: [
          "It doesn't; video calls are instant anywhere",
          "Up to 20 minutes each way makes real-time guidance from Earth impossible",
          "It only affects entertainment streaming",
          "Delays make medications work faster",
        ],
        answer: 1,
        explanation:
          "With a delay of up to 20 minutes each way, a crew cannot get live, back-and-forth direction during an emergency — they must act on their own with stored support tools.",
      },
      {
        q: "How does microgravity complicate hands-on medical care?",
        options: [
          "It makes all procedures easier",
          "Fluids float, IVs and CPR need restraints, and contamination is harder to control",
          "It has no effect on procedures",
          "It only changes how pills are swallowed",
        ],
        answer: 1,
        explanation:
          "Without gravity, blood and fluids form floating droplets, lines and compressions need restraint systems, and keeping a sterile field is far harder.",
      },
    ],
    case: {
      title: "Appendicitis, 80 million kilometers from home",
      scenario:
        "Four months into a Mars transit, a crew member develops worsening right-lower-quadrant abdominal pain, fever, and nausea. The crew medical officer suspects appendicitis. There is no surgeon aboard, no way to evacuate, and a 14-minute one-way communication delay to Earth.",
      vitals: [
        { label: "Pain", value: "RLQ, worsening" },
        { label: "Temp", value: "Febrile" },
        { label: "Evac", value: "Not possible" },
        { label: "Comms", value: "14 min each way" },
      ],
      question: "What does this scenario most clearly illustrate about exploration medicine?",
      options: [
        {
          label: "Care must be delivered autonomously, with pre-planned protocols, supplies, and conservative management",
          correct: true,
          feedback:
            "Correct — with no evacuation and delayed comms, the crew relies on onboard supplies, stored decision-support, and approaches like early antibiotics and conservative management. Anticipating and pre-planning for such events is the heart of exploration medicine.",
        },
        {
          label: "They should simply wait for an emergency return to Earth",
          correct: false,
          feedback:
            "Incorrect — on a Mars trajectory there is no rapid return; waiting for evacuation is not an option.",
        },
        {
          label: "Real-time surgical guidance from Earth will solve it",
          correct: false,
          feedback:
            "Incorrect — the communication delay makes live, step-by-step guidance impossible; the crew must act with what they have on hand.",
        },
      ],
      teaching:
        "Exploration medicine plans for autonomy: carefully chosen supplies, crew medical training, decision-support software, telemedicine within the delay's limits, and conservative strategies (e.g., antibiotics for appendicitis) when surgery isn't feasible. The guiding question is always 'what can the crew handle alone?'",
    },
    deepDive: {
      title: "When 'call for help' is no longer an option",
      paragraphs: [
        "Almost all of medicine quietly assumes a backstop: if a case exceeds what you can handle, you can transfer the patient, call a specialist, or order more supplies. Spaceflight medicine in low Earth orbit still enjoys a version of this. The International Space Station is, medically, an extension of Earth — a seriously ill astronaut can be back on the ground within hours, ground-based flight surgeons advise in real time, and cargo vehicles routinely top up the medical kit. The strategy is essentially to keep the patient stable long enough to bring Earth to them, or them to Earth.",
        "A mission to Mars erases that backstop entirely. Once the spacecraft commits to its trajectory, there is no turning around for months, no resupply, and a communication delay that grows to about twenty minutes each way — long enough that a real-time conversation, let alone live procedural guidance, is impossible. The crew is, for all practical purposes, the entire healthcare system: a designated medical officer (frequently not a trained physician) must recognize, diagnose, and treat whatever arises using only what was packed, supported by checklists and decision-support software rather than a specialist on the line.",
        "The physical environment makes even routine care unfamiliar. In microgravity, blood and fluids ball up and drift, intravenous lines and chest compressions require restraint systems, and maintaining a clean field is genuinely difficult; any future surgery would likely need an enclosed device to trap fluids. On top of this, mass and volume are rationed so tightly that the medical kit is finite and curated, and medications slowly degrade over a multi-year mission, accelerated by radiation. Exploration medicine is therefore as much about anticipation and systems design as about clinical skill — deciding in advance which problems to prepare for, how to empower a small autonomous crew, and how to do the most good with the least mass. It is one of the defining challenges standing between humanity and Mars.",
      ],
    },
    keyTerms: [
      {
        term: "Exploration medicine",
        definition:
          "The practice of delivering medical care on missions far from Earth, where evacuation, resupply, and real-time support are limited or absent.",
      },
      {
        term: "Communication delay (latency)",
        definition:
          "The time for a signal to travel between spacecraft and Earth — up to ~20 minutes each way at Mars — which prevents real-time medical guidance.",
      },
      {
        term: "Crew medical officer",
        definition:
          "A crew member trained to provide medical care aboard; on exploration missions they may not be a physician but must act autonomously.",
      },
      {
        term: "Autonomous care",
        definition:
          "Medical care delivered by the crew using onboard supplies and decision-support, without depending on real-time help from Earth.",
      },
      {
        term: "Decision-support software",
        definition:
          "Computer tools and checklists that guide diagnosis and treatment, partly substituting for a specialist when communication is delayed.",
      },
    ],
    misconceptions: [
      {
        myth: "If an astronaut gets seriously ill, they can always be flown home.",
        reality:
          "True near Earth, but on a Mars trajectory there is no rapid return — the crew must manage the problem themselves.",
      },
      {
        myth: "Doctors on Earth can guide any space emergency in real time.",
        reality:
          "Communication delays of up to 20 minutes each way at Mars make live, step-by-step guidance impossible.",
      },
      {
        myth: "A spacecraft can carry whatever medical supplies it might need.",
        reality:
          "Mass and volume are tightly rationed, the kit is finite and curated, and medications degrade over a multi-year mission.",
      },
    ],
    countermeasures: [
      {
        title: "Crew medical training",
        body: "Designated crew members train in diagnosis, procedures, and emergency care so the team can act autonomously when help is far away.",
        status: "Standard practice",
      },
      {
        title: "Telemedicine & decision support",
        body: "Checklists, ultrasound, and decision-support software extend expertise aboard, used within the limits of communication delay.",
        status: "In development",
      },
      {
        title: "Curated, stable supply kits",
        body: "Medical kits are tailored to likely and dangerous scenarios, with research into longer-shelf-life, radiation-tolerant medications.",
        status: "Research frontier",
      },
    ],
  },
];

export const getModule = (slug: string) =>
  MODULES.find((m) => m.slug === slug);

export const colorHex: Record<ModuleColor, string> = {
  cyan: "#38e1ff",
  vital: "#5dffc2",
  plasma: "#b06bff",
  solar: "#ffb23e",
  azure: "#4d8bff",
  magenta: "#ff5db1",
  ember: "#ff6b3d",
};
