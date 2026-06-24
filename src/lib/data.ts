import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  image: string;
  tag: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  duration: string;
  price: number;
  currency: string;
  destinations: string[];
  image: string;
  tag: string;
  includedServices: string[];
  featured: boolean;
}

export interface Transport {
  id: string;
  vehicleType: string;
  capacity: number;
  withDriver: boolean;
  pricePerDay: number;
  currency: string;
  image: string;
}

export async function getDestinations(): Promise<Destination[]> {
  const snap = await getDocs(collection(db, "destinations"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination));
}

export async function getTrips(): Promise<Trip[]> {
  const snap = await getDocs(collection(db, "trips"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trip));
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  const q = query(collection(db, "trips"), where("featured", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trip));
}

export async function getTransport(): Promise<Transport[]> {
  const snap = await getDocs(collection(db, "transport"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transport));
}