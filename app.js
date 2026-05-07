import {
  renderForm
} from "./components/formRenderer.js";

import {

  solveBisection,
  solveFalsePosition,
  solveNewtonRaphson,
  solveGoldenSection,
  solveFibonacci,
  solveJacobi,
  solveGaussSeidel

} from "./main.js";

// ====================================
// ELEMENT
// ====================================

const methodSelect =
  document.getElementById(
    "methodSelect"
  );

// ====================================
// INITIAL
// ====================================

renderCurrentForm();

// ====================================
// CHANGE METHOD
// ====================================

methodSelect.addEventListener(
  "change",
  () => {

    renderCurrentForm();
  }
);

// ====================================
// RENDER FORM
// ====================================

function renderCurrentForm() {

  renderForm(
    methodSelect.value
  );

  attachButton();
}

// ====================================
// BUTTON
// ====================================

function attachButton() {

  const button =
    document.getElementById(
      "solveButton"
    );

  if (!button) return;

  button.onclick = () => {

    const method =
      methodSelect.value;

    // ====================================
    // BISECTION
    // ====================================

    if (
      method === "bisection"
    ) {

      const f =
        document.getElementById(
          "f"
        ).value;

      const xl =
        Number(
          document.getElementById(
            "xl"
          ).value
        );

      const xu =
        Number(
          document.getElementById(
            "xu"
          ).value
        );

      const result =
        solveBisection(
          f,
          xl,
          xu
        );
        
      renderResult(result);
    }

    // ====================================
    // FALSE POSITION
    // ====================================

    if (
      method === "falsePosition"
    ) {

      const f =
        document.getElementById(
          "f"
        ).value;

      const xl =
        Number(
          document.getElementById(
            "xl"
          ).value
        );

      const xu =
        Number(
          document.getElementById(
            "xu"
          ).value
        );

      const result =
        solveFalsePosition(
          f,
          xl,
          xu
        );

      renderResult(result);
    }

    // ====================================
    // NEWTON RAPHSON
    // ====================================

    if (
      method === "newton"
    ) {

      const f =
        document.getElementById(
          "f"
        ).value;

      const x0 =
        Number(
          document.getElementById(
            "x0"
          ).value
        );

      const result =
        solveNewtonRaphson(
          f,
          x0
        );

      renderResult(result);
    }

    // ====================================
    // GOLDEN SECTION
    // ====================================

    if (
      method === "golden"
    ) {

      const f =
        document.getElementById(
          "f"
        ).value;

      const a =
        Number(
          document.getElementById(
            "a"
          ).value
        );

      const b =
        Number(
          document.getElementById(
            "b"
          ).value
        );

      const result =
        solveGoldenSection(
          f,
          a,
          b
        );

      renderResult(result);
    }

    // ====================================
    // FIBONACCI
    // ====================================

    if (
      method === "fibonacci"
    ) {

      const f =
        document.getElementById(
          "f"
        ).value;

      const a =
        Number(
          document.getElementById(
            "a"
          ).value
        );

      const b =
        Number(
          document.getElementById(
            "b"
          ).value
        );

      const result =
        solveFibonacci(
          f,
          a,
          b
        );

      renderResult(result);
    }

    // ====================================
    // JACOBI
    // ====================================

    if (
      method === "jacobi"
    ) {

      const matrixText =
        document.getElementById(
          "matrix"
        ).value;

      const vectorText =
        document.getElementById(
          "vector"
        ).value;

      const guessText =
        document.getElementById(
          "guess"
        ).value;

      // matrix
      const A =
        matrixText
          .trim()
          .split("\n")
          .map(row =>
            row
              .split(",")
              .map(Number)
          );

      // vector
      const b =
        vectorText
          .split(",")
          .map(Number);

      // initial guess
      const x =
        guessText
          .split(",")
          .map(Number);

      const result =
        solveJacobi(
          A,
          b,
          x
        );

      renderResult(result);
    }

    // ====================================
    // GAUSS SEIDEL
    // ====================================

    if (
      method === "gaussSeidel"
    ) {

      const matrixText =
        document.getElementById(
          "matrix"
        ).value;

      const vectorText =
        document.getElementById(
          "vector"
        ).value;

      const guessText =
        document.getElementById(
          "guess"
        ).value;

      // matrix
      const A =
        matrixText
          .trim()
          .split("\n")
          .map(row =>
            row
              .split(",")
              .map(Number)
          );

      // vector
      const b =
        vectorText
          .split(",")
          .map(Number);

      // initial guess
      const x =
        guessText
          .split(",")
          .map(Number);

      const result =
        solveGaussSeidel(
          A,
          b,
          x
        );

      renderResult(result);
    }
  };
}

// ====================================
// RESULT
// ====================================
function formatValue(value) {

  // number
  if (
    typeof value === "number"
  ) {

    return value.toFixed(2);
  }

  // array
  if (
    Array.isArray(value)
  ) {

    return value
      .map(v =>
        Number(v).toFixed(2)
      )
      .join(", ");
  }

  // other
  return value;
}

function renderResult(result) {

  const container =
    document.getElementById(
      "resultContainer"
    );

  // ERROR
  if (!result.success) {

    container.innerHTML = `

      <h2>
        ${result.message}
      </h2>

    `;

    return;
  }

  // ====================================
  // RESULT
  // ====================================

  let html = `

    <h2>

      Hasil:
      ${formatValue(result.result)}

    </h2>

  `;

  // ====================================
  // TABLE
  // ====================================

  if (
    result.table &&
    result.table.length > 0
  ) {

    html += `
      <table border="1">
    `;

    // =========================
    // HEADER
    // =========================

    html += `
      <tr>
    `;

    const headers =
      Object.keys(
        result.table[0]
      );

    headers.forEach(header => {

      html += `
        <th>${header}</th>
      `;
    });

    html += `
      </tr>
    `;

    // =========================
    // ROWS
    // =========================

    result.table.forEach(row => {

      html += `
        <tr>
      `;

      headers.forEach(header => {

        html += `
          <td>
            ${formatValue(row[header])}
          </td>
        `;
      });

      html += `
        </tr>
      `;
    });

    html += `
      </table>
    `;
  }

  container.innerHTML = html;
}