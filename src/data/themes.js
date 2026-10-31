export const THEMES = [
  { id: 'aurora', name: 'Dreamy Aurora', note: 'Glassy, gradient glow',        swatch: ['#0a0b1a', '#b2a4ff', '#ff9ad5'] },
  { id: 'dusk',   name: 'Cozy Dusk',     note: 'Warm lo-fi, soft serif',       swatch: ['#1a1423', '#ffb48f', '#c5a3ff'] },
  { id: 'pixel',  name: 'Pastel Pixel',  note: 'Soft retro, pixel type',       swatch: ['#1b1c36', '#ff9ecf', '#8be9fd'] },
  { id: 'paper',  name: 'Indie Paper',   note: 'Light, editorial',             swatch: ['#f3eee5', '#e0532c', '#2f6fb0'] },
  { id: 'neon',   name: 'Neon HUD',      note: 'The original cyber look',      swatch: ['#07080d', '#c8ff2e', '#ff3d81'] },
]

export const DEFAULT_THEME = 'aurora'
export const THEME_KEY = 'anp-theme'

export const EFFECTS = [
  { id: 'flow',      name: 'Flow',      icon: 'bi-wind' },
  { id: 'bokeh',     name: 'Bokeh',     icon: 'bi-circle-half' },
  { id: 'fireflies', name: 'Fireflies', icon: 'bi-stars' },
]

export const FX_KEY = 'anp-fx'

export function applyFx(id) {
  document.documentElement.dataset.fx = id
  try { localStorage.setItem(FX_KEY, id) } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event('fxchange'))
}

export function applyTheme(id) {
  document.documentElement.dataset.theme = id
  try { localStorage.setItem(THEME_KEY, id) } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event('themechange'))
}
