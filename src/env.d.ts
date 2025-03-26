interface ImportMetaEnv {
	VITE_SUPABASE_URL: string;
	VITE_SUPABASE_SERVICE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
