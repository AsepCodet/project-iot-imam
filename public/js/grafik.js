// Function to create and update the chart
function createChartHumidity(data) {
  // Extracting timestamps and humidity values from the data
  const timestamps = Object.values(data).map(
    (entry) => new Date(entry.Timestamp * 1000)
  );
  const humidityDHT1 = Object.values(data).map(
    (entry) => entry["Kelembapan DHT 1"]
  );
  const humidityDHT2 = Object.values(data).map(
    (entry) => entry["Kelembapan DHT 2"]
  );

  const minutes = timestamps.map(
    (timestamp) => timestamp.getUTCHours() * 60 + timestamp.getUTCMinutes()
  );
  // Get the canvas element
  const canvas = document.getElementById("myChart");

  // Remove existing canvas if it exists
  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }

  // Create a new canvas element
  const newCanvas = document.createElement("canvas");
  newCanvas.id = "myChart";
  document.getElementById("chart-container").appendChild(newCanvas);

  // Get the 2D context of the new canvas
  const ctx = newCanvas.getContext("2d");

  // Create the chart
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: minutes,
      datasets: [
        {
          label: "Kelembapan DHT 1",
          data: humidityDHT1,
          borderColor: "rgba(75, 192, 192, 1)",
          //borderWidth: 1,
          fill: false,
        },
        {
          label: "Kelembapan DHT 2",
          data: humidityDHT2,
          borderColor: "rgba(255, 99, 132, 1)",
          //borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Time",
          },
          ticks: {
            stepSize: 60, // Set the step size to 60 minutes
            callback: function (value, index, values) {
              // Convert minutes to 'HH:mm'
              const hours = Math.floor(value / 60);
              const minutes = value % 60;
              return `${String(hours).padStart(2, "0")}:${String(
                minutes
              ).padStart(2, "0")}`;
            },
          },
          min: 0,
          max: 1440,
        },
        y: {
          title: {
            display: true,
            text: "Humidity",
          },
          ticks: {
            stepSize: .2,
          },
        },
      },
    },
  });
}

function createChartTemperature(data) {
  // Extracting timestamps and humidity values from the data
  const timestamps = Object.values(data).map(
    (entry) => new Date(entry.Timestamp * 1000)
  );
  const tempDHT1 = Object.values(data).map(
    (entry) => entry["Suhu DHT 1"]
  );
  const tempDHT2 = Object.values(data).map(
    (entry) => entry["Suhu DHT 2"]
  );
  const tempHeater = Object.values(data).map(
    (entry) => entry["Suhu Pemanas"]
  );


  const minutes = timestamps.map(
    (timestamp) => timestamp.getUTCHours() * 60 + timestamp.getUTCMinutes()
  );
  // Get the canvas element
  const canvas = document.getElementById("myChart");

  // Remove existing canvas if it exists
  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }

  // Create a new canvas element
  const newCanvas = document.createElement("canvas");
  newCanvas.id = "myChart";
  document.getElementById("chart-container").appendChild(newCanvas);

  // Get the 2D context of the new canvas
  const ctx = newCanvas.getContext("2d");

  // Create the chart
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: minutes,
      datasets: [
        {
          label: "SUHU DHT 1",
          data: tempDHT1,
          borderColor: "blue",
          //borderWidth: 1,
          fill: false,
        },
        {
          label: "SUHU DHT 2",
          data: tempDHT2,
          borderColor: "green",
          //borderWidth: 1,
          fill: false,
        },
        {
          label: "SUHU Pemanas",
          data: tempHeater,
          borderColor: "red",
          //borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Time",
          },
          ticks: {
            stepSize: 60, // Set the step size to 60 minutes
            callback: function (value, index, values) {
              // Convert minutes to 'HH:mm'
              const hours = Math.floor(value / 60);
              const minutes = value % 60;
              return `${String(hours).padStart(2, "0")}:${String(
                minutes
              ).padStart(2, "0")}`;
            },
          },
          min: 0,
          max: 1440,
        },
        y: {
          title: {
            display: true,
            text: "Temperature",
          },
          ticks: {
            stepSize: .2,
            // callback: function (value, index, values) {
            //   if ((value*10)%2===0) {
            //     return `${String(value)}`;
            //   }
            // },
          },
        },
      },
    },
  });
}


// Event listener for the graphSelect element
document.addEventListener("DOMContentLoaded", () => {
  const graphSelect = document.getElementById("graphSel");
  let checkbox = document.getElementById('myCheckbox');
  let jsonDataFromBackend; // Variable to store the fetched JSON data

  const fetchDataAndPopulateSelect = async () => {
    try {
      const response = await fetch("/getdb");
      jsonDataFromBackend = await response.json();

      // Clear existing options
      graphSelect.innerHTML =
        '<option value="" disabled selected>Select Date</option>';

      // Populate the select element with options from the fetched JSON data
      for (const option in jsonDataFromBackend) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        graphSelect.appendChild(optionElement);
      }
    } catch (error) {
      console.error("Error fetching data options:", error);
    }
  };

  fetchDataAndPopulateSelect();

  graphSelect.addEventListener("change", () => {
    // Get the selected date from the dropdown
    const selectedDate = graphSelect.value;

    // Check if the selected date exists in the JSON data
    if (jsonDataFromBackend[selectedDate]) {
      if (checkbox.checked) {
        createChartTemperature(jsonDataFromBackend[selectedDate])
      } else {
        createChartHumidity(jsonDataFromBackend[selectedDate]);
      }
      
    } else {
      console.error("Data not found for the selected date:", selectedDate);
    }
  });

  checkbox.addEventListener('change', function() {
    const selectedDate = graphSelect.value;
    if (checkbox.checked) {
      createChartTemperature(jsonDataFromBackend[selectedDate]);       
    } else {
      console.log('Checkbox is not checked');
      createChartHumidity(jsonDataFromBackend[selectedDate]);
    }
  });
});
