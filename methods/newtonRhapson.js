import {
  evaluateFunction,
  derivative,
  relativeError
} from "../utils/math.js";

import {
  shouldStop
} from "../utils/stopConditions.js";

export function newtonRaphson({
  f,
  x0,
  tolerance = null,
  maxIter = null
}) {

  if (
    tolerance === null &&
    maxIter === null
  ) {
    tolerance = 1e-10;
    maxIter = 1000;
  }

  let iterations = [];
  let x = x0;
  let stopReason = null;

  for (let iter = 1; ; iter++) {
    let fx =
      evaluateFunction(f, x);
    let dfx =
      derivative(f, x);
    if (dfx === 0) {
      return {
        method:
          "Newton-Raphson",
        success: false,
        message:
          "Turunan bernilai nol",
        iterations
      };
    }

    let xNew =
      x - (fx / dfx);

    let error =
      relativeError(
        xNew,
        x
      );

    iterations.push({
      iter,
      x,
      fx,
      dfx,
      xNew,
      error
    });

    if (fx === 0) {
      stopReason =
        "Exact root found";
      x = xNew;
      break;
    }

    let stopCheck =
      shouldStop({
        iter,
        maxIter,
        error,
        tolerance
      });

    if (stopCheck.stop) {
      stopReason =
        stopCheck.reason;
      x = xNew;
      break;
    }
    x = xNew;
  }

  return {

    method:
      "Newton-Raphson",
    success: true,
    result: x,
    finalError:
      iterations[
        iterations.length - 1
      ].error,
    stopReason,
    iterations
  };
}