<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getProjects,
		addProject,
		updateProject,
		deleteProject,
		getImages
	} from '$lib/firebase/projectService';
	import { getCategories } from '$lib/firebase/categoryService';
	import { processImageFiles } from '$lib/utils/imageUtils';
	import type { Project, Category, ImageData } from '$lib/types';

	let projects: Project[] = [];
	let categories: Category[] = [];
	let isLoading = true;
	let isEditing = false;
	let currentProject: Project | null = null;

	// Form state
	let formTitle = '';
	let formSlug = '';
	let formCategoryId = '';
	let formClient = '';
	let formYear = new Date().getFullYear();
	let formFeatured = false;
	let formDescription = '';
	let formChallenge = '';
	let formSolution = '';
	let formImages: ImageData[] = [];

	// File upload state
	let fileInput: HTMLInputElement;
	let isUploading = false;
	let uploadProgress = 0;
	let uploadError = '';

	onMount(async () => {
		try {
			await Promise.all([loadProjects(), loadCategories()]);
		} catch (error) {
			console.error('Error loading data:', error);
		}
	});

	async function loadProjects() {
		isLoading = true;
		try {
			projects = await getProjects();
		} catch (error) {
			console.error('Error loading projects:', error);
		} finally {
			isLoading = false;
		}
	}

	async function loadCategories() {
		try {
			categories = await getCategories();
		} catch (error) {
			console.error('Error loading categories:', error);
		}
	}

	function getCategoryNameById(id: string): string {
		const category = categories.find((c) => c.id === id);
		return category ? category.name : 'Unknown';
	}

	async function editProject(project: Project) {
		isEditing = true;
		currentProject = project;
		formTitle = project.title;
		formSlug = project.slug;
		formCategoryId = project.categoryId;
		formClient = project.client;
		formYear = project.year;
		formFeatured = project.featured;
		formDescription = project.description || '';
		formChallenge = project.challenge || '';
		formSolution = project.solution || '';
		formImages = (await getImages(project.id!)) || [];
	}

	function createNewProject() {
		isEditing = true;
		currentProject = null;
		formTitle = '';
		formSlug = '';
		formCategoryId = categories.length > 0 ? categories[0].id! : '';
		formClient = '';
		formYear = new Date().getFullYear();
		formFeatured = false;
		formDescription = '';
		formChallenge = '';
		formSolution = '';
		formImages = [];
	}

	function cancelEdit() {
		isEditing = false;
		currentProject = null;
		uploadError = '';
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		isUploading = true;
		uploadProgress = 0;
		uploadError = '';

		try {
			// Simulate progress
			const progressInterval = setInterval(() => {
				uploadProgress = Math.min(uploadProgress + 10, 90);
			}, 200);

			const newImages = await processImageFiles(target.files);
			formImages = [...formImages, ...newImages];
			console.log(newImages);
			clearInterval(progressInterval);
			uploadProgress = 100;

			// Reset file input
			if (fileInput) fileInput.value = '';

			setTimeout(() => {
				isUploading = false;
				uploadProgress = 0;
			}, 1000);
		} catch (error) {
			console.error('Error processing images:', error);
			uploadError = 'Failed to process images. Please try again.';
			isUploading = false;
		}
	}

	function removeImage(index: number) {
		const img = formImages[index];
		formImages[index] = { ...img!, status: 'deleted' };
	}

	async function saveProject() {
		if (!formTitle || !formSlug || !formCategoryId) return;

		try {
			const projectData = {
				title: formTitle,
				slug: formSlug,
				category: getCategoryNameById(formCategoryId),
				categoryId: formCategoryId,
				client: formClient,
				year: formYear,
				featured: formFeatured,
				description: formDescription,
				challenge: formChallenge,
				solution: formSolution,
				images: formImages
			};

			if (currentProject) {
				await updateProject(currentProject.id!, projectData);
			} else {
				await addProject(projectData);
			}

			await loadProjects();
			isEditing = false;
			currentProject = null;
		} catch (error) {
			console.error('Error saving project:', error);
		}
	}

	async function handleDeleteProject(id: string) {
		if (confirm('Are you sure you want to delete this project?')) {
			try {
				await deleteProject(id);
				await loadProjects();
			} catch (error) {
				console.error('Error deleting project:', error);
			}
		}
	}

	function generateSlug(title: string) {
		return title
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	}

	$: if (formTitle && !currentProject) {
		formSlug = generateSlug(formTitle);
	}
</script>

