/**
 * Logs method, path, status code, and response time for each request.
 * Particularly useful on /api/chat, since retrieval + generation latency
 * is the main performance concern in this app.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
