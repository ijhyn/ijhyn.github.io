import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { common } from 'lowlight';
import powershell from 'highlight.js/lib/languages/powershell';

const POSTS_DIR = path.join(process.cwd(), 'posts');

function readPost(file) {
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
  const date = new Date(data.date).toISOString();
  return {
    // `url` comes from the old Jekyll/Hugo front matter; keeping it keeps old links working.
    slug: (data.url ?? file.replace(/\.md$/, '')).replace(/^\/+|\/+$/g, ''),
    title: data.title,
    date,
    dateLabel: date.slice(0, 10).replaceAll('-', '.'),
    tags: data.tags ?? [],
    content,
  };
}

function loadPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Post metadata, newest first. */
export function getAllPosts() {
  return loadPosts().map(({ content, ...meta }) => meta);
}

export function getPost(slug) {
  return loadPosts().find((post) => post.slug === slug) ?? null;
}

// Posts open with `# Title`; the page header already shows the title, so drop it.
function remarkDropLeadingTitle() {
  return (tree) => {
    const [first] = tree.children;
    if (first?.type === 'heading' && first.depth === 1) tree.children.shift();
  };
}

export async function renderMarkdown(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDropLeadingTitle)
    // Posts mix in raw HTML (<br/>, <img width=...>), so let it through.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, { languages: { ...common, powershell } })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
