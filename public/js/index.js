function formatTimestamp(epoch) {
  var date = new Date(epoch * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Convert to local date and time format
}

function fetchDataAndUpdate() {
  fetch('/getData') // Replace with your backend URL
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      // Process the received data, e.g., update HTML elements
      // console.log(data);

      // Update individual variables
      var kelembapanDHT1 = data["Kelembapan DHT 1"];
      var kelembapanDHT2 = data["Kelembapan DHT 2"];
      var suhuDHT1 = data["Suhu DHT 1"];
      var suhuDHT2 = data["Suhu DHT 2"];
      var suhuPemanas = data["Suhu Pemanas"];
      var timestamp = data["Timestamp"];

      // Convert epoch timestamp to human-readable date and time
      var formattedTimestamp = formatTimestamp(timestamp);

      // Update the HTML content with individual variables
      document.getElementById("kelembapanDHT1").innerHTML = kelembapanDHT1.toFixed(0) + " %";
      document.getElementById("suhuDHT1").innerHTML = suhuDHT1.toFixed(1) + " °C";
      document.getElementById("kelembapanDHT2").innerHTML = kelembapanDHT2.toFixed(0) + " %";
      document.getElementById("suhuDHT2").innerHTML = suhuDHT2.toFixed(1) + " °C";
      document.getElementById("suhuPemanas").innerHTML = suhuPemanas.toFixed(2) + " °C";
      //document.getElementById("timestamp").innerHTML = "Waktu : " + formattedTimestamp;
    })
    .catch(error => {
      // Handle errors more gracefully, e.g., display a message to the user
      console.error('Error fetching data:', error);
    });
}

setInterval(fetchDataAndUpdate, 1000);
