import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.mjs';
const url = 'https://blog.aiyly.com/media/baoshi-shan-20261122-v1/route.jpg';
const calls = [];
const makeObject = () => ({ size: 4, httpEtag: '"image-v1"', body: new Blob(['jpeg']).stream() });
const env = { MEDIA: {
  async get(key) { calls.push(key); return makeObject(); },
  async head(key) { calls.push(key); return { size: 4, httpEtag: '"image-v1"' }; },
} };

test('streams an allowed photograph from its blog prefix', async () => {
  const response = await worker.fetch(new Request(url), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/jpeg');
  assert.equal(response.headers.get('content-length'), '4');
  assert.equal(await response.text(), 'jpeg');
  assert.equal(calls.at(-1), 'blog-media/baoshi-shan-20261122-v1/route.jpg');
});
test('HEAD and conditional reads return no image body', async () => {
  const head = await worker.fetch(new Request(url, { method: 'HEAD' }), env);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  for (const tag of ['"image-v1"', 'W/"image-v1", "other"', '*']) {
    const conditional = await worker.fetch(new Request(url, { headers: { 'If-None-Match': tag } }), env);
    assert.equal(conditional.status, 304);
    assert.equal(await conditional.text(), '');
  }
});
test('unknown files, private prefixes and other hosts never read the bucket', async () => {
  const before = calls.length;
  for (const rejected of [
    url.replace('route.jpg', 'private.jpg'), url.replace('route.jpg', '../secret.jpg'),
    url.replace('blog.aiyly.com', 'www.aiyly.com'), url.replace('/media/', '/private/'),
    url.replace('route.jpg', 'route.jpg/extra'), url.replace('route.jpg', 'route%2ejpg'),
  ]) assert.equal((await worker.fetch(new Request(rejected), env)).status, 404);
  assert.equal(calls.length, before);
});
test('public delivery cannot upload or delete objects', async () => {
  const before = calls.length;
  for (const method of ['POST', 'PUT', 'DELETE']) {
    const response = await worker.fetch(new Request(url, { method }), env);
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET, HEAD');
  }
  assert.equal(calls.length, before);
});
