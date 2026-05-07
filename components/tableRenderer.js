function formatValue(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "-";
  }

  if (Array.isArray(value)) {

    return value
      .map(v =>
        Number(v).toFixed(6)
      )
      .join(", ");
  }

  if (
    typeof value === "object"
  ) {

    return JSON.stringify(value);
  }

  if (
    typeof value === "number"
  ) {

    return Number(value)
      .toFixed(6);
  }

  return value;
}

export function renderTable(
  result,
  containerId = "tableContainer"
) {

  let container =
    document.getElementById(
      containerId
    );

  if (
    !result ||
    !result.iterations ||
    result.iterations.length === 0
  ) {

    container.innerHTML = `
      <p>Tidak ada data iterasi.</p>
    `;

    return;
  }

  let headers =
    Object.keys(
      result.iterations[0]
    );

  let thead = `
    <thead>
      <tr>
        ${headers.map(header => `
          <th>${header}</th>
        `).join("")}
      </tr>
    </thead>
  `;

  let tbody = `
    <tbody>

      ${result.iterations.map(row => `

        <tr>

          ${headers.map(header => `

            <td>
              ${formatValue(
                row[header]
              )}
            </td>

          `).join("")}

        </tr>

      `).join("")}

    </tbody>
  `;

  container.innerHTML = `

    <table class="result-table">

      ${thead}

      ${tbody}

    </table>
  `;
}