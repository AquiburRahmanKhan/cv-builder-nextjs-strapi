const path = require("path");

module.exports = ({ env }) => {
  console.log(
    "directive name",
    path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db"))
  );
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: path.join(
          __dirname,
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };
};
