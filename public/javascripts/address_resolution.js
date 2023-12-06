let autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry"],
    }
  );
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", getAddress);
}

function getAddress() {
  console.log(autocomplete.getPlace());
  const place = autocomplete.getPlace();
  if (!place.geometry) {
    console.log("No details available for input: '" + place.name + "'");
    return;
  }

  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");

  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();

  latitudeInput.value = latitude;
  longitudeInput.value = longitude;
}

function loadGoogleMapsApi() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", loadGoogleMapsApi);
