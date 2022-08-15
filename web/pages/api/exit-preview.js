export default function exit(req, res) {
  res.clearPreviewData();
  res.writeHead(307, { Location: req.headers.referer || "/" });
  res.end();
}
