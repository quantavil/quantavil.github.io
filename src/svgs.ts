const paths = {"star": "M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7z", "fork": "M5 1a2 2 0 0 1 1 3.73V7a2 2 0 0 0 2 2h1V4.73a2 2 0 1 1 2 0V9a2 2 0 0 1-2 2H8v.27a2 2 0 1 1-2 0V10a4 4 0 0 1-2-3V4.73A2 2 0 0 1 5 1z", "language": "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z", "size": "M3 1h7l3 3v11H3zm6 1v3h3z", "license": "M8 1a3 3 0 0 1 3 3c0 1-.5 1.9-1.2 2.5L11 14l-3-1.5L5 14l1.2-7.5A3 3 0 0 1 8 1z", "created": "M3 1h1v2h8V1h1v2h2v12H1V3h2zm10 5H3v7h10z", "pushed": "M8 1l5 5h-3v5H6V6H3zm-5 11h10v2H3z", "topics": "M1 2h7l7 7-6 6-8-8zm3 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"} as const;

export type IconName = keyof typeof paths;
export function icon(name: IconName): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', paths[name]);
  svg.append(path);
  return svg;
}
