import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, serverTimestamp, getDoc } from 'firebase/firestore';
import type { Category } from '$lib/types';
import { parseDate } from './projectService';

const COLLECTION_NAME = 'categories';

// Add a new category
export async function addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...category,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...parseDate(doc.data())
    } as Category));
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

// Get category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Category;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting category:', error);
    throw error;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Category;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting category by slug:', error);
    throw error;
  }
}

// Update a category
export async function updateCategory(id: string, category: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...category,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

// Delete a category
export async function deleteCategory(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}
