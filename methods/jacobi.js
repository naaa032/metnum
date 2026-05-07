import {
  maxError,
  isDiagonallyDominant
} from "../utils/math.js";

import {
  shouldStop
} from "../utils/stopConditions.js";

export function jacobi({
  A,
  b,
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

  if (
    !isDiagonallyDominant(A)
  ) {

    return {

      method: "Jacobi",

      success: false,

      message:
        "Matriks tidak diagonal dominan",

      iterations: []
    };
  }

  let iterations = [];

  let x = [...x0];

  let stopReason = null;

  for (let iter = 1; ; iter++) {

    let xNew = [];

    for (
      let i = 0;
      i < A.length;
      i++
    ) {

      let sum = 0;

      for (
        let j = 0;
        j < A.length;
        j++
      ) {

        if (i !== j) {

          sum +=
            A[i][j] * x[j];
        }
      }

      xNew[i] =
        (
          b[i] - sum
        ) / A[i][i];
    }

    let error =
      maxError(xNew, x);

    iterations.push({
      iter,
      values: [...xNew],
      error
    });

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

      x = [...xNew];

      break;
    }

    x = [...xNew];
  }

  let result = {};

  x.forEach((value, index) => {

    result[
      `x${index + 1}`
    ] = value;
  });

  return {

    method: "Jacobi",

    success: true,

    result,

    finalError:
      iterations[
        iterations.length - 1
      ].error,

    stopReason,

    iterations
  };
}