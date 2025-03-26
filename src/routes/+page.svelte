<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import type { Project, Category } from '$lib/types';
  
  export let data: PageData;
  
  let projects = data.projects;
  let categories = data.categories;
  let categorySlug = data.categorySlug;
  
  $: filteredProjects = filterProjects(projects, categorySlug);
  
  function filterProjects(projects: Project[], categorySlug: string | null): Project[] {
    if (!categorySlug || categorySlug === 'all') {
      return projects;
    }
    
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return projects;
    
    return projects.filter(project => project.categoryId === category.id);
  }
  
  let isLoaded = false;
  
  onMount(() => {
    isLoaded = true;
  });
</script>

<svelte:head>
  <title>DesignStudio | Creative Portfolio</title>
  <meta name="description" content="Portfolio of a professional graphic designer specializing in branding, web design, print, and illustration." />
</svelte:head>

<section class="container mx-auto px-4 py-12">
  <h1 class="sr-only">Design Portfolio</h1>
  
  {#if isLoaded}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" in:fade={{ duration: 500, delay: 200 }}>
      {#each filteredProjects as project, i (project.id)}
        <a 
          href="/projects/{project.slug}" 
          class="group"
          in:fly={{ y: 20, duration: 400, delay: 150 + i * 50 }}
        >
          <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <figure class="aspect-[4/3] overflow-hidden">
              <img 
                src={project.images && project.images.length > 0 ? project.images[0].base64 : "/placeholder.svg?height=600&width=800"} 
                alt={project.title} 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{project.title}</h2>
              <div class="flex justify-between text-sm text-base-content/70">
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>
              <div class="mt-2">
                <span class="badge badge-primary">{project.category}</span>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="flex justify-center items-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
  {/if}
  
  {#if filteredProjects.length === 0}
    <div class="text-center py-20">
      <h2 class="text-2xl font-bold mb-4">No projects found</h2>
      <p class="text-base-content/70 mb-6">No projects match the selected category.</p>
      <a href="/" class="btn btn-primary">View all projects</a>
    </div>
  {/if}
</section>