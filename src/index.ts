import app from "./app";

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  const url = `http://${HOST}:${PORT}`;
  console.log(`✅ Server running at: ${url} (env=${process.env.NODE_ENV || "development"})`);
});
