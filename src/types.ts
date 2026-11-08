export type Kind = 'repos' | 'stars';
export type Sort = 'stars' | 'forks' | 'pushed' | 'created' | 'name' | 'starred';
export type Repo = { name: string; fullName: string; description: string; language: string; stars: number; forks: number; fork: boolean; archived: boolean; size: number; license: string; topics: string[]; created: string; pushed: string; starred: string };
export type Cache = { time: number; items: Repo[] };
