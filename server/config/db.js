const mongoose = require("mongoose");
const crypto = require("crypto");
const telecallerSchema = require("../schema/telecallerschema");
const adminSchema = require("../schema/Adminschema");
const superadminSchema = require("../schema/superadmin");
const leadSchema = require("../schema/leadschema");
console.log("reaching the endpoint");
const connectionCache = {};
exports.getDatabaseConnection = (databaseName) => {
  // Use only the institution name for the database name
  let shortDbName = databaseName;
  const parts = databaseName.split("_");
  if (parts.length > 1) {
    shortDbName = parts[1]; // Use only the institution name
  }
  // If still too long, hash it
  if (shortDbName.length > 38) {
    shortDbName = crypto
      .createHash("md5")
      .update(shortDbName)
      .digest("hex")
      .slice(0, 32);
    console.warn(`Database name too long, using hashed name: ${shortDbName}`);
  }

  if (connectionCache[shortDbName]) {
    if (connectionCache[shortDbName].readyState === 1) {
      console.log("Reusing the existing connection");
      return connectionCache[shortDbName];
    } else {
      console.log("Recreating the connection");
      delete connectionCache[shortDbName];
    }
  }
  console.log(shortDbName);
  const dbLink = process.env.MONGODB_URI.replace("<Database>", shortDbName);
  console.log(dbLink);
  const connection = mongoose.createConnection(dbLink);

  connection.on("connected", () => {
    console.log(`Successfully connected to ${shortDbName}`);
  });

  connection.on("disconnected", () => {
    console.log(`Connection to ${shortDbName} lost. Reconnecting...`);
    connectionCache[shortDbName] = mongoose.createConnection(dbLink);
  });

  connection.on("error", (err) => {
    console.error(`Error connecting to ${shortDbName}:`, err);
    connectionCache[shortDbName] = null;
  });

  connection.model("Admin", adminSchema);
  connection.model("Lead", leadSchema);
  connection.model("Superadmin", superadminSchema);
  connection.model("Telecaller", telecallerSchema);

  connectionCache[shortDbName] = connection;

  return connection;
};

exports.getTelecallerModel = (db) => db.model("Telecaller", telecallerSchema);

exports.getAdminModel = (db) => db.model("Admin", adminSchema);

exports.getSuperadminModel = (db) => db.model("Superadmin", superadminSchema);
exports.getleadModel = (db) => db.model("Lead", leadSchema);
