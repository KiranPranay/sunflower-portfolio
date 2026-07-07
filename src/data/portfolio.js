// ============================================================
//  Single source of truth for all portfolio content.
//  Edit here to update the whole site.
// ============================================================

export const profile = {
  name: 'Mohammad Muskan Sultana',
  firstName: 'Muskan',
  roles: [
    'Electrical & Electronics Engineering Student',
    'IoT Developer',
    'Patent Co-Inventor',
  ],
  tagline:
    'Electrical & Electronics Engineering Student · IoT Developer · Patent Co-Inventor',
  summary:
    'Motivated EEE student specializing in embedded systems, IoT automation, and renewable energy technologies. A patent co-inventor with hands-on industrial exposure in aerospace-grade thermal battery manufacturing.',
  highlights: [
    { value: '1', label: 'Published Patent', accent: 'rose' },
    { value: '3+', label: 'Hardware Projects', accent: 'sage' },
    { value: '7.09', label: 'B.Tech CGPA', accent: 'lilac' },
    { value: '4', label: 'Certifications', accent: 'butter' },
  ],
}

export const contact = {
  email: 'sumayatahreen25@gmail.com',
  linkedin: 'https://linkedin.com/in/muskansultana',
  linkedinLabel: 'linkedin.com/in/muskansultana',
  location: 'Hyderabad, India',
}

export const education = [
  {
    degree: 'B.Tech in Electrical & Electronics Engineering',
    org: 'BVRIT Hyderabad College of Engineering for Women',
    period: '2023 — Present',
    detail: 'CGPA: 7.09',
    status: 'current',
    accent: 'lilac',
  },
  {
    degree: 'Intermediate — MPC (Maths, Physics, Chemistry)',
    org: 'Sri Chaitanya College',
    period: '2023',
    detail: 'Pre-engineering foundation',
    status: 'done',
    accent: 'sage',
  },
  {
    degree: 'SSC — Secondary School Certificate',
    org: "St. Anthony's High School",
    period: '2021',
    detail: 'Schooling',
    status: 'done',
    accent: 'rose',
  },
]

export const experience = [
  {
    role: 'Production Line Intern',
    org: 'Renewable Energy Systems Ltd.',
    period: 'May 2025 — June 2025',
    division: 'Thermal Battery Manufacturing Division',
    points: [
      'Handled assembly operations, quality inspections, and machine handling on a live production line.',
      'Observed and worked within AS9001 aerospace-grade manufacturing workflows.',
      'Gained first-hand exposure to thermal battery production for high-reliability applications.',
    ],
    tags: ['Assembly Ops', 'Quality Inspection', 'AS9001', 'Machine Handling'],
  },
]

export const projects = [
  {
    id: 'smart-feed-pro',
    kind: 'Patent',
    icon: 'shield',
    title: 'Smart Feed Pro',
    subtitle: 'Adaptive Pet Feeding Apparatus with Infrared Sensing Mechanism',
    patentNo: 'Indian Patent Application No. 202541092954 A',
    published: 'Published Oct 2025',
    description:
      'A smart pet feeder built on Arduino UNO with an IR sensor and servo motor, using adaptive dispensing logic to serve food precisely when the pet approaches.',
    stack: ['Arduino UNO', 'IR Sensor', 'Servo Motor', 'Adaptive Logic'],
    accent: 'rose',
    illustration: 'feeder',
  },
  {
    id: 'greenhouse',
    kind: 'IoT System',
    icon: 'leaf',
    title: 'IoT Greenhouse Automation',
    subtitle: 'Real-time climate & soil monitoring with automated actuation',
    description:
      'An ESP32-driven greenhouse that reads DHT22, MQ135, and soil-moisture sensors, then automates irrigation and ventilation through relays for continuous, real-time monitoring.',
    stack: ['ESP32', 'DHT22', 'MQ135', 'Soil Moisture', 'Relays'],
    accent: 'sage',
    illustration: 'greenhouse',
  },
  {
    id: 'energy-park',
    kind: 'Renewable Prototype',
    icon: 'zap',
    title: 'Sustainable Energy Park',
    subtitle: 'Piezoelectric flooring + solar with microcontroller storage',
    role: 'Team Lead',
    description:
      'A renewable-energy model that harvests power from piezoelectric flooring and solar systems, coordinated by a microcontroller-based storage and management unit.',
    stack: ['Piezoelectric', 'Solar', 'Microcontroller', 'Energy Storage'],
    accent: 'butter',
    illustration: 'solar',
  },
]

