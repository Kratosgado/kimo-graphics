import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, serverTimestamp, getDoc, Timestamp } from 'firebase/firestore';
import type { Project } from '$lib/types';

const COLLECTION_NAME = 'projects';
const IMAGE_COLLECTION = 'images';

export function parseDate<T = Project>(data: any): T {
  for (const [k, v] of Object.entries<any>(data)) {
    if (v instanceof Timestamp) {
      data[k] = v.toDate();
    }
  }
  return data;
}

export async function addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...parseDate(doc.data())
    }));
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
}

export async function getProjectsByCategoryId(categoryId: string): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('categoryId', '==', categoryId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  } catch (error) {
    console.error('Error getting projects by category:', error);
    throw error;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...parseDate(docSnap.data()) } as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...parseDate(doc.data()) } as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting project by slug:', error);
    throw error;
  }
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('featured', '==', true));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  } catch (error) {
    console.error('Error getting featured projects:', error);
    throw error;
  }
}