<svelte:head>
	<title>Project Management | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<div class="max-w-6xl mx-auto">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold">Project Management</h1>

			<div class="flex gap-4">
				<a href="/admin/categories" class="btn btn-outline">Manage Categories</a>
				{#if !isEditing}
					<button class="btn btn-primary" on:click={createNewProject}> Add New Project </button>
				{/if}
			</div>
		</div>

		{#if isEditing}
			<div class="card bg-base-100 shadow-lg mb-8">
				<div class="card-body">
					<h2 class="card-title mb-6">{currentProject ? 'Edit Project' : 'Create New Project'}</h2>

					<form
						on:submit|preventDefault={saveProject}
						class="grid grid-cols-1 md:grid-cols-2 gap-6"
					>
						<div class="form-control">
							<label for="title" class="label">
								<span class="label-text">Title</span>
							</label>
							<input
								type="text"
								id="title"
								bind:value={formTitle}
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

						<div class="form-control">
							<label for="category" class="label">
								<span class="label-text">Category</span>
							</label>
							<select
								id="category"
								bind:value={formCategoryId}
								class="select select-bordered w-full"
								required
							>
								<option value="" disabled>Select a category</option>
								{#each categories as category}
									<option value={category.id}>{category.name}</option>
								{/each}
							</select>

							{#if categories.length === 0}
								<label class="label">
									<span class="label-text-alt text-error"
										>No categories available. <a href="/admin/categories" class="underline"
											>Create a category first</a
										>.</span
									>
								</label>
							{/if}
						</div>

						<div class="form-control">
							<label for="client" class="label">
								<span class="label-text">Client</span>
							</label>
							<input
								type="text"
								id="client"
								bind:value={formClient}
								class="input input-bordered w-full"
								required
							/>
						</div>

						<div class="form-control">
							<label for="year" class="label">
								<span class="label-text">Year</span>
							</label>
							<input
								type="number"
								id="year"
								bind:value={formYear}
								min="2000"
								max="2030"
								class="input input-bordered w-full"
								required
							/>
						</div>

						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Featured Project</span>
								<input
									type="checkbox"
									bind:checked={formFeatured}
									class="checkbox checkbox-primary"
								/>
							</label>
						</div>

						<div class="form-control md:col-span-2">
							<label for="description" class="label">
								<span class="label-text">Description</span>
							</label>
							<textarea
								id="description"
								bind:value={formDescription}
								class="textarea textarea-bordered h-32"
								required
							></textarea>
						</div>

						<div class="form-control md:col-span-2">
							<label for="challenge" class="label">
								<span class="label-text">Challenge</span>
							</label>
							<textarea
								id="challenge"
								bind:value={formChallenge}
								class="textarea textarea-bordered h-32"
							></textarea>
						</div>

						<div class="form-control md:col-span-2">
							<label for="solution" class="label">
								<span class="label-text">Solution</span>
							</label>
							<textarea
								id="solution"
								bind:value={formSolution}
								class="textarea textarea-bordered h-32"
							></textarea>
						</div>

						<div class="form-control md:col-span-2">
							<label class="label">
								<span class="label-text">Project Images</span>
							</label>

							<div class="grid grid-cols-1 gap-4 mb-4">
								<div class="border-2 border-dashed border-base-300 rounded-lg p-6 text-center">
									<input
										type="file"
										id="images"
										bind:this={fileInput}
										on:change={handleFileUpload}
										accept="image/*"
										multiple
										class="hidden"
									/>

									<label for="images" class="btn btn-outline w-full max-w-xs mx-auto mb-4">
										{#if isUploading}
											<span class="loading loading-spinner loading-sm mr-2"></span>
											Uploading...
										{:else}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 mr-2"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
													clip-rule="evenodd"
												/>
											</svg>
											Select Images
										{/if}
									</label>

									{#if isUploading}
										<div class="w-full max-w-xs mx-auto">
											<progress
												class="progress progress-primary w-full"
												value={uploadProgress}
												max="100"
											></progress>
										</div>
									{:else}
										<p class="text-sm text-base-content/70">
											Drag and drop images here or click to browse
										</p>
										<p class="text-xs text-base-content/50 mt-2">
											Supported formats: JPG, PNG, GIF, WebP
										</p>
									{/if}

									{#if uploadError}
										<div class="alert alert-error mt-4">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-6 w-6 shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>{uploadError}</span>
										</div>
									{/if}
								</div>
							</div>

							{#if formImages.length > 0}
								<div class="image-grid">
									{#each formImages as image, i}
										{#if image.status !== 'deleted'}
											<div class="image-tile {image.size}">
												<div class="image-container">
													<img
														src={image.base64 || '/placeholder.svg'}
														alt={image.originalName}
														class="w-full h-full object-cover"
													/>
													<div class="image-overlay">
														<button
															type="button"
															class="btn btn-circle btn-sm btn-error"
															on:click={() => removeImage(i)}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="h-5 w-5"
																viewBox="0 0 20 20"
																fill="currentColor"
															>
																<path
																	fill-rule="evenodd"
																	d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																	clip-rule="evenodd"
																/>
															</svg>
														</button>
													</div>
												</div>
											</div>
										{/if}
									{/each}
								</div>
							{/if}
						</div>

						<div class="md:col-span-2 flex justify-end space-x-4">
							<button type="button" class="btn btn-ghost" on:click={cancelEdit}> Cancel </button>
							<button
								type="submit"
								class="btn btn-primary"
								disabled={!formTitle || !formSlug || !formCategoryId || categories.length === 0}
							>
								Save Project
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
								<th>Title</th>
								<th>Category</th>
								<th>Client</th>
								<th>Year</th>
								<th>Featured</th>
								<th>Images</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each projects as project (project.id)}
								<tr>
									<td>{project.title}</td>
									<td>
										<span class="badge badge-primary">{project.category}</span>
									</td>
									<td>{project.client}</td>
									<td>{project.year}</td>
									<td>
										{#if project.featured}
											<span class="text-success">✓</span>
										{:else}
											<span class="text-base-content/30">-</span>
										{/if}
									</td>
									<td>
										<span class="badge badge-neutral">{project.images?.length || 0}</span>
									</td>
									<td>
										<div class="flex space-x-2">
											<button class="btn btn-sm btn-ghost" on:click={() => editProject(project)}>
												Edit
											</button>
											<button
												class="btn btn-sm btn-ghost text-error"
												on:click={() => handleDeleteProject(project.id!)}
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							{/each}

							{#if projects.length === 0}
								<tr>
									<td colspan="7" class="text-center py-8">
										<p class="text-base-content/70">No projects found</p>
										<button class="btn btn-primary btn-sm mt-4" on:click={createNewProject}>
											Add your first project
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

<style>
	/* Image Grid Styles */
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-auto-rows: 150px;
		grid-auto-flow: dense;
		gap: 16px;
		margin-top: 16px;
	}

	.image-tile {
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

	.image-container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.image-tile:hover .image-overlay {
		opacity: 1;
	}
</style>
