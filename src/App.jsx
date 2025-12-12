import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=96a5c202258e1dd5c44976fb0da23fbc`

  const getWeatherIcon = (weather) => {
    if (!weather) return <WiDaySunny />
    const main = weather[0].main.toLowerCase()
    switch (main) {
      case 'clear': return <WiDaySunny />
      case 'clouds': return <WiCloudy />
      case 'rain': return <WiRain />
      case 'snow': return <WiSnow />
      case 'thunderstorm': return <WiThunderstorm />
      case 'fog':
      case 'mist':
      case 'haze': return <WiFog />
      default: return <WiDaySunny />
    }
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true)
      setError('')
      axios.get(url).then((response) => {
        setData(response.data)
        setLoading(false)
      }).catch((err) => {
        setError('Location not found. Please try again.')
        setData({})
        setLoading(false)
      })
      setLocation('')
    }
  }

  return (
    <>
      <div className='app'>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter location'
            type="text" />
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              <div className="weather-icon">
                {getWeatherIcon(data.weather)}
              </div>
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name && !loading &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
