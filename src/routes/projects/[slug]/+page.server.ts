import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/firebase/projectService';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const project = await getProjectBySlug(params.slug);
    
    if (!project) {
      throw error(404, 'Project not found');
    }
    
    return {
      project
    };
  } catch (err) {
    console.error('Error loading project:', err);
    throw error(500, 'Failed to load project');
  }
};