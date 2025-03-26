import { assets } from "$app/paths";

export const contact = {
	name: 'Andy Gyan',
	university: 'Kwame Nkrumah University Of Science And Technology',
	bio: 'This is me',
	phone: '+2332343234',
	location: 'Kumasi',
	contactMessage:
		"I'm always interested in hearing about new projects and opportunities. Whether you have a specific project in mind or just want to say hello, feel free to get in touch.",
	email: 'andygyan20@gmail.com',
	social: {
		facebook: 'dfd',
		instagram: 'dhfd',
		pinterest: 'pinterest.com'
	}
};

export const skills = [
	{
		category: 'Design',
		items: [
			'Brand Identity',
			'UI/UX Design',
			'Typography',
			'Print Design',
			'Packaging',
			'Illustration'
		]
	},
	{
		category: 'Software',
		items: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Procreate', 'Cinema 4D', 'After Effects']
	},
	{
		category: 'Other',
		items: [
			'Art Direction',
			'Project Management',
			'Client Communication',
			'Design Strategy',
			'Photography'
		]
	}
];

// Experience data
export const experience = [
	{
		position: 'Senior Designer',
		company: 'Creative Agency XYZ',
		period: '2020 - Present',
		description:
			'Lead designer for major client accounts, overseeing brand identity projects and digital campaigns.'
	},
	{
		position: 'Designer',
		company: 'Design Studio ABC',
		period: '2017 - 2020',
		description:
			'Worked on a variety of projects including web design, print materials, and brand identities.'
	},
	{
		position: 'Junior Designer',
		company: 'Marketing Firm 123',
		period: '2015 - 2017',
		description: 'Assisted senior designers with various design tasks and client presentations.'
	}
];
// This would typically come from your CMS or API
export const projects = [
	{
		id: 1,
		title: 'Brand Identity for Eco Startup',
		slug: 'eco-startup-branding',
		category: 'branding',
		thumbnail: "/assets/flyers/ELLAvote.png",
		client: 'GreenTech Solutions',
		year: 2023
	},
	{
		id: 2,
		title: 'E-commerce Website Redesign',
		slug: 'ecommerce-redesign',
		category: 'books',
		thumbnail: '/assets/books/APCESbook.png',
		client: 'Fashion Forward',
		year: 2023
	},
	{
		id: 3,
		title: 'Annual Report Design',
		slug: 'annual-report',
		category: 'print',
		thumbnail: '/favicon.png?height=600&width=800',
		client: 'Global Finance Corp',
		year: 2022
	},
	{
		id: 4,
		title: 'Mobile App UI/UX',
		slug: 'mobile-app-ui',
		category: 'web',
		thumbnail: '/favicon.png?height=600&width=800',
		client: 'HealthTrack',
		year: 2023
	},
	{
		id: 5,
		title: 'Product Packaging',
		slug: 'product-packaging',
		category: 'print',
		thumbnail: '/favicon.png?height=600&width=800',
		client: 'Organic Foods',
		year: 2022
	},
	{
		id: 6,
		title: 'Character Illustrations',
		slug: 'character-illustrations',
		category: 'illustration',
		thumbnail: '/favicon.png?height=600&width=800',
		client: "Children's Book Publisher",
		year: 2023
	}
];

export type Project = typeof projects[0];
export type Contact = typeof contact;
export type Skill = typeof skills[0]
export type Experienct = typeof experience[0]
