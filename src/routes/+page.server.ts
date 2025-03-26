import { getProjects, getFeaturedProjects } from '$lib/firebase/projectService';
import { getCategories } from '$lib/firebase/categoryService';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  const categorySlug = url.searchParams.get('category');

  try {
    const [projects, categories] = await Promise.all([
      getProjects(),
      getCategories()
    ]);

    return {
      projects,
      categories,
      categorySlug
    };
  } catch (err) {
    console.error('Error loading data:', err);
    return {
      projects: [],
      categories: [],
      categorySlug
    };
  }
};
