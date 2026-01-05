// Importer Zustand, et state management bibliotek
import { create } from "zustand";
// Importer persist middleware for at gemme state i localStorage
import { persist } from "zustand/middleware";

// Eksporterer en hook kaldet useCartStore som bruges til at tilgå kurv-staten
export const useCartStore = create(
  // persist wrapper sikrer at kurven gemmes i browser localStorage
  persist(
    // set: funktion til at opdatere state | get: funktion til at læse current state
    (set, get) => ({
      // Initialiserer kurven som et tomt array
      cart: [],

      // Tilføjer produkt til kurven
      addToCart: (product) =>
        set((state) => {
          // Søger efter produktet i kurven ved at matche ID
          const existing = state.cart.find((item) => item.id === product.id);

          // Hvis produktet allerede er i kurven, øg mængden med 1
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          // Hvis produktet ikke eksisterer, tilføj det som nyt med quantity 1
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                price: product.price,
                quantity: 1,
              },
            ],
          };
        }),

      // Fjerner et produkt fra kurven ved at filtrere på produktID
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      // Opdaterer mængden af et produkt (minimum 1)
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? // Math.max sikrer mængden aldrig bliver under 1
                { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      // Øger mængden af et produkt med 1
      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Mindsker mængden af et produkt, eller fjerner det hvis mængden er 1
      decreaseQuantity: (productId) => {
        // Finder produktet i kurven
        const item = get().cart.find((item) => item.id === productId);

        // Hvis produktet eksisterer og mængden er 1, fjern det helt
        if (item && item.quantity === 1) {
          get().removeFromCart(productId);
        } else {
          // Ellers reducer mængden med 1
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }));
        }
      },

      // Tømmer hele kurven
      clearCart: () => set({ cart: [] }),

      // Beregner den samlede pris for alle produkter i kurven
      getCartTotal: () =>
        // reduce kombinerer alle produkters (pris × mængde) til en sum
        get().cart.reduce(
          (sum, product) => sum + (product.price * product.quantity || 0),
          0 // Starter med 0
        ),
    }),
    // localStorage nøgle hvor kurven gemmes
    {
      name: "cart-storage",
    }
  )
);
