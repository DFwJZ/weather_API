let autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
      componentRestrictions: { country: "us" },
      // Avoid paying for data that you don't need
      fields: ["geometry"],
    }
  );

  // When the user selects an address from the drop-down, populate the coordinates
  autocomplete.addListener("place_changed", getAddress);
}

function getAddress() {
  // Extracting latitude and longitude from selected place
  console.log(autocomplete.getPlace());
  const place = autocomplete.getPlace();
  if (!place.geometry) {
    console.log("No details available for input: '" + place.name + "'");
    return;
  }

  // Populate the latitude and longitude fields and extract from client side, not server side
  // NEED TO FIX THIS
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");

  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();

  latitudeInput.value = latitude;
  longitudeInput.value = longitude;
}

function loadGoogleMapsApi() {
  // Dynamically loading the Google Maps API script
  const script = document.createElement("script");
  script.src = `/google-maps-api`;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", loadGoogleMapsApi);
