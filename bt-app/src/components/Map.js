import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoiYTQ5Y2hvd2QiLCJhIjoiY2xyd29oNnQ2MHBpOTJocDhyMnQ1dGhwbyJ9.Pt2jYX2VZNFlLbkAMIYj7Q";

const Map = () => {
  const mapContainerRef = useRef(null);
  const markerElement = document.createElement('div');
    

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Specify the map's style
      center: [-79.35276, 43.66583], // Specify the starting position [lng, lat]
      zoom: 15, // Specify the starting zoom
    });

    // Add navigation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create a custom HTML element for the marker
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker'; // Apply a class for styling
    markerElement.style.width = '40px'; // Set the width
    markerElement.style.height = '40px'; // Set the height
    markerElement.style.background = 'red'; // Set the background color to red
    markerElement.style.borderRadius = '50%'; // Make it a circle

    // Add the custom marker to the map
    new mapboxgl.Marker(markerElement)
      .setLngLat([-79.35276, 43.66583]) // Replace with your desired longitude and latitude
      .addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, []); // Empty array ensures the effect runs only once

  return <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
