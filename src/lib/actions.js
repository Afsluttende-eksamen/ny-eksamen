/**
 * Next.js Server Action til newsletter tilmelding
 * 
 * 'use server' directive betyder:
 * - Denne fil kører KUN på serveren (aldrig i browseren)
 * - API keys eksponeres aldrig til client
 * - Next.js genererer automatisk HTTP endpoint
 */
'use server';

import { NewsletterFormSchema } from '@/lib/schemas';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Konfigurer Mailchimp med credentials fra environment variables
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY, // Secret API key
  server: process.env.MAILCHIMP_SERVER_PREFIX // Server region (fx 'us12')
});

/**
 * Tilmelder en bruger til nyhedsbrevet via Mailchimp
 * Flow:
 * 1. Validér email format med Zod (server-side sikkerhed)
 * 2. Kald Mailchimp API for at tilføje subscriber
 * 3. Håndter errors (duplicate, network, etc.)
 * 4. Returnér brugervenlig besked
 */
export async function subscribe(data) {

  // Validér email med Zod schema
  // safeParse() thrower ikke - returnerer result object
  const result = NewsletterFormSchema.safeParse(data);
  if (result.error) {
    // Returnér brugervenlig fejlbesked
    return { error: 'Indtast en gyldig email adresse' };
  }

  try {
    const { email } = result.data; // Extract valideret email
    
    // Tilføj subscriber til Mailchimp audience
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed' // Single opt-in - aktiv med det samme (ingen bekræftelses-email)
    });

    return { success: true };
  } catch (error) {
    // Log fejl til server console (debugging)
    console.error('Subscribe error:', error);
    
    // Håndter specifikt duplicate subscriber
    // Mailchimp returnerer status 400 med 'Member Exists' titel
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return { error: 'Denne email er allerede tilmeldt.' };
    }
    
    // Generic fejlbesked for alle andre errors (network, credentials, etc.)
    return { error: 'Der opstod en fejl. Prøv igen senere.' };
  }
}
