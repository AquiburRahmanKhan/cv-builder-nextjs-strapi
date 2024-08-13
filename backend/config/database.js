const path = require("path");

module.exports = ({ env }) => {
  const filename =
    env("NODE_ENV") === "production"
      ? path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        )
      : path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db"));

  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: filename,
      },
      useNullAsDefault: true,
    },
  };
};
