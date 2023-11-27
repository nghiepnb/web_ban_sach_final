const app = require("./src/app");

const PORT = process.env.PORT || 3052;

const server = app.listen(PORT, () => {
  console.log(`WSV start with ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
