import server from "./app";

async function main() {
  await server.listen(3000);
  console.log("Server listening at http://localhost:3000");
}

main();
