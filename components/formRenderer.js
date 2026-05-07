export function renderForm(method) {

  const container =
    document.getElementById(
      "formContainer"
    );

  // ====================================
  // BISECTION & FALSE POSITION
  // ====================================

  if (
    method === "bisection" ||
    method === "falsePosition"
  ) {

    container.innerHTML = `

      <div class="form-group">

        <label>
          Fungsi f(x)
        </label>

        <input
          type="text"
          id="f"
          placeholder="contoh: x^3 - x - 2"
        >

      </div>

      <div class="form-group">

        <label>
          Nilai xl
        </label>

        <input
          type="number"
          id="xl"
        >

      </div>

      <div class="form-group">

        <label>
          Nilai xu
        </label>

        <input
          type="number"
          id="xu"
        >

      </div>

      <button id="solveButton">

        Hitung

      </button>
    `;
  }

  // ====================================
  // NEWTON RAPHSON
  // ====================================

  if (
    method === "newton"
  ) {

    container.innerHTML = `

      <div class="form-group">

        <label>
          Fungsi f(x)
        </label>

        <input
          type="text"
          id="f"
          placeholder="contoh: x^3 - x - 2"
        >

      </div>

      <div class="form-group">

        <label>
          Tebakan Awal x0
        </label>

        <input
          type="number"
          id="x0"
        >

      </div>

      <button id="solveButton">

        Hitung

      </button>
    `;
  }

  // ====================================
  // GOLDEN SECTION & FIBONACCI
  // ====================================

  if (
    method === "golden" ||
    method === "fibonacci"
  ) {

    container.innerHTML = `

      <div class="form-group">

        <label>
          Fungsi f(x)
        </label>

        <input
          type="text"
          id="f"
          placeholder="contoh: 2*x^2 - 3*x"
        >

      </div>

      <div class="form-group">

        <label>
          Nilai a
        </label>

        <input
          type="number"
          id="a"
        >

      </div>

      <div class="form-group">

        <label>
          Nilai b
        </label>

        <input
          type="number"
          id="b"
        >

      </div>

      <button id="solveButton">

        Hitung

      </button>
    `;
  }

  // ====================================
  // JACOBI & GAUSS SEIDEL
  // ====================================

  if (
    method === "jacobi" ||
    method === "gaussSeidel"
  ) {

    container.innerHTML = `

      <div class="form-group">

        <label>
          Matriks A
        </label>

        <textarea
          id="matrix"
          placeholder="contoh:\n10,-1,2\n-1,11,-1\n2,-1,10"
        ></textarea>

      </div>

      <div class="form-group">

        <label>
          Vektor b
        </label>

        <input
          type="text"
          id="vector"
          placeholder="contoh: 6,25,-11"
        >

      </div>

      <div class="form-group">

        <label>
          Tebakan Awal
        </label>

        <input
          type="text"
          id="guess"
          placeholder="contoh: 0,0,0"
        >

      </div>

      <button id="solveButton">

        Hitung

      </button>
    `;
  }
}