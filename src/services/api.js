export function simulateRequest(data, delay) {
  var ms = delay || 500;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(data);
    }, ms);
  });
}

export function simulateError(error, delay) {
  var ms = delay || 500;
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(error);
    }, ms);
  });
}
