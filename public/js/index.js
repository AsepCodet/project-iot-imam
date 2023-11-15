function formatTimestamp(epoch) {
  var date = new Date(epoch * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Convert to local date and time format
}

function fetchDataAndUpdate() {
  fetch('/getData') // Replace with your backend URL
    .then(response => response.json())
    .then(data => {
      // Process the received data, e.g., update HTML elements
      console.log(data); // For demonstration purposes


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
      document.getElementById("kelembapanDHT1").innerHTML = kelembapanDHT1 + " %";
      document.getElementById("suhuDHT1").innerHTML = suhuDHT1 + " °C";
      document.getElementById("kelembapanDHT2").innerHTML = kelembapanDHT2 + " %";
      document.getElementById("suhuDHT2").innerHTML = suhuDHT2 + " °C" ;
      document.getElementById("suhuPemanas").innerHTML =suhuPemanas + " °C" ;
      document.getElementById("timestamp").innerHTML = "Waktu : " + formattedTimestamp;
        // Update HTML elements with the received data
        // Your code to update the HTML with the received data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

setInterval(fetchDataAndUpdate, 1000);