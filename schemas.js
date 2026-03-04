/**
 * ghostenv Platform Schemas
 * Standardized mapping for popular development platforms.
 */
const SCHEMAS = {
  supabase: {
    url: ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL'],
    anonKey: ['SUPABASE_ANON_KEY', 'SUPABASE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    serviceRole: ['SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_KEY']
  },
  github: {
    token: ['GITHUB_TOKEN', 'GH_TOKEN', 'GITHUB_PAT', 'GH_PAT', 'GH_ACCESS_TOKEN'],
    webhookSecret: ['GITHUB_WEBHOOK_SECRET', 'GH_WEBHOOK_SECRET']
  },
  cloudflare: {
    apiToken: ['CLOUDFLARE_API_TOKEN', 'CF_API_TOKEN', 'CF_TOKEN'],
    apiKey: ['CLOUDFLARE_API_KEY', 'CF_API_KEY', 'CLOUDFLARE_GLOBAL_KEY'],
    accountId: ['CLOUDFLARE_ACCOUNT_ID', 'CF_ACCOUNT_ID'],
    zoneId: ['CLOUDFLARE_ZONE_ID', 'CF_ZONE_ID']
  },
  stripe: {
    secretKey: ['STRIPE_SECRET_KEY', 'STRIPE_SK'],
    publishableKey: ['STRIPE_PUBLISHABLE_KEY', 'STRIPE_PK', 'NEXT_PUBLIC_STRIPE_PK'],
    webhookSecret: ['STRIPE_WEBHOOK_SECRET']
  },
  vercel: {
    token: ['VERCEL_TOKEN', 'VC_TOKEN'],
    teamId: ['VERCEL_TEAM_ID', 'VC_TEAM_ID'],
    projectId: ['VERCEL_PROJECT_ID', 'VC_PROJECT_ID']
  },
  aws: {
    accessKeyId: ['AWS_ACCESS_KEY_ID', 'AWS_ACCESS_KEY'],
    secretAccessKey: ['AWS_SECRET_ACCESS_KEY', 'AWS_SECRET_KEY'],
    region: ['AWS_REGION', 'AWS_DEFAULT_REGION']
  },
  firebase: {
    apiKey: ['FIREBASE_API_KEY'],
    projectId: ['FIREBASE_PROJECT_ID', 'GCP_PROJECT_ID'],
    appId: ['FIREBASE_APP_ID'],
    databaseUrl: ['FIREBASE_DATABASE_URL']
  },
  netlify: {
    token: ['NETLIFY_AUTH_TOKEN', 'NETLIFY_TOKEN'],
    siteId: ['NETLIFY_SITE_ID']
  },
  render: {
    apiKey: ['RENDER_API_KEY'],
    serviceId: ['RENDER_SERVICE_ID']
  },
  openai: {
    apiKey: ['OPENAI_API_KEY', 'OPENAI_TOKEN'],
    orgId: ['OPENAI_ORG_ID']
  },
  hf: {
    token: ['HF_TOKEN', 'HUGGINGFACE_TOKEN', 'HUGGINGFACE_API_KEY']
  },
  google: {
    apiKey: ['GOOGLE_API_KEY'],
    credentials: ['GOOGLE_APPLICATION_CREDENTIALS']
  },
  anthropic: {
    apiKey: ['ANTHROPIC_API_KEY']
  },
  twilio: {
    accountSid: ['TWILIO_ACCOUNT_SID'],
    authToken: ['TWILIO_AUTH_TOKEN']
  },
  database: {
    url: ['DATABASE_URL', 'MONGODB_URI', 'POSTGRES_URL', 'REDIS_URL'],
    password: ['DB_PASSWORD', 'PGPASSWORD']
  },
  resend: {
    apiKey: ['RESEND_API_KEY']
  }
};

/**
 * Identify which platform a key belongs to and what its normalized name should be.
 */
function identifyKey(envKey) {
  for (const [platform, fields] of Object.entries(SCHEMAS)) {
    for (const [normalized, aliases] of Object.entries(fields)) {
      if (aliases.includes(envKey)) {
        return { platform, normalized };
      }
    }
  }
  return null;
}

module.exports = { SCHEMAS, identifyKey };
