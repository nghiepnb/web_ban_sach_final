"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
// check count connect
const countConnect = () => {
  const numConnection = mongoose.connection.length;
  console.log(`Number of connection::${numConnection}`);
};

//check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connection.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    //Example maximum number of connection based on number osf cores

    const maxConnections = numCores * 5;
    console.log(`Active connection:${numConnection}`);

    console.log(`Memory usage : ${memoryUsage / 1024 / 1024}MB`);

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverLoad,
};
