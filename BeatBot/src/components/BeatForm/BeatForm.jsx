import React, { useState } from 'react';
import styles from './BeatForm.module.scss';

const BeatForm = () => {
  // state to hold the form answers
  const [formData, setFormData] = useState({
    ageGroup: '',
    mood: '',
    activity: '',
    energy: '',
    genres: [],
    language: 'any',
    count: 10
  });

  // state to handle loading, results, and error messages 
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');

  // Dropdown options for each field 
  const ageGroups = [
    { value: 'under-12', label: 'Under 12' },
    { value: '13-17', label: '13-17' },
    { value: '18-29', label: '18-29' },
    { value: '30-44', label: '30-44' },
    { value: '45-59', label: '45-59' },
    { value: '60+', label: '60+' }
  ];

  const moods = [
    'happy', 'chill', 'sad', 'energetic', 'romantic',
    'nostalgic', 'focused', 'relaxed', 'excited', 'melancholic'
  ];

  const activities = [
    'studying', 'working', 'workout', 'driving', 'cooking',
    'cleaning', 'partying', 'sleeping', 'meditation', 'gaming'
  ];

  const energyLevels = ['low', 'medium', 'high'];

  const availableGenres = [
    'pop', 'rock', 'hip-hop', 'jazz', 'classical', 'electronic',
    'country', 'r&b', 'folk', 'blues', 'reggae', 'metal',
    'indie', 'punk', 'soul', 'funk', 'disco', 'ambient'
  ];

  const languages = [
    { value: 'any', label: 'Any Language' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'arabic', label: 'Arabic' }
  ];

  // function that runs when the user changes a dropdown or text input
  const handleInputChange = (e) => {
    // extracts the field’s name example: mood and its value: happy
    const { name, value } = e.target;
    // updates the FormData state using the previous state (prev)
    setFormData(prev => ({
      ...prev, // copies all the old answers 
      [name]: value // update just the field that changed 
      // If you select "happy" in Mood, this updates formData.mood = "happy".
    }));
  };

  // funtcion that runs when you tick or untick a genre checkbox
  // If the genre is already selected, remove it. If not, add it (but never allow more than 8 selections).
  const handleGenreToggle = (genre) => {
    // updates the FormData state using the previous state (prev)
    setFormData(prev => ({
      // copy over all the existing fields (old answers)
      ...prev,
      // update just the genere field 
      genres:
        // check is this genre already in the array 
        prev.genres.includes(genre)
          ? prev.genres.filter(g => g !== genre) // remove if already checked 
          : [...prev.genres, genre].slice(0, 8) // add if not checked, but only keep the first 8
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page reloading when you submit a form
    setIsLoading(true); // show the loading state
    setError(''); // clear old errors 
    setRecommendation(null); // clear old recommendations 

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // send answers to backend 
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json(); // ai response from backend 
      // if successful store the ai responses to the state 
      setRecommendation(data);
      // if error show an error message 
    } catch (err) {
      setError('Failed to get music recommendation. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false); // always turn off loading at the end 
    }
  };

  // function called when you click on a new recommendation 
  const resetForm = () => {
    setFormData({
      ageGroup: '',
      mood: '',
      activity: '',
      energy: '',
      genres: [],
      language: 'any',
      count: 10
    });
    setRecommendation(null); // resets the form to its initial state 
    setError(''); // clear the last AI results 
  };

  return (
    <div className={styles.beatForm}>
      <h2>Get Your Perfect Music Recommendation</h2>

      {/* if there's no recommendations yet show the form */}
      {!recommendation ? (
        // when you submit it calls hundleSubmit 
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            {/* The label for the dropdown. 
            The "htmlFor" attribute links this label to the <select> with id="ageGroup". 
            The * means this field is required. */}

            <label htmlFor="ageGroup">Age Group *</label>
            <select
              id="ageGroup" // unique id so the label can point to it
              name="ageGroup" // name of the field, matches formData.ageGroup
              value={formData.ageGroup} // controlled input: current value comes from React state
              onChange={handleInputChange} // when user picks something, update state
              required // browser won’t let you submit without selecting a value
            >
              {/* Default option shown first, has empty value so it's invalid until user picks a real one */}
              <option value="">Select Age Group</option>
              
              {/* Loop through the ageGroups array (defined above in the component) */}
              {ageGroups.map(group => (
                 // For each group object, return an <option>
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mood">Mood *</label>
            <select
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Mood</option>
              {moods.map(mood => (
                <option key={mood} value={mood}>
                  {/* Take the first letter, make it uppercase, then add the rest of the word */}
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="activity">Activity *</label>
            <select
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Activity</option>
              {activities.map(activity => (
                <option key={activity} value={activity}>
                  {activity.charAt(0).toUpperCase() + activity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="energy">Energy Level *</label>
            <select
              id="energy"
              name="energy"
              value={formData.energy}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Energy Level</option>
              {energyLevels.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Genres (Select up to 8)</label>
            <div className={styles.genreGrid}>
              {/* shows all genre as checkbox */}
              {availableGenres.map(genre => (
                <label key={genre} className={styles.genreCheckbox}>
                  <input
                    type="checkbox"
                    // the box is ticked if that genre is in the state
                    checked={formData.genres.includes(genre)}
                    // clicking calls handleGenreToggle to add/remove the genre
                    onChange={() => handleGenreToggle(genre)}
                  />
                  <span>{genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="language">Language Preference</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* A slider input for number of tracks, shows the current value next to it  */}
          <div className={styles.formGroup}>
            <label htmlFor="count">Number of Tracks (3-20)</label>
            <input
              type="range"
              id="count"
              name="count"
              min="3"
              max="20"
              value={formData.count}
              onChange={handleInputChange}
              className={styles.rangeSlider}
            />
            <span className={styles.rangeValue}>{formData.count}</span>
          </div>

          {/* if error has a nessage display it  */}
          {error && <div className={styles.error}>{error}</div>}

          {/* Submit button is disabled if: 
          - isLoading (to prevent double clicks)
          - required fields aren’t filled (age, mood, activity, energy). */}
          <button
            type="submit"
            disabled={isLoading || !formData.ageGroup || !formData.mood || !formData.activity || !formData.energy}
            className={styles.submitButton}
          >
            {/* Text changes depending on loading state */}
            {isLoading ? 'Getting Recommendation...' : 'Get Music Recommendation'}
          </button>
        </form>
      ) : (
        // If we do have a recommendation, skip the form and show results
        <div className={styles.recommendation}>
          <h3>{recommendation.title}</h3>
          <p className={styles.explanation}>{recommendation.explanation}</p>

          <div className={styles.metadata}>
            <span>Age: {recommendation.metadata.ageGroup}</span>
            <span>Mood: {recommendation.metadata.mood}</span>
            <span>Activity: {recommendation.metadata.activity}</span>
            <span>Energy: {recommendation.metadata.energy}</span>
          </div>

          <div className={styles.tracks}>
            <h4>Recommended Tracks:</h4>
            {recommendation.tracks.map((track, index) => (
              <div key={index} className={styles.track}>
                <div className={styles.trackInfo}>
                  <strong>{track.title}</strong> by {track.artist}
                </div>
                <div className={styles.trackWhy}>{track.why}</div>
              </div>
            ))}
          </div>

          {/* let the user reset and try again  */}
          <button onClick={resetForm} className={styles.resetButton}>
            Get Another Recommendation
          </button>
        </div>
      )}
    </div>
  );
};

export default BeatForm;