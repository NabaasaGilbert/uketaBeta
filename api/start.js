export default async function handler(req, res) {
  const url = `https://162.241.24.152/~simbapr1/uketalearning/start${req.url.replace('/start', '')}`;

  const response = await fetch(url, {
    headers: req.headers,
    method: req.method,
    body: req.method !== "GET" ? req.body : undefined,
  });

  res.writeHead(response.status, Object.fromEntries(response.headers));
  response.body.pipe(res);
}
