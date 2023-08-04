import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReviewCard from './ReviewCard';

function Map() {
  const [showCard, setShowCard] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([39.04696459696062, -94.61748984637259], 13);

    // Add a tile layer using OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Rest of your map logic...

    // Adding toilet icon for map marker
    const toiletIcon = L.divIcon({
      className: 'map-icon',
      html: '<i class="fas fa-toilet"></i>',
      iconSize: [33, 33],
    });

    function onMapClick(e) {
      console.log('Clicked coordinates:', e.latlng.lat, e.latlng.lng);
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      setShowCard(true);

      const marker = L.marker([latitude, longitude], { icon: toiletIcon }).addTo(map);

      // Temporary popup content
      // const popupContent = "Annie's bathroom: Amazing cat rug, but make sure you hide the toilet paper!";
      // marker.bindPopup(popupContent).openPopup();

      // Store the location data with a unique identifier
      const locationId = Math.random().toString(36).substring(7);
      const newLocation = {
        id: locationId,
        latitude,
        longitude,
        reviews: [],
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
    }

    map.on('click', onMapClick);

    return () => {
      // Clean up map when component is unmounted
      map.remove();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('rating:', rating);
    console.log('description:', description);
    const locationId = locations[locations.length - 1].id;
    const newReviewData = {
      id: Math.random().toString(36).substring(7),
      rating,
      description,
    };
    setReviewData(newReviewData);

    setLocations((prevLocations) =>
      prevLocations.map((location) => {
        if (location.id === locationId) {
          return {
            ...location,
            reviews: [...location.reviews, newReviewData],
          };
        }
        return location;
      })
    );
  };

  return (
    <div>
      <div id="map" style={{ height: '400px' }}></div>
      {showCard && reviewData && (
        <ReviewCard reviewData={reviewData}/>
      )}
      {showCard && !reviewData && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="rating">Cleanliness Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Map;
