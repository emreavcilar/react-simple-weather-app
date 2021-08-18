import { useEffect, useState } from "react";


function App() {
  const [temp, setTemp] = useState(null);
  const [coords, setCoords] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => setCoords(coords));
  }, []);

  useEffect(() => {
    if (!coords) {
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setTemp(data?.main?.temp));
  }, [coords])

  return (
    <div className="App">
      <div>Weather</div>
      <div>{temp === null ? 'n/a' : temp}&deg;</div>
    </div>
  );
}

export default App;