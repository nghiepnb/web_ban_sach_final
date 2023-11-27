"use strict";

const mongoose = require("mongoose");
const {
  db: { host, port, name },
} = require("../config/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log("connectString", connectString);
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => console.log("Connect Mongodb Success"))
      .catch((err) => console.log("Error Connect!" , err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
