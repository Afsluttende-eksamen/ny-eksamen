/**
 * Next.js API Route til Spotify top tracks
 * 
 * Dette er et "proxy" endpoint mellem vores browser og Spotify API
 * 
 * Hvorfor vi har det:
 * - SpotifyArtistSection er en Client Component (kører i browseren)
 * - Client Components kan ikke bruge environment variables (API keys)
 * - Så vi laver et endpoint browseren kan kalde: /api/spotify/top-tracks
 * - Dette endpoint kører på serveren og kan safe kalde Spotify
 * 
 * URL eksempel: /api/spotify/top-tracks?artistId=123&market=DK&limit=5
 */
import { getArtistTopTracks } from "@/lib/api/spotify";

/**
 * Håndterer GET requests til dette endpoint
 * 
 * Flow:
 * 1. Parse query parameters fra URL'en
 * 2. Hent tracks fra Spotify (via vores wrapper funktion)
 * 3. Begræns antal tracks baseret på limit parameter
 * 4. Send JSON tilbage til browseren
 */
export async function GET(request) {
  // Parse URL og hent query parameters
  // Eksempel URL: /api/spotify/top-tracks?artistId=123&limit=5
  const { searchParams } = new URL(request.url);
  
  // Hent artistId fra URL, eller brug vores default fra environment
  const artistId = searchParams.get('artistId') || process.env.SPOTIFY_ARTIST_ID;
  
  // Hent market (land) parameter - fx "DK" for Danmark
  const market = searchParams.get('market');
  
  // Hent limit (antal tracks) og konverter til tal
  // parseInt() fordi query params altid er strings
  const limit = parseInt(searchParams.get('limit'));

  // Hent top tracks fra Spotify via vores wrapper funktion
  // Denne funktion håndterer authentication og API kald
  const topTracks = await getArtistTopTracks(artistId, market);
  
  // Begræns antal tracks til det brugeren bad om
  // slice(0, limit) = tag de første X tracks
  // Eksempel: Hvis limit=5, tag track 0, 1, 2, 3, 4
  const tracksToShow = topTracks.slice(0, limit);
  
  // Send JSON response tilbage til browseren
  // Response.json() laver automatisk Content-Type: application/json header
  return Response.json({ tracks: tracksToShow });
}