// PICO-8 palette colors: fixed for the current topics, any new tag gets a stable one from its name.
const PALETTE = ['#ff004d', '#ffa300', '#ffec27', '#00e436', '#29adff', '#83769c', '#ff77a8', '#ffccaa'];
const COLORS = { Git: '#ffa300', Linux: '#ffec27', DirectX: '#00e436', Unity: '#83769c', 'C++': '#29adff', AI: '#ff77a8' };

export function tagColor(tag) {
  if (tag in COLORS) return COLORS[tag];
  let hash = 0;
  for (const char of tag) hash = (hash * 31 + char.codePointAt(0)) % PALETTE.length;
  return PALETTE[hash];
}
