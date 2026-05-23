import type { Doctor } from "../types/appointment.types";

/**
 * Dummy doctors data used by the appointment module.
 * Image URLs use the same `i.pravatar.cc` service the dashboard already uses
 * elsewhere, so no extra hosts need to be allow-listed.
 */
export const doctors: Doctor[] = [
  {
    id: "doc-001",
    name: "Dr. Ralph Edwards",
    image: "https://i.pravatar.cc/300?img=12",
    specialty: "Dermatologist",
    fee: 20,
    experience:
      "Over 10 years in clinical dermatology with a focus on acne, eczema, and autoimmune skin disorders.",
    rating: 4.5,
    about:
      "Dr. Edwards specialises in adult and adolescent dermatology, with a calm bedside manner and a research-backed approach.",
    specialties: [
      "General Dermatology",
      "Skin Allergy Treatment",
      "Acne & Scarring Care",
    ],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    reviews: [
      {
        id: "rev-001-a",
        reviewerName: "Sarah K.",
        rating: 4.5,
        comment:
          "Dr. Edwards was clear, caring and professional. My skin improved thanks to his treatment plan. Highly recommended!",
      },
      {
        id: "rev-001-b",
        reviewerName: "Daniel P.",
        rating: 5,
        comment:
          "Excellent diagnosis and follow-up. He took the time to explain everything.",
      },
    ],
  },
  {
    id: "doc-002",
    name: "Dr. Ronald Richards",
    image: "https://i.pravatar.cc/300?img=15",
    specialty: "Neurologist",
    fee: 20,
    experience:
      "12 years treating migraines, epilepsy, and movement disorders at tertiary care hospitals.",
    rating: 4.7,
    about:
      "Board-certified neurologist with a focus on chronic headache management and stroke prevention.",
    specialties: ["Migraine Management", "Epilepsy Care", "Stroke Prevention"],
    availability: ["Mon", "Wed", "Fri"],
    reviews: [
      {
        id: "rev-002-a",
        reviewerName: "Anna M.",
        rating: 5,
        comment: "Very thorough, listened patiently and explained the plan.",
      },
    ],
  },
  {
    id: "doc-003",
    name: "Dr. Albert Boje",
    image: "https://i.pravatar.cc/300?img=33",
    specialty: "Dentist",
    fee: 20,
    experience:
      "8 years in general and cosmetic dentistry, with a gentle approach for nervous patients.",
    rating: 4.3,
    about:
      "Focused on preventive care, cosmetic restoration, and pediatric-friendly procedures.",
    specialties: ["Cosmetic Dentistry", "Root Canal", "Teeth Whitening"],
    availability: ["Tue", "Thu", "Sat"],
    reviews: [
      {
        id: "rev-003-a",
        reviewerName: "Imran S.",
        rating: 4,
        comment: "Painless filling, friendly clinic staff.",
      },
    ],
  },
  {
    id: "doc-004",
    name: "Dr. Floyd Miles",
    image: "https://i.pravatar.cc/300?img=14",
    specialty: "Neurologist",
    fee: 20,
    experience: "9 years of clinical neurology across pediatric and adult cases.",
    rating: 4.4,
    about: "Special interest in pediatric neurology and sleep-related disorders.",
    specialties: ["Pediatric Neurology", "Sleep Disorders", "Neuropathy"],
    availability: ["Mon", "Tue", "Thu"],
    reviews: [
      {
        id: "rev-004-a",
        reviewerName: "Hina R.",
        rating: 4.5,
        comment: "Great with kids, calm and patient.",
      },
    ],
  },
  {
    id: "doc-005",
    name: "Dr. Leslie Alexander",
    image: "https://i.pravatar.cc/300?img=47",
    specialty: "Psychiatrist",
    fee: 20,
    experience:
      "11 years in adult psychiatry, with deep expertise in anxiety and mood disorders.",
    rating: 4.8,
    about:
      "Therapy-led psychiatric care with an emphasis on CBT and lifestyle plans.",
    specialties: ["Anxiety Disorders", "Mood Disorders", "Therapy Counseling"],
    availability: ["Mon", "Wed", "Fri"],
    reviews: [
      {
        id: "rev-005-a",
        reviewerName: "Owais T.",
        rating: 5,
        comment: "Truly life-changing sessions. Highly empathetic.",
      },
    ],
  },
  {
    id: "doc-006",
    name: "Prof. Brooklyn Crean",
    image: "https://i.pravatar.cc/300?img=53",
    specialty: "General Practitioner",
    fee: 30,
    experience:
      "20+ years in primary care with academic appointments at two teaching hospitals.",
    rating: 4.9,
    about:
      "Comprehensive family medicine, preventive screenings, and chronic care management.",
    specialties: ["Family Medicine", "Preventive Care", "Chronic Care"],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    reviews: [
      {
        id: "rev-006-a",
        reviewerName: "Mehwish A.",
        rating: 5,
        comment: "An incredible mentor and physician. Very thorough.",
      },
    ],
  },
  {
    id: "doc-007",
    name: "Dr. Courtney Henry",
    image: "https://i.pravatar.cc/300?img=11",
    specialty: "Cardiologist",
    fee: 20,
    experience: "14 years in interventional cardiology and heart failure care.",
    rating: 4.6,
    about: "Specialises in coronary interventions and lifestyle cardiology.",
    specialties: ["Interventional Cardiology", "Heart Failure", "Hypertension"],
    availability: ["Tue", "Thu"],
    reviews: [
      {
        id: "rev-007-a",
        reviewerName: "Bilal H.",
        rating: 4.5,
        comment: "Clear explanations and a strong follow-up plan.",
      },
    ],
  },
  {
    id: "doc-008",
    name: "Prof. Eleanor Pena",
    image: "https://i.pravatar.cc/300?img=44",
    specialty: "Psychiatrist",
    fee: 32,
    experience: "18 years in trauma-informed psychiatry and academic research.",
    rating: 4.9,
    about:
      "Trauma-informed care with a special focus on PTSD, OCD and behavioural therapy.",
    specialties: ["PTSD", "OCD", "Behavioural Therapy"],
    availability: ["Mon", "Wed", "Fri"],
    reviews: [
      {
        id: "rev-008-a",
        reviewerName: "Saima L.",
        rating: 5,
        comment: "She helped me through a very tough year. Forever grateful.",
      },
    ],
  },
  {
    id: "doc-009",
    name: "Dr. Chieko Chute",
    image: "https://i.pravatar.cc/300?img=49",
    specialty: "Pediatrician",
    fee: 22,
    experience: "10 years in pediatrics with a focus on newborn and toddler care.",
    rating: 4.7,
    about:
      "Gentle pediatric care, vaccination schedules, growth and developmental tracking.",
    specialties: ["Newborn Care", "Vaccinations", "Growth & Development"],
    availability: ["Tue", "Wed", "Sat"],
    reviews: [
      {
        id: "rev-009-a",
        reviewerName: "Faisal Q.",
        rating: 5,
        comment: "My toddler actually likes going to the doctor now!",
      },
    ],
  },
  {
    id: "doc-010",
    name: "Dr. Tyra Dhillon",
    image: "https://i.pravatar.cc/300?img=48",
    specialty: "Gynecologist",
    fee: 28,
    experience: "13 years in obstetrics, gynecology and fertility care.",
    rating: 4.6,
    about: "Comprehensive women's health from adolescence to menopause.",
    specialties: ["Obstetrics", "Fertility", "Menopause Care"],
    availability: ["Mon", "Thu", "Fri"],
    reviews: [
      {
        id: "rev-010-a",
        reviewerName: "Nimra B.",
        rating: 4.5,
        comment: "Kind, attentive and very professional throughout my pregnancy.",
      },
    ],
  },
  {
    id: "doc-011",
    name: "Dr. Marcus Hale",
    image: "https://i.pravatar.cc/300?img=68",
    specialty: "Orthopedic",
    fee: 26,
    experience:
      "15 years in orthopedic surgery with subspecialty in sports injuries.",
    rating: 4.5,
    about: "Sports medicine, joint replacement and post-injury rehabilitation.",
    specialties: ["Sports Injuries", "Joint Replacement", "Rehabilitation"],
    availability: ["Mon", "Wed", "Fri"],
    reviews: [
      {
        id: "rev-011-a",
        reviewerName: "Hamza K.",
        rating: 4.5,
        comment: "Helped me recover after an ACL tear. Very methodical.",
      },
    ],
  },
  {
    id: "doc-012",
    name: "Dr. Priya Patel",
    image: "https://i.pravatar.cc/300?img=45",
    specialty: "Dermatologist",
    fee: 24,
    experience: "9 years in cosmetic and medical dermatology.",
    rating: 4.4,
    about: "Acne, pigmentation, laser treatments and aesthetic dermatology.",
    specialties: ["Pigmentation", "Laser Treatment", "Aesthetic Dermatology"],
    availability: ["Tue", "Thu", "Sat"],
    reviews: [
      {
        id: "rev-012-a",
        reviewerName: "Areeba M.",
        rating: 4,
        comment: "Visible improvement in my pigmentation after 3 sessions.",
      },
    ],
  },
];

/**
 * Convenience selector — list of unique specialties found in the dataset.
 * Used to power the filter dropdown without hardcoding values twice.
 */
export const allSpecialties: string[] = Array.from(
  new Set(doctors.map((d) => d.specialty)),
).sort();
