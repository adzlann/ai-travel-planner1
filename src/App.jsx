import { useState } from 'react'
import './App.css'
import { generateItinerary } from './utils/gemini'
import TravelMap from './components/TravelMap'
import Hero from './components/Hero'

function App() {
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState({
    budget: '',
    duration: '',
    interests: []
  });
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generatedItinerary = await generateItinerary(destination, {
        ...preferences,
        budget: preferences.budget // The budget is now in MYR
      });
      setItinerary(generatedItinerary);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Hero />
      <div className="planner-container">
        <h1 
          id="planner-section" 
          className="text-4xl font-bold text-center text-white"
        >
          AI Travel Planner
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="destination">Where do you want to go?</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="budget">Budget (MYR)</label>
            <input
              type="number"
              id="budget"
              value={preferences.budget}
              onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
              placeholder="Enter your budget in MYR"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="duration">Duration (days)</label>
            <input
              type="number"
              id="duration"
              value={preferences.duration}
              onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
              placeholder="Number of days"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </button>
        </form>

        {destination && <TravelMap destination={destination} />}

        {itinerary && (
          <div className="itinerary-result">
            <h2>Your Itinerary</h2>
            <pre>{itinerary}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App