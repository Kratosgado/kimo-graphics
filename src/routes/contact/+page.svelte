<script>
  import { contact } from '$lib/details';
  
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let isSubmitting = false;
  let isSubmitted = false;
  let error = null;
  
  // Form validation
  $: isValid = name.trim() !== '' && 
               email.trim() !== '' && 
               isValidEmail(email) && 
               message.trim() !== '';
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  async function handleSubmit() {
    if (!isValid) return;
    
    isSubmitting = true;
    error = null;
    
    try {
      // In a real app, you would send this data to your server
      // For this example, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      isSubmitted = true;
      name = '';
      email = '';
      subject = '';
      message = '';
    } catch (err) {
      error = 'There was an error sending your message. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact | DesignStudio</title>
  <meta name="description" content="Get in touch for project inquiries, collaborations, or just to say hello." />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl md:text-4xl font-bold mb-8">Contact</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div>
        <div class="prose prose-lg max-w-none mb-8">
          <p>{contact.contactMessage}</p>
        </div>
        
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-semibold mb-2">Email</h2>
            <p class="text-primary">{contact.email}</p>
          </div>
          
          <div>
            <h2 class="text-lg font-semibold mb-2">Phone</h2>
            <p>{contact.phone}</p>
          </div>
          
          <div>
            <h2 class="text-lg font-semibold mb-2">Location</h2>
            <p>{contact.location}</p>
          </div>
          
          <div>
            <h2 class="text-lg font-semibold mb-2">Social</h2>
            <div class="flex space-x-4">
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                  <rect x="2" y="2"  stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                </svg>
              </a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        {#if isSubmitted}
          <div class="bg-success/10 border border-success/30 rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-success mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-xl font-bold mb-2">Message Sent!</h2>
            <p class="mb-4">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              class="btn btn-primary" 
              on:click={() => isSubmitted = false}
            >
              Send another message
            </button>
          </div>
        {:else}
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div class="form-control">
              <label for="name" class="label">
                <span class="label-text">Name</span>
              </label>
              <input 
                type="text" 
                id="name" 
                bind:value={name} 
                class="input input-bordered w-full" 
                required
              />
            </div>
            
            <div class="form-control">
              <label for="email" class="label">
                <span class="label-text">Email</span>
              </label>
              <input 
                type="email" 
                id="email" 
                bind:value={email} 
                class="input input-bordered w-full" 
                required
              />
              {#if email && !isValidEmail(email)}
                <label class="label">
                  <span class="label-text-alt text-error">Please enter a valid email address</span>
                </label>
              {/if}
            </div>
            
            <div class="form-control">
              <label for="subject" class="label">
                <span class="label-text">Subject</span>
              </label>
              <input 
                type="text" 
                id="subject" 
                bind:value={subject} 
                class="input input-bordered w-full"
              />
            </div>
            
            <div class="form-control">
              <label for="message" class="label">
                <span class="label-text">Message</span>
              </label>
              <textarea 
                id="message" 
                bind:value={message} 
                class="textarea textarea-bordered h-32" 
                required
              ></textarea>
            </div>
            
            {#if error}
              <div class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            {/if}
            
            <button 
              type="submit" 
              class="btn btn-primary w-full" 
              disabled={!isValid || isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm mr-2"></span>
                Sending...
              {:else}
                Send Message
              {/if}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
