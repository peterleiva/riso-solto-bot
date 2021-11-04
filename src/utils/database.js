import mongoose from "mongoose";
import env from "./env.js";

const DATABASE_URL = env.database.url ?? "mongodb://localhost/riso-solto";

mongoose.connection.on("connected", () => {
  const { name: database, host, port } = mongoose.connection;

  console.log("database connected at %s on %s:%d", database, host, port);
});

mongoose.connection.on("disconnected", () => {
  console.warn("database disconnected");
});

export async function connect() {
  return await mongoose.connect(DATABASE_URL, {
    keepAliveInitialDelay: 300000,
    maxPoolSize: 5,
  });
}
