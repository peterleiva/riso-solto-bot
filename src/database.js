import env from "./env.js";
import mongoose from "mongoose";

const DATABASE_URL = env.database.url ?? "mongodb://localhost/riso-solto";

mongoose.connection.on("connected", () => {
  const { name: database, host, port } = mongoose.connection;

  console.log("database connected at %s on %s:%d", database, host, port);
});

mongoose.connection.on("disconnected", () => {
  console.warn("database disconnected");
});

export default {
  async connect() {
    return await mongoose.connect(DATABASE_URL, {
      keepAliveInitialDelay: 300000,
      maxPoolSize: 5,
    });
  },
};
