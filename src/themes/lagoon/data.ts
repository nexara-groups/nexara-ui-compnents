/** Client content for the Lagoon showcase: Tidewell Clinic, a fictional family clinic in Bengaluru. */

export const clinic = {
  name: 'Tidewell',
  legal: 'Tidewell Family Clinic',
  phone: '080 4718 2290',
  tel: '+918047182290',
  whatsapp: '+91 98450 61172',
  address: ['42, 12th Main Road', 'HAL 2nd Stage, Indiranagar', 'Bengaluru 560038'],
  landmark: 'Opposite the Indiranagar metro pillar 112, gate on the side lane',
  hours: [
    { days: 'Monday to Friday', time: '8:00 am – 9:00 pm' },
    { days: 'Saturday', time: '8:00 am – 6:00 pm' },
    { days: 'Sunday', time: '9:00 am – 1:00 pm, paediatrics only' },
  ],
}

export type Doctor = {
  id: string
  name: string
  role: string
  focus: string
  years: number
  languages: string
  next: string
  photo: string
  fee: number
}

export const doctors: Doctor[] = [
  { id: 'meera', name: 'Dr. Meera Iyer', role: 'Family medicine', focus: 'Diabetes, thyroid and blood pressure care that you can actually keep up with.', years: 14, languages: 'English, Tamil, Kannada', next: 'Today, 4:20 pm', photo: 'dr-meera.jpg', fee: 600 },
  { id: 'arjun', name: 'Dr. Arjun Rao', role: 'Paediatrics', focus: 'Newborn checks, fevers at odd hours and the vaccination calendar.', years: 11, languages: 'English, Kannada, Telugu', next: 'Today, 5:40 pm', photo: 'dr-arjun.jpg', fee: 700 },
  { id: 'sana', name: 'Dr. Sana Qureshi', role: 'Physiotherapy', focus: 'Back, neck and knee rehab for desk workers and weekend runners.', years: 9, languages: 'English, Hindi, Urdu', next: 'Tomorrow, 8:30 am', photo: 'dr-sana.jpg', fee: 800 },
  { id: 'kavya', name: 'Dr. Kavya Menon', role: "Women's health", focus: 'PCOS, pregnancy planning and menopause, without the rush.', years: 12, languages: 'English, Malayalam, Hindi', next: 'Tomorrow, 11:10 am', photo: 'dr-kavya.jpg', fee: 750 },
]

export const services = [
  { id: 'family', title: 'Family medicine', body: 'Coughs, fevers, BP, sugar and the questions you have been saving up. One doctor who knows your history.', meta: 'From ₹600 · 20 min', icon: 'stethoscope' },
  { id: 'kids', title: "Children's health", body: 'Same-day slots for fevers and rashes, growth checks and the full IAP vaccine schedule.', meta: 'Sunday mornings open', icon: 'kid' },
  { id: 'women', title: "Women's health", body: 'PCOS, fertility planning, antenatal visits and menopause care.', meta: 'Women doctors only', icon: 'women' },
  { id: 'physio', title: 'Physiotherapy', body: 'Assessment, a home plan and supervised sessions for back, neck and sports injuries.', meta: '45 min sessions', icon: 'physio' },
  { id: 'lab', title: 'Lab and diagnostics', body: 'Blood tests drawn on site from 7:30 am. Most reports on your phone by 6 pm.', meta: 'Home pickup ₹150', icon: 'lab' },
  { id: 'vaccines', title: 'Vaccinations', body: 'Flu, HPV, typhoid and travel vaccines. Cold chain logged every hour.', meta: 'Walk in, no slot needed', icon: 'vaccine' },
] as const

export const steps = [
  { title: 'Pick a slot', body: 'Choose a doctor and a time. You get an SMS with a token number, not a vague “come around 5”.' },
  { title: 'Check in from the lobby', body: 'Reply 1 to the SMS when you arrive. No clipboard, no queue at the desk.' },
  { title: 'Twenty unhurried minutes', body: 'Every consult is booked for 20 minutes, so there is time for the second question.' },
  { title: 'Everything after, on your phone', body: 'Prescription, lab reports and the follow-up date arrive the same evening.' },
]

export const plans = [
  { id: 'consult', name: 'Consult', price: '₹600', unit: 'per visit', blurb: 'A 20 minute visit with a family doctor.', items: ['Same-day slots most days', 'Prescription on your phone', 'Free follow-up within 7 days'], cta: 'Book a consult' },
  { id: 'check', name: 'Health check', price: '₹1,850', unit: 'one time', blurb: 'Bloods, ECG and a 30 minute review of the results.', items: ['CBC, lipids, HbA1c, thyroid, kidney and liver', 'ECG and BMI on the same morning', 'Results walkthrough with Dr. Meera', 'Diet note from our nutritionist'], cta: 'Book a health check', featured: true },
  { id: 'family', name: 'Family year', price: '₹2,400', unit: 'per year', blurb: 'Up to four people, one calendar of care.', items: ['Consults at ₹300 for everyone', 'Two physio sessions included', 'Priority evening slots', 'Vaccine reminders for kids'], cta: 'Start a family plan' },
]

