/**
 * Newsletter tilmeldings formular
 * 
 * Hvad den gør:
 * - Viser en formular hvor brugeren kan indtaste email
 * - Sender email til vores server når brugeren klikker "Tilmeld"
 * - Viser beskeder (grøn ved success, rød ved fejl)
 * 
 * 'use client' betyder:
 * - Denne kode kører i brugerens browser (ikke på serveren)
 * - Vi bruger React hooks (useState) som kun virker i browser
 * - Vi håndterer user input og klik
 */
'use client';

import { useState } from 'react';
import { toast } from 'sonner'; // Library til at vise popup-beskeder (toasts)
import { subscribe } from '@/lib/actions'; // Vores server-funktion
import Button from './ui/Button';

export default function NewsletterForm() {
  // State = data komponenten husker mens den er åben
  const [email, setEmail] = useState(''); // Email brugeren har indtastet
  const [isLoading, setIsLoading] = useState(false); // Er vi ved at sende data?

  /**
   * Kører når brugeren klikker "Tilmeld"
   * 
   * @param {Event} e - Browser event fra formularen
   * 
   * Hvad der sker:
   * 1. Stop browserens normale adfærd (den ville normalt reloade siden)
   * 2. Vis "loading" state (disable knappen så brugeren ikke kan klikke igen)
   * 3. Send email til serveren
   * 4. Vent på svar fra serveren
   * 5. Vis besked til brugeren (success eller fejl)
   */
  const submit = async (e) => {
    e.preventDefault(); // Stop browserens default (reload side)
    setIsLoading(true); // Disable knap og input mens vi venter

    // Send email til server - Next.js håndterer forbindelsen automatisk
    const result = await subscribe({ email });

    if (result?.error) {
      // Serveren returnerede en fejl - vis den til brugeren
      const errorMessage = typeof result.error === 'string' 
        ? result.error // Brug serverens besked (fx "Denne email er allerede tilmeldt")
        : 'Der opstod en fejl! Prøv igen.'; // Backup besked
      
      toast.error(errorMessage); // Vis rød popup-besked
    } else {
      // Success! Vis grøn popup-besked og tøm input-feltet
      toast.success('Du er nu tilmeldt nyhedsbrevet!');
      setEmail(''); // Ryd email feltet
    }

    setIsLoading(false); // Enable knap og input igen
  };

  return (
    <section className="p-8 rounded-lg max-w-2xl mx-auto my-12">
      <div>
        <h4 className="text-2xl font-bold mb-2">Tilmeld dig vores nyhedsbrev</h4>
        <p className="mb-6">
          Få de seneste nyheder og opdateringer direkte i din indbakke
        </p>
      </div>

      <form
        onSubmit={submit}
        className="flex flex-col items-center sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            id="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#4F649B] rounded-md"
            disabled={isLoading}
            required
          />
        </div>

        <Button variant="primary" disabled={isLoading}>
          {isLoading ? 'Tilmelder...' : 'Tilmeld'}
        </Button>
      </form>
    </section>
  );
}
