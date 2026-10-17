import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

export const isFirebaseConfigured = Boolean(
  apiKey && projectId && !apiKey.includes('YourApiKey')
);

// Initialize Firebase safely (Singleton pattern)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (typeof window !== 'undefined' || isFirebaseConfigured) {
  try {
    if (isFirebaseConfigured) {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
    }
  } catch (error) {
    console.warn('[Firebase] Initialization deferred or failed:', error);
  }
}

export { app, db, auth };

// ==============================================================================
// FIRESTORE DATABASE SERVICE HELPERS
// ==============================================================================

export interface FirestoreOrder {
  id?: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  place: string;
  district?: string;
  state?: string;
  pin?: string;
  country?: string;
  productName: string;
  finish: string;
  quantity: number;
  totalPrice: number;
  status: 'QUEUED' | 'RIP_PROCESSING' | 'PRINTING' | 'CUTTING' | 'QUALITY_CHECK' | 'DISPATCHED';
  createdAt?: any;
}

/**
 * Add a new order to the 'orders' Firestore collection
 */
export async function addOrderToFirestore(order: Omit<FirestoreOrder, 'id' | 'createdAt'>): Promise<string | null> {
  if (!db) {
    console.info('[Firebase] Firestore not configured. Order saved to local state.');
    return null;
  }
  try {
    const ordersCol = collection(db, 'orders');
    const docRef = await addDoc(ordersCol, {
      ...order,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[Firebase] Error saving order to Firestore:', error);
    return null;
  }
}

/**
 * Real-time listener for incoming orders
 */
export function subscribeToOrders(onUpdate: (orders: FirestoreOrder[]) => void): () => void {
  if (!db) return () => {};
  try {
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as FirestoreOrder[];
      onUpdate(orders);
    });
    return unsubscribe;
  } catch (error) {
    console.error('[Firebase] Subscription error:', error);
    return () => {};
  }
}

/**
 * Update order production status in Firestore
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  newStatus: FirestoreOrder['status']
): Promise<boolean> {
  if (!db) return false;
  try {
    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('[Firebase] Error updating order status:', error);
    return false;
  }
}
