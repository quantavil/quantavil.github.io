import { $ , storage } from './dom';
import { createIndex } from './index-view';
import { site } from './site.config';

$('#footer').textContent = site.footer;
const theme = $<HTMLButtonElement>('.theme');
function setTheme(value: string) { if (value === 'dark' || value === 'light') document.documentElement.dataset.theme = value; else delete document.documentElement.dataset.theme; theme.textContent = `theme: ${value}`; theme.setAttribute('aria-label', `Theme: ${value}. Change theme`); }
let themeValue = storage.get('theme') || 'auto'; if (!['auto', 'dark', 'light'].includes(themeValue)) themeValue = 'auto'; setTheme(themeValue);
theme.addEventListener('click', () => { themeValue = themeValue === 'auto' ? 'dark' : themeValue === 'dark' ? 'light' : 'auto'; setTheme(themeValue); storage.set('theme', themeValue); });

createIndex('repos');
createIndex('stars');

function showView() { const view = location.hash === '#stars' ? 'stars' : 'repos'; for (const kind of ['repos', 'stars'] as const) { $<HTMLElement>(`#${kind}`).hidden = kind !== view; const link = $<HTMLAnchorElement>(`nav a[href="#${kind}"]`); if (kind === view) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); } }
window.addEventListener('hashchange', showView); showView();
