let ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
};

interface ResponsePayloadType {
  code: any;
  payload: any;
}

exports.respondWithCode = (code, payload) => {
  return new ResponsePayload(code, payload);
};

let writeJson = exports.writeJson = (response, arg1: ResponsePayloadType, arg2: ResponsePayloadType) => {
  let code;
  let payload;

  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if (arg2 && !(arg2 instanceof ResponsePayload)) {
    code = arg2;
  } else {
    if (arg1 && !(arg1 instanceof ResponsePayload)) {
      code = arg1;
    }
  }
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  if (!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if (typeof payload === "object") {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {"Content-Type": "application/json"});
  response.end(payload);
};
