
import httpProxy from 'http-proxy';
import { proxyMap } from './proxy.map';

const proxy = httpProxy.createProxyServer({
  ignorePath: true,
});

function getProxyUrl(originalUrl) {
  const key = originalUrl.split('/')[2];
  const svc = proxyMap[key];
  let url = originalUrl.replace('/proxy/', '').replace(key, svc);
  if (!url.startsWith('http://')) {
    url = `http://${url}`;
  }
  return url;
}

function proxyFnc(ctx) {
  const url = getProxyUrl(ctx.originalUrl);
  ctx.respond = false;
  const { req, res } = ctx;
  proxy.web(req, res, { target: url, changeOrigin: true });
}

export default proxyFnc;