export const skills = [
  {
    group: 'Programming',
    icon: 'code',
    accent: 'lilac',
    items: ['Python', 'C', 'Java'],
  },
  {
    group: 'Embedded Systems',
    icon: 'cpu',
    accent: 'sage',
    items: ['Arduino', 'ESP32', 'Raspberry Pi'],
  },
  {
    group: 'Tools',
    icon: 'wrench',
    accent: 'butter',
    items: ['MATLAB', 'Simulink', 'Arduino IDE', 'Tinkercad'],
  },
  {
    group: 'Core Areas',
    icon: 'sparkles',
    accent: 'rose',
    items: ['IoT Systems', 'Automation', 'Renewable Energy'],
  },
]

export const certifications = [
  {
    title: 'Semiconductor Fabrication 101',
    issuer: 'Purdue University, UT Austin & Intel',
    icon: 'chip',
    accent: 'lilac',
  },
  {
    title: 'Energy Literacy Training',
    issuer: 'Energy Swaraj Foundation',
    icon: 'battery',
    accent: 'sage',
  },
  {
    title: 'Workshop on Generative AI',
    issuer: 'IIT Hyderabad',
    icon: 'brain',
    accent: 'rose',
  },
  {
    title: 'Pointers in C Programming',
    issuer: 'Infosys Springboard',
    icon: 'terminal',
    accent: 'butter',
  },
]

export const leadership = [
  {
    title: 'Team Lead',
    org: 'Smart India Hackathon & Renewable Energy Projects',
    blurb:
      'Led cross-functional student teams through hackathon builds and renewable-energy prototypes end to end.',
    icon: 'crown',
    accent: 'butter',
  },
  {
    title: 'Media & Content Team',
    org: 'IEEE Student Chapter',
    blurb:
      'Created media and content driving engagement across the campus IEEE community.',
    icon: 'megaphone',
    accent: 'lilac',
  },
  {
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code 2025',
    blurb:
      'Contributed to open-source projects during GSSoC 2025, collaborating with maintainers worldwide.',
    icon: 'git',
    accent: 'sage',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Lab' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Badges' },
  { id: 'contact', label: 'Contact' },
]

// Map a semantic accent name -> concrete pastel tailwind/color tokens.
// Components import this so accent colors stay perfectly consistent.
// All class strings are full literals so Tailwind's JIT always emits them.
export const accentMap = {
  rose: {
    text: 'text-rose-500',
    bg: 'bg-rose-400',
    softBg: 'bg-rose-100',
    border: 'border-rose-300',
    ring: 'ring-rose-300',
    shadow: 'shadow-cute',
    from: 'from-rose-300',
    to: 'to-rose-500',
    hex: '#fb6f9e',
    soft: 'rgba(255,135,171,0.20)',
    emoji: '🌸',
  },
  lilac: {
    text: 'text-lilac-500',
    bg: 'bg-lilac-400',
    softBg: 'bg-lilac-100',
    border: 'border-lilac-300',
    ring: 'ring-lilac-300',
    shadow: 'shadow-cute-lilac',
    from: 'from-lilac-300',
    to: 'to-lilac-500',
    hex: '#9d7fe8',
    soft: 'rgba(180,157,240,0.22)',
    emoji: '💜',
  },
  butter: {
    text: 'text-butter-600',
    bg: 'bg-butter-400',
    softBg: 'bg-butter-100',
    border: 'border-butter-300',
    ring: 'ring-butter-300',
    shadow: 'shadow-cute-butter',
    from: 'from-butter-300',
    to: 'to-butter-500',
    hex: '#f7be3f',
    soft: 'rgba(255,206,84,0.28)',
    emoji: '⭐',
  },
  sage: {
    text: 'text-sage-600',
    bg: 'bg-sage-400',
    softBg: 'bg-sage-100',
    border: 'border-sage-300',
    ring: 'ring-sage-300',
    shadow: 'shadow-cute-sage',
    from: 'from-sage-300',
    to: 'to-sage-500',
    hex: '#54bd89',
    soft: 'rgba(120,205,163,0.26)',
    emoji: '🌿',
  },
  peach: {
    text: 'text-peach-500',
    bg: 'bg-peach-400',
    softBg: 'bg-peach-100',
    border: 'border-peach-300',
    ring: 'ring-peach-300',
    shadow: 'shadow-cute-peach',
    from: 'from-peach-300',
    to: 'to-peach-500',
    hex: '#fb805c',
    soft: 'rgba(255,154,120,0.24)',
    emoji: '🍑',
  },
}
