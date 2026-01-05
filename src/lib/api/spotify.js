// Spotify API endpoints
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

/**
 * Logger ind på Spotify som vores app og får et adgangsnøgle (token)
 * Tænk på det som:
 * - Vi sender vores app's "brugernavn og kodeord" til Spotify
 * - Spotify tjekker om det er rigtigt
 * - Spotify giver os en midlertidig nøgle (som et adgangskort)
 * - Nøglen kan vi bruge til at hente data i 1 time
 * 
 * Note: Vi henter en ny nøgle hver gang - kunne gemmes for bedre performance
 */
async function getAccessToken() {
  // Hent app's "brugernavn" og "kodeord" fra environment variables (hemmelige filer)
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Spotify kræver at vi kombinerer ID og Secret på en speciel måde:
  // 1. Kombiner til: "clientId:clientSecret"
  // 2. Konverter til bytes med Buffer (Node's måde at håndtere binær data)
  // 3. Encode til base64 (en standard måde at encode data til tekst)
  // Base64 er IKKE kryptering - mere som at oversætte til et andet alfabet
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Send login-request til Spotify
  const res = await fetch(TOKEN_URL, {
    method: "POST", // POST fordi vi sender data
    headers: {
      Authorization: `Basic ${basic}`, // Send vores encoded credentials
      "Content-Type": "application/x-www-form-urlencoded", // Format Spotify forventer
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }), // Fortæl Spotify det er en app (ikke en bruger)
  });

  const data = await res.json();
  return data.access_token; // Det er vores "adgangskort" - gyldig i 1 time
}

/**
 * Henter information om en artist fra Spotify
 */
export async function getArtist(artistId) {
  const token = await getAccessToken(); // Først: få adgangsnøgle
  
  // Hent artist data fra Spotify
  const res = await fetch(`${API_URL}/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` }, // "Bearer" = vi har et gyldigt adgangskort
    next: { revalidate: 300 }, // Next.js: gem resultatet i 5 minutter (undgå unødvendige API kald)
  });

  return res.json();
}

/**
 * Henter en artists mest populære sange fra Spotify
 * Hvorfor "market" (land) er vigtigt:
 * - Nogle sange er kun tilgængelige i visse lande (licensing rettigheder)
 * - Popularitet varierer per land (danske streams vs amerikanske streams)
 */
export async function getArtistTopTracks(artistId, market = "DK") {
  const token = await getAccessToken(); // Først: få adgangsnøgle
  
  // Hent top tracks fra Spotify
  const res = await fetch(`${API_URL}/artists/${artistId}/top-tracks?market=${market}`, {
    headers: { Authorization: `Bearer ${token}` }, // "Bearer" = vi har et gyldigt adgangskort
    next: { revalidate: 300 }, // Next.js: gem resultatet i 5 minutter
  });

  const data = await res.json();
  
  // Returnér sange, eller tom liste hvis der ingen er
  // Dette er "defensive programming" - undgå crashes hvis API'et fejler
  return data.tracks || [];
}