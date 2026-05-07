import {
  evaluateFunction,
  validateBracket,
  relativeError
} from "../utils/math.js";

import {
  shouldStop
} from "../utils/stopConditions.js";

export function bisection({
  f,
  xl,
  xu,
  tolerance = null,
  maxIter = null
}) {

  if (tolerance === null && maxIter === null) {
    tolerance = 1e-10;
    maxIter = 1000;
  }

  if (!validateBracket(f, xl, xu)) {

    return {
      method: "Bisection",
      success: false,
      message:
        "Interval tidak mengurung akar",
      iterations: []
    };
  }

  let iterations = [];
  let xr;
  let prevXr;
  let stopReason = null;

  for (let iter = 1; ; iter++) {
    prevXr = xr;
    let fxl = evaluateFunction(f, xl);
    let fxu = evaluateFunction(f, xu);
    xr = (xl + xu) / 2;
    let fxr = evaluateFunction(f, xr);
    let error =
      prevXr !== undefined
        ? relativeError(xr, prevXr)
        : null;

    iterations.push({
      iter,
      xl,
      xu,
      xr,
      fxl,
      fxu,
      fxr,
      error
    });

    if (fxl * fxr < 0) {
      xu = xr;
    }
    else if (fxl * fxr > 0) {
      xl = xr;
    }
    else {
      stopReason = "Exact root found";
      break;
    }
    let stopCheck = shouldStop({
      iter,
      maxIter,
      error,
      tolerance
    });

    if (stopCheck.stop) {
      stopReason =
        stopCheck.reason;
      break;
    }
  }

  return {
    method: "Bisection",
    success: true,
    result: xr,
    finalError:
      iterations[
        iterations.length - 1
      ].error,
    stopReason,
    iterations
  };
}