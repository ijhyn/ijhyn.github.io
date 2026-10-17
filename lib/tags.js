// Fixed hues for the current topics; any new tag gets a stable hue from its name.
const HUES = { Git: 15, Linux: 45, DirectX: 140, Unity: 175, 'C++': 210, AI: 275 };

export function tagHue(tag) {
  if (tag in HUES) return HUES[tag];
  let hash = 0;
  for (const char of tag) hash = (hash * 31 + char.codePointAt(0)) % 360;
  return hash;
}
