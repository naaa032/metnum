import {
  evaluateFunction,
  relativeError
} from "../utils/math.js";

import {
  shouldStop
} from "../utils/stopConditions.js";

function fibonacci(n) {

  let fib = [1, 1];

  for (
    let i = 2;
    i <= n;
    i++
  ) {

    fib[i] =
      fib[i - 1] +
      fib[i - 2];
  }

  return fib;
}

export function fibonacciSearch({
  f,
  xl,
  xu,
  n = 20,
  mode = "min"
}) {

  let fib = fibonacci(n);

  let iterations = [];

  let stopReason =
    "Final Fibonacci iteration";

  let prevMid;

  for (
    let iter = 1;
    iter <= n - 2;
    iter++
  ) {

    let ratio1 =
      fib[n - iter - 1] /
      fib[n - iter + 1];

    let ratio2 =
      fib[n - iter] /
      fib[n - iter + 1];

    let x1 =
      xl +
      ratio1 * (xu - xl);

    let x2 =
      xl +
      ratio2 * (xu - xl);

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

      if (f1 > f2) {
        xl = x1;
      }
      else {
        xu = x2;
      }
    }

    else {

      if (f1 < f2) {
        xl = x1;
      }
      else {
        xu = x2;
      }
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
      "Fibonacci Search",

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