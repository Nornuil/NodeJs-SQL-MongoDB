const mongoose = require("mongoose");
const dbOptions2 = "";

const dbConnection = async (db) => {
  switch (db) {
    case "mongo":
      console.log("Contectó a mongo");
      try {
        await mongoose.connect(process.env.MONGODB_CONEX, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log("Base de datos online");
      } catch (error) {
        console.log(error);
        throw new Error("Error en iniciar la base de datos");
      }

      break;

    case "firebase":
      console.log("Contectó a firebase");
      dbOptions2 = {
        client: "mysql",
        connection: {
          host: "127.0.0.1",
          database: "ecommerce",
          user: "root",
          password: "cejudo2868",
          port: 3306,
        },
        pool: { min: 0, max: 7 },
      };
      break;
    case "mysql":
      console.log("Contectó a sql");

      break;

    default:
      console.log("Base de datos inexistente..");
      break;
  }
};

module.exports = { dbConnection, dbOptions2 };
