import { writeFile } from 'node:fs/promises';

const base = 'https://api.github.com/users/quantavil';
const headers = { 'User-Agent': 'quantavil-site', 'X-GitHub-Api-Version': '2022-11-28' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function fetchJson(url, accept = 'application/vnd.github+json') {
  const response = await fetch(url, { headers: { ...headers, Accept: accept } });
  if (!response.ok) throw new Error(`GitHub request failed (${response.status}): ${url}`);
  return { data: await response.json(), link: response.headers.get('link') || '' };
}

async function allPages(path, accept) {
  let url = `${base}/${path}?per_page=100`;
  const results = [];
  while (url) {
    const { data, link } = await fetchJson(url, accept);
    if (!Array.isArray(data)) throw new Error(`Expected an array from ${url}`);
    results.push(...data);
    url = link.split(',').find(part => /rel="next"/.test(part))?.match(/<([^>]+)>/)?.[1];
  }
  return results;
}

const [profile, repositories, starred] = await Promise.all([
  fetchJson(base).then(result => result.data),
  allPages('repos'),
  allPages('starred', 'application/vnd.github.star+json'),
]);
const snapshot = { generated_at: new Date().toISOString(), profile, repositories, starred };
const json = JSON.stringify(snapshot);
const text = `# quantavil public GitHub data\n\nThis file contains the complete public GitHub profile, public repository responses, and starred repository responses at the time the site was built. Starred entries include starred_at and the full repo object. This is a snapshot, not private account data.\n\nGenerated: ${snapshot.generated_at}\n\nThe same data is available as JSON at https://quantavil.github.io/data.json. For live data, use https://api.github.com/users/quantavil (see the repository README for pagination).\n\n## Complete snapshot (JSON)\n\n${json}\n`;
await Promise.all([writeFile('dist/data.json', json + '\n'), writeFile('dist/llms.txt', text)]);
console.log(`Agent snapshot: ${repositories.length} repositories, ${starred.length} stars`);
