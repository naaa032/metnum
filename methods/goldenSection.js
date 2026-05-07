import {
  evaluateFunction,
  relativeError
} from "../utils/math.js";

import {
  shouldStop
} from "../utils/stopConditions.js";

export function goldenSection({
  f,
  xl,
  xu,
  mode = "min",
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

  const R =
    (Math.sqrt(5) - 1) / 2;

  let iterations = [];

  let stopReason = null;

  let x1 =
    xu - R * (xu - xl);

  let x2 =
    xl + R * (xu - xl);

  let prevMid;

  for (let iter = 1; ; iter++) {

    let f1 =
      evaluateFunction(f, x1);

    let f2 =
      evaluateFunction(f, x2);

    let currentMid =
      (xl + xu) / 2;

    let error =
      prevMid !== undefined
        ? relativeError(
            currentMid,
            prevMid
          )
        : null;

    iterations.push({
      iter,
      xl,
      xu,
      x1,
      x2,
      f1,
      f2,
      error
    });

    if (mode === "min") {

      if (f1 < f2) {

        xu = x2;

        x2 = x1;

        x1 =
          xu -
          R * (xu - xl);
      }
      else {

        xl = x1;

        x1 = x2;

        x2 =
          xl +
          R * (xu - xl);
      }
    }

    else {

      if (f1 > f2) {

        xu = x2;

        x2 = x1;

        x1 =
          xu -
          R * (xu - xl);
      }
      else {

        xl = x1;

        x1 = x2;

        x2 =
          xl +
          R * (xu - xl);
      }
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

      break;
    }

    prevMid = currentMid;
  }


  let optimum =
    (xl + xu) / 2;

  let optimumValue =
    evaluateFunction(
      f,
      optimum
    );

  return {

    method:
      "Golden Section",

    success: true,

    mode,

    result: optimum,

    optimumValue,

    finalError:
      iterations[
        iterations.length - 1
      ].error,

    stopReason,

    iterations
  };
}