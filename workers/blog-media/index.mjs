const release = 'baoshi-shan-20261122-v1';
const names = new Set([
  'route.jpg', 'autumn-road.jpg', 'ginkgo.jpg', 'fruit-tree.jpg',
  'west-lake.jpg', 'baochu-pagoda.jpg', 'stone-gateway.jpg', 'daytime-moon.jpg',
]);
const noStore = { 'Cache-Control': 'no-store' };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = '/media/' + release + '/';
    const filename = url.pathname.slice(prefix.length);
    if (url.hostname !== 'blog.aiyly.com' || !url.pathname.startsWith(prefix) || !names.has(filename)) {
      return new Response(null, { status: 404, headers: noStore });
    }
    const head = request.method === 'HEAD';
    if (!head && request.method !== 'GET') return new Response(null, { status: 405, headers: { ...noStore, Allow: 'GET, HEAD' } });
    try {
      const key = 'blog-media/' + release + '/' + filename;
      const object = await (head ? env.MEDIA.head(key) : env.MEDIA.get(key));
      if (!object) return new Response(null, { status: 404, headers: noStore });
      const headers = new Headers({
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        ETag: object.httpEtag,
        'X-Content-Type-Options': 'nosniff',
      });
      const tags = request.headers.get('If-None-Match')?.split(',').map(tag => tag.trim().replace(/^W\//, '')) ?? [];
      if (tags.includes('*') || tags.includes(object.httpEtag)) {
        await object.body?.cancel();
        return new Response(null, { status: 304, headers });
      }
      headers.set('Content-Length', String(object.size));
      return new Response(head ? null : object.body, { headers });
    } catch {
      console.error(JSON.stringify({ message: 'blog_media_read_failed', path: url.pathname }));
      return new Response(null, { status: 503, headers: noStore });
    }
  },
};
