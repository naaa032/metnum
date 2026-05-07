export function normalizeMathExpression(expr) {

  return expr

    // hapus spasi
    .replace(/\s+/g, "")

    // auto multiplication
    .replace(/(\d)(x)/g, "$1*$2")
    .replace(/(\d)\(/g, "$1*(")
    .replace(/x\(/g, "x*(")

    // pangkat
    .replace(/\^/g, "**")

    // trig
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")

    // akar
    .replace(/sqrt\(/g, "Math.sqrt(")

    // log
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")

    // konstanta
    .replace(/\bpi\b/g, "Math.PI")
    .replace(/\be\b/g, "Math.E");
}

export function evaluateFunction(expr, x) {

  try {

    expr = normalizeMathExpression(expr);

    return Function(
      "x",
      `return ${expr}`
    )(x);

  } catch (error) {

    throw new Error(
      "Format fungsi tidak valid"
    );
  }
}

export function derivative(expr, x, h = 1e-6) {

  return (
    evaluateFunction(expr, x + h)
    - evaluateFunction(expr, x - h)
  ) / (2 * h);
}

export function relativeError(newVal, oldVal) {

  if (
    oldVal === undefined ||
    newVal === 0
  ) {
    return null;
  }

  return Math.abs(
    (newVal - oldVal) / newVal
  );
}

export function validateBracket(f, xl, xu) {

  let fxl = evaluateFunction(f, xl);
  let fxu = evaluateFunction(f, xu);

  return fxl * fxu < 0;
}

export function maxError(newValues, oldValues) {

  let errors = newValues.map((v, i) => {

    if (v === 0) return 0;

    return Math.abs(
      (v - oldValues[i]) / v
    );
  });

  return Math.max(...errors);
}

export function isDiagonallyDominant(A) {

  for (let i = 0; i < A.length; i++) {

    let diagonal = Math.abs(A[i][i]);

    let others = 0;

    for (let j = 0; j < A.length; j++) {

      if (i !== j) {
        others += Math.abs(A[i][j]);
      }
    }

    if (diagonal < others) {
      return false;
    }
  }

  return true;
}