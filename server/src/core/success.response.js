const StatusCode = {
  OK: 200,
  CREATE: 201,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATE: "Create",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metaData = {},
  }) {
    (this.message = !message ? reasonStatusCode : message),
      (this.status = statusCode),
      (this.metaData = metaData);
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metaData }) {
    super({ message, metaData });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    option = {},
    message,
    statusCode = StatusCode.CREATE,
    reasonStatusCode = ReasonStatusCode.CREATE,
    metaData,
  }) {
    super({ message, statusCode, reasonStatusCode, metaData });
    this.option = option;
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse,
};
