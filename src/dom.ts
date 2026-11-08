export const $ = <T extends Element>(selector: string, root: ParentNode = document): T => { const el = root.querySelector<T>(selector); if (!el) throw new Error(`Missing ${selector}`); return el; };
export const node = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', content = ''): HTMLElementTagNameMap[K] => { const el = document.createElement(tag); el.className = className; el.textContent = content; return el; };
export const number = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });
export const readableDate = (value: string) => { const d = new Date(value); return Number.isNaN(d.valueOf()) ? 'unknown' : date.format(d); };
export const storage = { get(key: string): string | null { try { return localStorage.getItem(key); } catch { return null; } }, set(key: string, value: string): void { try { localStorage.setItem(key, value); } catch { /* Storage is optional. */ } } };
