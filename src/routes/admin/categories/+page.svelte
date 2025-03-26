<script lang="ts">
  import { onMount } from 'svelte';
  import { getCategories, addCategory, updateCategory, deleteCategory } from '$lib/firebase/categoryService';
  import type { Category } from '$lib/types';
  
  let categories: Category[] = [];
  let isLoading = true;
  let isEditing = false;
  let currentCategory: Category | null = null;
  
  // Form state
  let formName = '';
  let formSlug = '';
  let formDescription = '';
  
  onMount(async () => {
    try {
      await loadCategories();
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  });
  
  async function loadCategories() {
    isLoading = true;
    try {
      categories = await getCategories();
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      isLoading = false;
    }
  }
  
  function createNewCategory() {
    isEditing = true;
    currentCategory = null;
    formName = '';
    formSlug = '';
    formDescription = '';
  }
  
  function editCategory(category: Category) {
    isEditing = true;
    currentCategory = category;
    formName = category.name;
    formSlug = category.slug;
    formDescription = category.description;
  }
  
  function cancelEdit() {
    isEditing = false;
    currentCategory = null;
  }
  
  async function saveCategory() {
    if (!formName || !formSlug) return;
    
    try {
      if (currentCategory) {
        // Update existing category
        await updateCategory(currentCategory.id!, {
          name: formName,
          slug: formSlug,
          description: formDescription
        });
      } else {
        // Create new category
        await addCategory({
          name: formName,
          slug: formSlug,
          description: formDescription
        });
      }
      
      await loadCategories();
      isEditing = false;
      currentCategory = null;
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }
  
  async function handleDeleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category? This will NOT delete associated projects.')) {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  }
  
  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  $: if (formName && !currentCategory) {
    formSlug = generateSlug(formName);
  }
</script>

<svelte:head>
  <title>Category Management | Admin</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Category Management</h1>
      
      <div class="flex gap-4">
        <a href="/admin" class="btn btn-outline">Back to Dashboard</a>
        {#if !isEditing}
          <button class="btn btn-primary" on:click={createNewCategory}>
            Add New Category
          </button>
        {/if}
      </div>
    </div>
    
    {#if isEditing}
      <div class="card bg-base-100 shadow-lg mb-8">
        <div class="card-body">
          <h2 class="card-title mb-6">{currentCategory ? 'Edit Category' : 'Create New Category'}</h2>
          
          <form on:submit|preventDefault={saveCategory} class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label for="name" class="label">
                <span class="label-text">Name</span>
              </label>
              <input 
                type="text" 
                id="name" 
                bind:value={formName} 
                class="input input-bordered w-full" 
                required
              />
            </div>
            
            <div class="form-control">
              <label for="slug" class="label">
                <span class="label-text">Slug</span>
              </label>
              <input 
                type="text" 
                id="slug" 
                bind:value={formSlug} 
                class="input input-bordered w-full" 
                required
              />
            </div>
            
            <div class="form-control md:col-span-2">
              <label for="description" class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea 
                id="description" 
                bind:value={formDescription} 
                class="textarea textarea-bordered h-32" 
              ></textarea>
            </div>
            
            <div class="md:col-span-2 flex justify-end space-x-4">
              <button type="button" class="btn btn-ghost" on:click={cancelEdit}>
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Save Category
              </button>
            </div>
          </form>
        </div>
      </div>
    {:else if isLoading}
      <div class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
    {:else}
      <div class="card bg-base-100 shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each categories as category (category.id)}
                <tr>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td class="max-w-xs truncate">{category.description}</td>
                  <td>
                    <div class="flex space-x-2">
                      <button 
                        class="btn btn-sm btn-ghost" 
                        on:click={() => editCategory(category)}
                      >
                        Edit
                      </button>
                      <button 
                        class="btn btn-sm btn-ghost text-error" 
                        on:click={() => handleDeleteCategory(category.id!)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
              
              {#if categories.length === 0}
                <tr>
                  <td colspan="4" class="text-center py-8">
                    <p class="text-base-content/70">No categories found</p>
                    <button class="btn btn-primary btn-sm mt-4" on:click={createNewCategory}>
                      Add your first category
                    </button>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>