export const faqs = [
  { q: 'Do you accept insurance?', a: 'Yes. We work with most group health policies on a reimbursement basis and give you an itemised GST invoice for every visit. Cashless outpatient cover depends on your insurer; call the front desk with your policy number and we will check before you come in.' },
  { q: 'Can I walk in without booking?', a: 'You can, and we will see you. Booked patients go first, so a walk-in wait is usually 20 to 40 minutes in the evening and shorter in the morning.' },
  { q: 'Is there parking?', a: 'There are six spots in the side lane and plenty of two-wheeler space. The metro station is a four minute walk.' },
  { q: 'What if my child gets sick on a Sunday?', a: 'Dr. Arjun or a paediatric colleague is in every Sunday from 9 am to 1 pm. Outside clinic hours, call 112 for emergencies.' },
  { q: 'How do I get my reports?', a: 'Reports and prescriptions arrive as a secure link by SMS. You can also collect a printed copy from the desk.' },
]

export const quotes = [
  { body: 'My son screams at the sight of a clinic. Dr. Arjun had him laughing before the injection was over. We have not gone anywhere else since.', who: 'Priya S.', where: 'Parent, HSR Layout' },
  { body: 'Booked at 8 am, seen at 8:10, report on my phone by lunch. I did not know a clinic could run like this.', who: 'Rahul D.', where: 'Patient since 2023' },
]

export type QueueRow = {
  token: string
  name: string
  age: number
  reason: string
  doctor: string
  status: 'Waiting' | 'In room' | 'Done' | 'Late' | 'Lab'
  wait: number
  booked: string
}

export const queue: QueueRow[] = [
  { token: 'A-21', name: 'Lakshmi Narayan', age: 58, reason: 'BP review', doctor: 'Dr. Meera Iyer', status: 'In room', wait: 9, booked: '4:00 pm' },
  { token: 'P-14', name: 'Vihaan Kulkarni', age: 4, reason: 'Fever, 2 days', doctor: 'Dr. Arjun Rao', status: 'Waiting', wait: 14, booked: '4:10 pm' },
  { token: 'A-22', name: 'Farhan Siddiqui', age: 33, reason: 'Lab results', doctor: 'Dr. Meera Iyer', status: 'Waiting', wait: 6, booked: '4:20 pm' },
  { token: 'W-08', name: 'Ananya Bhat', age: 29, reason: 'Antenatal, 24 wk', doctor: 'Dr. Kavya Menon', status: 'Lab', wait: 18, booked: '4:20 pm' },
  { token: 'P-15', name: 'Ira Thomas', age: 7, reason: 'MMR booster', doctor: 'Dr. Arjun Rao', status: 'Late', wait: 0, booked: '4:30 pm' },
  { token: 'PT-05', name: 'Suresh Gowda', age: 46, reason: 'Lower back, session 3', doctor: 'Dr. Sana Qureshi', status: 'Waiting', wait: 3, booked: '4:40 pm' },
  { token: 'A-20', name: 'Deepa Raman', age: 61, reason: 'Thyroid follow-up', doctor: 'Dr. Meera Iyer', status: 'Done', wait: 11, booked: '3:40 pm' },
]

export const hourly = {
  today: [3, 6, 8, 8, 5, 4, 3, 5, 7, 9, 8, 6, 4],
  week: [38, 46, 52, 49, 44, 41, 37, 45, 55, 61, 58, 48, 33],
  labels: ['8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'],
}

export const reasons = [
  { value: 'fever', label: 'Fever or cold', hint: 'Family medicine', group: 'Unwell' },
  { value: 'child-fever', label: 'My child is unwell', hint: 'Paediatrics', group: 'Unwell' },
  { value: 'bp', label: 'Blood pressure or sugar review', hint: 'Family medicine', group: 'Ongoing care' },
  { value: 'thyroid', label: 'Thyroid follow-up', hint: 'Family medicine', group: 'Ongoing care' },
  { value: 'back', label: 'Back or neck pain', hint: 'Physiotherapy', group: 'Pain' },
  { value: 'knee', label: 'Knee or sports injury', hint: 'Physiotherapy', group: 'Pain' },
  { value: 'pcos', label: 'Periods, PCOS or fertility', hint: "Women's health", group: "Women's health" },
  { value: 'antenatal', label: 'Pregnancy visit', hint: "Women's health", group: "Women's health" },
  { value: 'vaccine', label: 'Vaccination', hint: 'Any doctor', group: 'Prevention' },
  { value: 'check', label: 'Full health check', hint: '₹1,850 package', group: 'Prevention' },
]

export const reasonDoctor: Record<string, string> = {
  fever: 'meera',
  'child-fever': 'arjun',
  bp: 'meera',
  thyroid: 'meera',
  back: 'sana',
  knee: 'sana',
  pcos: 'kavya',
  antenatal: 'kavya',
  vaccine: 'arjun',
  check: 'meera',
}

export const slots = ['8:30 am', '9:10 am', '10:40 am', '11:20 am', '4:20 pm', '5:00 pm', '5:40 pm', '6:20 pm', '7:00 pm']

export function asset(name: string) {
  return `${import.meta.env.BASE_URL}themes/lagoon/${name}`
}
