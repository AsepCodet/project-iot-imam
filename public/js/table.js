document.addEventListener("DOMContentLoaded", () => {
  const tableSelect = document.getElementById("tableSel");
  const tableBody = document.getElementById("tableBody");
  const refreshButton = document.getElementById("refreshButton");
  let jsonDataFromBackend; // Variable to store the fetched JSON data

  const fetchDataAndPopulateSelect = async () => {
    try {
      const response = await fetch("/getdb");
      jsonDataFromBackend = await response.json();

      // Clear existing options
      tableSelect.innerHTML =
        '<option value="" disabled selected>Select Date</option>';

      // Populate the select element with options from the fetched JSON data
      for (const option in jsonDataFromBackend) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        tableSelect.appendChild(optionElement);
      }
    } catch (error) {
      console.error("Error fetching data options:", error);
    }
  };

  const updateTable = () => {
    // Clear existing data rows
    tableBody.innerHTML = "";

    // Get the selected date
    const selectedDate = tableSelect.value;
    if (!selectedDate) {
      return; // No selected date, do nothing
    }

    const dataForSelectedDate = jsonDataFromBackend[selectedDate];

    // Add new rows to the table based on selected date data
    for (const key in dataForSelectedDate) {
      const rowData = dataForSelectedDate[key];
      const newRow = document.createElement("tr");

      const order = [
        "Timestamp",
        "Suhu DHT 1",
        "Suhu DHT 2",
        "Kelembapan DHT 1",
        "Kelembapan DHT 2",
        "Suhu Pemanas",
      ];
      for (const property of order) {
        const dataCell = document.createElement("td");
        if (property === "Timestamp") {
          // Convert epoch time to human-readable date
          const timestampValue = rowData[property];
          const newDate = new Date(
            timestampValue * 1000
          ).toLocaleString();
          dataCell.textContent = newDate;
        } else {
          // For other properties, simply display the value
          dataCell.textContent = rowData[property];
        }
        newRow.appendChild(dataCell);
      }

      tableBody.appendChild(newRow);
    }
  };

  fetchDataAndPopulateSelect();

  refreshButton.addEventListener("click", async () => {
    // Trigger the data fetch and select population again
    await fetchDataAndPopulateSelect();

    // Update the table
    updateTable();
  });

  tableSelect.addEventListener("change", () => {
    // Update the table based on the selected date
    updateTable();
  });
  setInterval(updateTable, 300000);
});
document.getElementById('exportButton').addEventListener('click', () => {
  const table = document.getElementById('tabelID');
  const tableSelect = document.getElementById("tableSel");
  const selectedDate = tableSelect.value;
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, selectedDate+'.xlsx');
});

