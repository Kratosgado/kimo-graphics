<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicOut, elasticOut } from 'svelte/easing';
  import type { PageData } from './$types';
  import type { ImageData } from '$lib/types';

  export let data: PageData;
  
  let project = data.project;
  let imagesLoaded = false;
  let selectedImage: ImageData | null = null;
  let isLightboxOpen = false;

  function openLightbox(image: ImageData) {
    selectedImage = image;
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }

  function closeLightbox() {
    isLightboxOpen = false;
    document.body.style.overflow = ''; // Restore scrolling
  }

  onMount(() => {
    setTimeout(() => {
      imagesLoaded = true;
    }, 300); // Small delay for smoother animation sequence
  });
</script>

<svelte:head>
  <title>{project.title} | DesignStudio</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto">
    <a href="/" class="inline-flex items-center mb-8 text-sm font-medium hover:text-primary transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to all projects
    </a>
    
    <h1 class="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div>
        <h2 class="text-sm font-semibold text-base-content/70 mb-1">Client</h2>
        <p class="text-lg">{project.client}</p>
      </div>
      <div>
        <h2 class="text-sm font-semibold text-base-content/70 mb-1">Year</h2>
        <p class="text-lg">{project.year}</p>
      </div>
      <div>
        <h2 class="text-sm font-semibold text-base-content/70 mb-1">Category</h2>
        <span class="badge badge-primary">{project.category}</span>
      </div>
    </div>
    
    <div class="prose prose-lg max-w-none mb-12">
      <p>{project.description}</p>
      
      {#if project.challenge}
        <h2>The Challenge</h2>
        <p>{project.challenge}</p>
      {/if}
      
      {#if project.solution}
        <h2>The Solution</h2>
        <p>{project.solution}</p>
      {/if}
    </div>
  </div>
  
  <!-- Image Gallery with Tiles -->
  <div class="max-w-7xl mx-auto mb-16">
    {#if project.images && project.images.length > 0}
      <div class="image-grid">
        {#each project.images as image, i}
          {#if imagesLoaded}
            <div 
              class="image-tile {image.size}" 
              in:fly={{ y: 20, duration: 800, delay: 100 + i * 100, easing: cubicOut }}
              on:click={() => openLightbox(image)}
            >
              <div class="image-container">
                <img 
                  src={image.base64 || "/placeholder.svg"} 
                  alt={image.originalName || `Project image ${i+1}`} 
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div class="image-overlay">
                  <div class="zoom-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {:else}
      <div class="flex justify-center items-center py-20">
        <p class="text-base-content/70">No images available for this project.</p>
      </div>
    {/if}
  </div>
  
  <!-- Lightbox -->
  {#if isLightboxOpen && selectedImage}
    <div 
      class="lightbox-overlay" 
      on:click={closeLightbox}
      transition:fade={{ duration: 300 }}
    >
      <div 
        class="lightbox-content" 
        on:click|stopPropagation
        transition:scale={{ duration: 400, easing: elasticOut, start: 0.95 }}
      >
        <button class="lightbox-close" on:click={closeLightbox}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img 
          src={selectedImage.base64 || "/placeholder.svg"} 
          alt={selectedImage.originalName || "Project image"} 
          class="lightbox-image"
        />
      </div>
    </div>
  {/if}
  
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">More Projects</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- This would be dynamically populated with related projects -->
      <a href="/" class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <figure class="aspect-[4/3] overflow-hidden">
          <img 
            src="/placeholder.svg?height=600&width=800" 
            alt="View more projects" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </figure>
        <div class="card-body">
          <h3 class="card-title">View All Projects</h3>
          <p class="text-base-content/70">Explore our complete portfolio</p>
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  /* Image Grid Styles */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    grid-auto-flow: dense;
    gap: 16px;
  }
  
  .image-tile {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .image-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .image-tile.small {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .image-tile.medium {
    grid-column: span 2;
    grid-row: span 1;
  }
  
  .image-tile.large {
    grid-column: span 2;
    grid-row: span 2;
  }
  
  /* Make sure small tiles take full width on mobile */
  @media (max-width: 640px) {
    .image-grid {
      grid-template-columns: 1fr;
    }
    
    .image-tile.small,
    .image-tile.medium,
    .image-tile.large {
      grid-column: span 1;
      grid-row: span 1;
    }
  }
  
  /* Medium screens */
  @media (min-width: 641px) and (max-width: 1024px) {
    .image-tile.large {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
  
  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .image-tile:hover .image-container img {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .image-tile:hover .image-overlay {
    background: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  
  .zoom-icon {
    color: white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 10px;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  }
  
  .image-tile:hover .zoom-icon {
    transform: scale(1);
  }
  
  /* Lightbox Styles */
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }
  
  .lightbox-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
  }
</style>