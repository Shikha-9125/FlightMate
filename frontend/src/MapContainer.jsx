import React, { useEffect, useRef } from "react";

const MapContainer = ({ source, destination, route }) => {
  const mapContainerRef = useRef(null); // Reference for the map container

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    // Create a DirectionsService object to use the route
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    // Define request for route
    const request = {
      origin: source, // Source
      destination: destination, // Destination
      travelMode: window.google.maps.TravelMode.DRIVING, // Or you can use other travel modes like WALKING, BICYCLING
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [source, destination]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }}></div>;
};

export default MapContainer;
