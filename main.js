// ====================================
// FUNCTION PARSER
// ====================================

function parseFunction(expression) {

  return expression

    // pangkat
    .replace(/\^/g, "**")

    // trigonometrik
    .replace(/\bsin\(/g, "Math.sin(")

    .replace(/\bcos\(/g, "Math.cos(")

    .replace(/\btan\(/g, "Math.tan(")

    // akar
    .replace(/\bsqrt\(/g, "Math.sqrt(")

    // log natural
    .replace(/\blog\(/g, "Math.log(")

    // eksponensial
    .replace(/\bexp\(/g, "Math.exp(");
}

// ====================================
// CREATE FUNCTION
// ====================================

function createFunction(f) {

  const parsed =
    parseFunction(f);

  return new Function(
    "x",
    `return ${parsed}`
  );
}

// ====================================
// BISECTION
// ====================================

export function solveBisection(
  f,
  xl,
  xu,
  tolerance = 0.0001,
  maxIter = 100
) {

  try {

    const func =
      createFunction(f);

    let xr;
    let error = 100;

    let iter = 0;

    let table = [];

    while (
      error > tolerance &&
      iter < maxIter
    ) {

      let oldXr = xr;

      xr = (xl + xu) / 2;

      let fxl = func(xl);
      let fxr = func(xr);

      if (iter > 0) {

        error =
          Math.abs(
            (xr - oldXr) / xr
          ) * 100;
      }

      table.push({

        iteration: iter + 1,

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

      else {

        xl = xr;
      }

      iter++;
    }

    return {

      success: true,

      result: xr,

      table
    };
  }

  catch {

    return {

      success: false,

      message:
        "Input fungsi tidak valid."
    };
  }
}

// ====================================
// FALSE POSITION
// ====================================

export function solveFalsePosition(
  f,
  xl,
  xu,
  tolerance = 0.0001,
  maxIter = 100
) {

  try {

    const func =
      createFunction(f);

    let xr;
    let error = 100;

    let iter = 0;

    let table = [];

    while (
      error > tolerance &&
      iter < maxIter
    ) {

      let oldXr = xr;

      let fxl = func(xl);
      let fxu = func(xu);

      xr =
        xu -
        (
          fxu *
          (xl - xu)
        ) /
        (fxl - fxu);

      let fxr = func(xr);

      if (iter > 0) {

        error =
          Math.abs(
            (xr - oldXr) / xr
          ) * 100;
      }

      table.push({

        iteration: iter + 1,

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

      else {

        xl = xr;
      }

      iter++;
    }

    return {

      success: true,

      result: xr,

      table
    };
  }

  catch {

    return {

      success: false,

      message:
        "Input fungsi tidak valid."
    };
  }
}

// ====================================
// NEWTON RAPHSON
// ====================================

export function solveNewtonRaphson(
  f,
  x0,
  tolerance = 0.0001,
  maxIter = 100
) {

  try {

    const func =
      createFunction(f);

    let iter = 0;

    let error = 100;

    let x1;

    let table = [];

    while (
      error > tolerance &&
      iter < maxIter
    ) {

      // numerical derivative
      const h = 0.000001;

      const derivative =
        (
          func(x0 + h) -
          func(x0)
        ) / h;

      x1 =
        x0 -
        func(x0) / derivative;

      if (iter > 0) {

        error =
          Math.abs(
            (x1 - x0) / x1
          ) * 100;
      }

      table.push({

        iteration: iter + 1,

        x0,
        x1,
        fx1: func(x1),
        error
      });

      x0 = x1;

      iter++;
    }

    return {

      success: true,

      result: x1,

      table
    };
  }

  catch {

    return {

      success: false,

      message:
        "Input fungsi tidak valid."
    };
  }
}

// ====================================
// GOLDEN SECTION
// ====================================

export function solveGoldenSection(
  f,
  a,
  b,
  tolerance = 0.0001,
  maxIter = 100
) {

  try {

    const func =
      createFunction(f);

    const R =
      (Math.sqrt(5) - 1) / 2;

    let iter = 0;

    let table = [];

    while (
      Math.abs(b - a) > tolerance &&
      iter < maxIter
    ) {

        const c =
          b - R * (b - a);

        const d =
          a + R * (b - a);

        const fc =
          func(c);

        const fd =
          func(d);

      table.push({

        iteration: iter + 1,

        a,
        b,
        c,
        d,
        fc,
        fd
      });

      if (fc < fd) {

        b = d;
      }

      else {

        a = c;
      }

      iter++;
    }

    return {

      success: true,

      result: (a + b) / 2,

      table
    };
  }

  catch {

    return {

      success: false,

      message:
        "Input fungsi tidak valid."
    };
  }
}

// ====================================
// FIBONACCI
// ====================================

export function solveFibonacci(
  f,
  a,
  b,
  n = 10
) {

  try {

    const func =
      createFunction(f);

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

    let table = [];

    for (
      let k = 0;
      k < n - 2;
      k++
    ) {

      const c =
        a +
        (
          fib[n - k - 2] /
          fib[n - k]
        ) *
        (b - a);

      const d =
        a +
        (
          fib[n - k - 1] /
          fib[n - k]
        ) *
        (b - a);

      const fc =
        func(c);

      const fd =
        func(d);

      table.push({

        iteration: k + 1,

        a,
        b,
        c,
        d,
        fc,
        fd
      });

      if (fc < fd) {

        b = d;
      }

      else {

        a = c;
      }
    }

    return {

      success: true,

      result: (a + b) / 2,

      table
    };
  }

  catch {

    return {

      success: false,

      message:
        "Input fungsi tidak valid."
    };
  }
}

// ====================================
// JACOBI
// ====================================

export function solveJacobi(
  A,
  b,
  x,
  tolerance = 0.0001,
  maxIter = 100
) {

  let n = A.length;

  let table = [];

  let xNew =
    [...x];

  for (
    let iter = 0;
    iter < maxIter;
    iter++
  ) {

    for (
      let i = 0;
      i < n;
      i++
    ) {

      let sum = 0;

      for (
        let j = 0;
        j < n;
        j++
      ) {

        if (i !== j) {

          sum +=
            A[i][j] *
            x[j];
        }
      }

      xNew[i] =
        (
          b[i] - sum
        ) / A[i][i];
    }

    let error =
      Math.max(
        ...xNew.map(
          (v, i) =>
            Math.abs(v - x[i])
        )
      );

    table.push({

      iterasi: iter + 1,

      x: xNew[0],

      y: xNew[1],

      z: xNew[2],

      error
    });

    if (error < tolerance) {

      break;
    }

    x = [...xNew];
  }

  return {

    success: true,

    result: xNew,

    table
  };
}

// ====================================
// GAUSS SEIDEL
// ====================================

export function solveGaussSeidel(
  A,
  b,
  x,
  tolerance = 0.0001,
  maxIter = 100
) {

  let n = A.length;

  let table = [];

  for (
    let iter = 0;
    iter < maxIter;
    iter++
  ) {

    let old =
      [...x];

    for (
      let i = 0;
      i < n;
      i++
    ) {

      let sum = 0;

      for (
        let j = 0;
        j < n;
        j++
      ) {

        if (i !== j) {

          sum +=
            A[i][j] *
            x[j];
        }
      }

      x[i] =
        (
          b[i] - sum
        ) / A[i][i];
    }

    let error =
      Math.max(
        ...x.map(
          (v, i) =>
            Math.abs(v - old[i])
        )
      );

    table.push({

      iterasi: iter + 1,

      x: x[0],

      y: x[1],

      z: x[2],

      error
    });

    if (error < tolerance) {

      break;
    }
  }

  return {

    success: true,

    result: x,

    table
  };
}