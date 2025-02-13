import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Define libraries array outside component
const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '20px',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 3.1390, // Default coordinates for Kuala Lumpur
  lng: 101.6869
};

function TravelMap({ destination }) {
  const [center, setCenter] = useState(defaultCenter);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries // Use the static libraries array
  });

  const updateMapCenter = useCallback(() => {
    if (window.google && destination) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setCenter({
            lat: location.lat(),
            lng: location.lng()
          });
        }
      });
    }
  }, [destination]);

  useEffect(() => {
    if (isLoaded && destination) {
      updateMapCenter();
    }
  }, [isLoaded, destination, updateMapCenter]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;
  if (!destination) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

TravelMap.propTypes = {
  destination: PropTypes.string.isRequired
};

export default TravelMap;