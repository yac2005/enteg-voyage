import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const destinations = [
  {
    slug: "djanet",
    name: "Djanet",
    region: "Tamanrasset",
    description: "Porte du Tassili N'Ajjer, paysages lunaires et gravures rupestres millénaires.",
    image: "/images/destinations/djanet.jpg",
    tag: "Sahara",
  },
  {
    slug: "ghardaia",
    name: "Ghardaïa",
    region: "Vallée du M'Zab",
    description: "Architecture mozabite unique, classée patrimoine mondial de l'UNESCO.",
    image: "/images/destinations/ghardaia.jpg",
    tag: "Patrimoine",
  },
  {
    slug: "taghit",
    name: "Taghit",
    region: "Béchar",
    description: "Dunes dorées, palmeraie luxuriante et ksar ancestral au cœur du désert.",
    image: "/images/destinations/taghit.jpg",
    tag: "Désert",
  },
  {
    slug: "oran",
    name: "Oran",
    region: "Ouest algérien",
    description: "Ville cosmopolite, architecture coloniale et culture raï au bord de la Méditerranée.",
    image: "/images/destinations/oran.jpg",
    tag: "Ville",
  },
  {
    slug: "constantine",
    name: "Constantine",
    region: "Nord-Est",
    description: "La ville des ponts suspendus, perchée sur ses falaises vertigineuses.",
    image: "/images/destinations/constantine.jpg",
    tag: "Ville",
  },
  {
    slug: "tlemcen",
    name: "Tlemcen",
    region: "Nord-Ouest",
    description: "Capitale de la culture islamique, mosquées et médersas d'exception.",
    image: "/images/destinations/tlemcen.jpg",
    tag: "Culture",
  },
];

const trips = [
  {
    slug: "sahara-djanet-7j",
    title: "Sahara Profond — Djanet",
    duration: "7 jours",
    price: 85000,
    currency: "DZD",
    destinations: ["Djanet", "Tassili N'Ajjer"],
    image: "/images/trips/djanet-trip.jpg",
    tag: "Voyage organisé",
    includedServices: ["Visa", "Transport", "Hébergement", "Guide"],
    featured: true,
  },
  {
    slug: "mzab-ghardaia-4j",
    title: "Vallée du M'Zab — Ghardaïa",
    duration: "4 jours",
    price: 45000,
    currency: "DZD",
    destinations: ["Ghardaïa", "Beni Isguen", "Melika"],
    image: "/images/trips/ghardaia-trip.jpg",
    tag: "Patrimoine",
    includedServices: ["Transport", "Hébergement", "Guide"],
    featured: true,
  },
  {
    slug: "taghit-desert-5j",
    title: "Désert & Dunes — Taghit",
    duration: "5 jours",
    price: 55000,
    currency: "DZD",
    destinations: ["Taghit", "Béchar", "Beni Abbes"],
    image: "/images/trips/taghit-trip.jpg",
    tag: "Aventure",
    includedServices: ["Transport", "Hébergement", "Chameau"],
    featured: true,
  },
  {
    slug: "nord-culture-6j",
    title: "Grand Tour du Nord",
    duration: "6 jours",
    price: 70000,
    currency: "DZD",
    destinations: ["Oran", "Tlemcen", "Constantine"],
    image: "/images/trips/nord-trip.jpg",
    tag: "Culture",
    includedServices: ["Transport", "Hébergement", "Guide"],
    featured: true,
  },
];

const transport = [
  {
    vehicleType: "4x4 Toyota Land Cruiser",
    capacity: 7,
    withDriver: true,
    pricePerDay: 15000,
    currency: "DZD",
    image: "/images/transport/landcruiser.jpg",
  },
  {
    vehicleType: "Minibus",
    capacity: 15,
    withDriver: true,
    pricePerDay: 18000,
    currency: "DZD",
    image: "/images/transport/minibus.jpg",
  },
  {
    vehicleType: "Berline",
    capacity: 4,
    withDriver: false,
    pricePerDay: 8000,
    currency: "DZD",
    image: "/images/transport/berline.jpg",
  },
  {
    vehicleType: "SUV",
    capacity: 5,
    withDriver: false,
    pricePerDay: 10000,
    currency: "DZD",
    image: "/images/transport/suv.jpg",
  },
];

export async function seedFirestore() {
  // seed destinations
  const destSnap = await getDocs(collection(db, "destinations"));
  if (destSnap.empty) {
    for (const d of destinations) {
      await addDoc(collection(db, "destinations"), d);
    }
    console.log("Destinations seeded.");
  }

  // seed trips
  const tripsSnap = await getDocs(collection(db, "trips"));
  if (tripsSnap.empty) {
    for (const t of trips) {
      await addDoc(collection(db, "trips"), t);
    }
    console.log("Trips seeded.");
  }

  // seed transport
  const transportSnap = await getDocs(collection(db, "transport"));
  if (transportSnap.empty) {
    for (const v of transport) {
      await addDoc(collection(db, "transport"), v);
    }
    console.log("Transport seeded.");
  }
}