/** Public stills generated for Helio. Prefix with the Vite base so Pages works. */
export function flagshipAsset(file: string) {
  const base = import.meta.env.BASE_URL
  return `${base}flagship/${file}`
}

export const stills = {
  instrument: () => flagshipAsset('heliograph-instrument.jpg'),
  aperture: () => flagshipAsset('heliograph-aperture.jpg'),
  desk: () => flagshipAsset('studio-night-desk.jpg'),
  window: () => flagshipAsset('studio-window-rain.jpg'),
  dial: () => flagshipAsset('instrument-dial.jpg'),
}

export const portraits = {
  meera: () => flagshipAsset('portrait-meera.jpg'),
  eli: () => flagshipAsset('portrait-eli.jpg'),
  hana: () => flagshipAsset('portrait-hana.jpg'),
  otto: () => flagshipAsset('portrait-otto.jpg'),
  luz: () => flagshipAsset('portrait-luz.jpg'),
  amir: () => flagshipAsset('portrait-amir.jpg'),
}
