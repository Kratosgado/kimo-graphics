<script>
	import { experience, skills } from "$lib/details";

</script>

<svelte:head>
  <title>About | DesignStudio</title>
  <meta name="description" content="Learn more about the designer behind DesignStudio - expertise, experience, and approach to design." />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl md:text-4xl font-bold mb-8">About</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="md:col-span-2">
        <div class="prose prose-lg max-w-none">
          <p class="text-xl font-medium mb-6">I'm a graphic designer with over 8 years of experience creating meaningful design solutions for brands with purpose.</p>
          
          <p>My approach to design is rooted in the belief that good design should communicate clearly, evoke emotion, and solve problems. I work closely with clients to understand their unique challenges and create tailored solutions that help them connect with their audience.</p>
          
          <p>Based in New York City, I've had the privilege of working with clients ranging from startups to established brands across various industries. My work has been recognized by design publications and has received several industry awards.</p>
          
          <p>When I'm not designing, you can find me exploring art galleries, photographing urban landscapes, or experimenting with new creative techniques.</p>
        </div>
      </div>
      
      <div>
        <div class="aspect-[3/4] overflow-hidden rounded-lg mb-4">
          <img 
            src="/favicon.png?height=800&width=600" 
            alt="Portrait of the designer" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex space-x-4 justify-center">
          <a href="#" class="text-base-content/70 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
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
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div>
        <h2 class="text-2xl font-bold mb-6">Skills</h2>
        
        <div class="space-y-8">
          {#each skills as skillGroup}
            <div>
              <h3 class="text-lg font-semibold mb-3">{skillGroup.category}</h3>
              <ul class="grid grid-cols-2 gap-2">
                {#each skillGroup.items as skill}
                  <li class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    {skill}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
      
      <div>
        <h2 class="text-2xl font-bold mb-6">Experience</h2>
        
        <div class="space-y-8">
          {#each experience as job}
            <div>
              <h3 class="text-lg font-semibold">{job.position}</h3>
              <p class="text-primary font-medium">{job.company}</p>
              <p class="text-sm text-base-content/70 mb-2">{job.period}</p>
              <p>{job.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <div class="bg-base-200 rounded-lg p-8 text-center">
      <h2 class="text-2xl font-bold mb-4">Let's work together</h2>
      <p class="mb-6 max-w-lg mx-auto">Interested in collaborating on a project? I'm currently available for select freelance work.</p>
      <a href="/contact" class="btn btn-primary">Get in touch</a>
    </div>
  </div>
</div>
