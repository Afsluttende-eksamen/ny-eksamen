/**
 * Valideringsregler for vores formularer (bruger Zod library)
 * 
 * Zod tjekker data når programmet kører (runtime checking).
 * Det sikrer at den email vi får faktisk er en rigtig email.
 * 
 * Bruges to steder:
 * - I browseren: Hurtig feedback til brugeren
 * - På serveren: Sikkerhed (vi kan ikke stole på browseren)
 */
import { z } from 'zod';

/**
 * Regel for newsletter tilmelding
 * 
 * Tjekker at:
 * - email er en tekst (string)
 * - email har rigtigt format (indeholder @, har domæne, etc.)
 * 
 * Hvis fejl: Brugeren ser beskeden 'Indtast en gyldig email adresse'
 */
export const NewsletterFormSchema = z.object({
  email: z.string().email('Indtast en gyldig email adresse')
});
