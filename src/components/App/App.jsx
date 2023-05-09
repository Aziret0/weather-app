import axios from 'axios'
import React, { useState } from 'react'

const App = () => {
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState(null)
    const API_KEY = 'dbe5032c25004b29e4f989730c97b0a8'
    const searchHandler = (e) => {
        e.preventDefault()
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(({data}) =>setWeather(data))
        setCity('')
    }
    const timeHandler = (timeStamp) => {
        const time = new Date(timeStamp * 1000)
        const hour = time.getHours();
        const minutes = time.getMinutes();
        // const sec = time.getSeconds();
        return `${hour} : ${minutes}`
    }
    const inputHandler = (e) => {
        setCity(e.target.value)
    }
  return (
    <div className='app'>
        <div className="app-container">
            <form className="search-form" onSubmit={searchHandler}>
                <input type='text' className="search-form__input" placeholder='Search city' onChange={inputHandler} value={city}></input>
                <button type='submit' className="search-form__btn">Search</button>
            </form>
            <div className="weather">
                <div className="weather-main__info">
                    {
                        weather && (
                            <>
                    <div>{timeHandler(weather.dt)}</div>
                    <div>{weather.name} {weather.sys.country}</div>
                    <div>{weather.weather[0].description}</div>
                    <div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
                       {(weather.main.temp - 275.15).toFixed(2)} °C </div>
                            </>
                        )
                    }
                </div>
                <div className="weather__secondary"></div>
            </div>
        </div>
    </div>
  )
}

export default App