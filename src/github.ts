import type { Kind, Repo, Cache } from './types';
import { storage } from './dom';

function normalize(value: unknown, starred = ''): Repo {
  const r = value as Record<string, unknown>; const owner = r.owner as Record<string, unknown> | undefined;
  const str = (v: unknown) => typeof v === 'string' ? v : '';
  const num = (v: unknown) => typeof v === 'number' && Number.isFinite(v) ? v : 0;
  const name = str(r.name); const ownerName = str(owner?.login);
  if (!name || !ownerName) throw new Error('Invalid repository');
  return { name, fullName: `${ownerName}/${name}`, description: str(r.description), language: str(r.language), stars: num(r.stargazers_count), forks: num(r.forks_count), fork: r.fork === true, archived: r.archived === true, size: num(r.size), license: str((r.license as Record<string, unknown> | null)?.spdx_id), topics: Array.isArray(r.topics) ? r.topics.filter((x): x is string => typeof x === 'string') : [], created: str(r.created_at), pushed: str(r.pushed_at), starred };
}
export function readCache(kind: Kind): Cache | null { try { const raw = storage.get(`index-v3-${kind}`); if (!raw) return null; const data = JSON.parse(raw) as Cache; if (typeof data.time !== 'number' || !Array.isArray(data.items) || !data.items.every(x => typeof x.name === 'string' && typeof x.fullName === 'string' && typeof x.stars === 'number' && Array.isArray(x.topics))) return null; return data; } catch { return null; } }
export async function getItems(kind: Kind): Promise<Repo[]> {
  const base = `https://api.github.com/users/quantavil/${kind === 'repos' ? 'repos' : 'starred'}?per_page=100`;
  const headers = { Accept: kind === 'stars' ? 'application/vnd.github.star+json' : 'application/vnd.github+json' };
  const fetchPage = async (url: string) => { const response = await fetch(url, { headers }); if (!response.ok) throw new Error(`GitHub: ${response.status}`); return response; };
  const first = await fetchPage(base); const firstData: unknown = await first.json(); if (!Array.isArray(firstData)) throw new Error('Invalid response');
  const link = first.headers.get('Link') || ''; const lastLink = link.split(',').find(part => /rel="last"/.test(part)); const lastUrl = lastLink?.match(/<([^>]+)>/)?.[1]; const last = lastUrl ? Number(new URL(lastUrl).searchParams.get('page')) : 1;
  if (!Number.isInteger(last) || last < 1 || last > 1000) throw new Error('Invalid pagination');
  const pages = await Promise.all(Array.from({ length: last - 1 }, async (_, i) => { const response = await fetchPage(`${base}&page=${i + 2}`); const data: unknown = await response.json(); if (!Array.isArray(data)) throw new Error('Invalid response'); return data; }));
  return [firstData, ...pages].flat().map((entry: unknown) => { if (kind === 'stars') { const star = entry as Record<string, unknown>; return normalize(star.repo, typeof star.starred_at === 'string' ? star.starred_at : ''); } return normalize(entry); });
}
