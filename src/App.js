import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import classes from "./App.module.css";
import {WEATHER_API_URL, WEATHER_API_KEY} from "./Api";
import React, {useState, useEffect, useContext} from "react";
import Forecast from "./components/forecast/Forecast";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const backgrounds = {
    "01d": classes.sunnyday,
    "02d": classes.sunnyday,
    "03d": classes.cloudyday,
    "04d": classes.cloudyday,
    "09d": classes.rainyday,
    "10d": classes.rainyday,
    "11d": classes.stormyday,
    "13d": classes.snowyday,
    "50d": classes.foggyday,
    "01n": classes.cloudlessnight,
    "02n": classes.cloudynight,
    "03n": classes.cloudynight,
    "04n": classes.cloudynight,
    "09n": classes.rainynight,
    "10n": classes.rainynight,
    "11n": classes.stormynight,
    "13n": classes.snowynight,
    "50n": classes.foggynight,
}
function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [status, setStatus] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [stats, setStats] = useState(null);
    const [checkLocation, setCheckLocation] = useState(false);
    const getLocation = () => {
        if (!navigator.geolocation) {
            setStats("Geolocation is not supported by your browser");
        } else {
            setStats("Locating...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setStats(null);
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    console.log("Finished Fetching your Location");
                    setCheckLocation(true);
                },
                () => {
                    setStats("unnable to retrieve your location");
                }
            );
        }
    };

    const firstChange = () => {
        if (latitude === null || longitude === null) {
            return;
        }

        setStatus(true);
        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forcastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );

        Promise.all([currentWeatherFetch, forcastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forcastResponse = await response[1].json();

                setCurrentWeather({city: "Your Location", ...weatherResponse});
                setForecast({city: "Your Location", ...forcastResponse});
            })
            .catch((err) => console.log(err));
    };

    const searchChangeHandler = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");


        setStatus(true);
        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forcastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        Promise.all([currentWeatherFetch, forcastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forcastResponse = await response[1].json();

                setCurrentWeather({city: searchData.label, ...weatherResponse});
                setForecast({city: searchData.label, ...forcastResponse});
            })
            .catch((err) => console.log(err));

    };
    console.log(currentWeather)

    let background = classes.defaultBackground;


    if (currentWeather !== null) {
        let weatherIcon = currentWeather.weather[0].icon;
        background = backgrounds[weatherIcon];
    }

    useEffect(() => {
        if (currentWeather != null && forecast != null) {
            setStatus(false);
        }
    }, [currentWeather, forecast]);
    useEffect(() => {
        getLocation();
    }, []);


    useEffect(() => {
        firstChange();
    }, [checkLocation]);

    return (
        <React.Fragment>
            <div>
                <img className={background}></img>
            </div>
            <div className={classes.container}>
                <div className="overlay"/>
                <Search onSearchChange={searchChangeHandler}/>
                {status && (
                    <div className="centered">
                        <LoadingSpinner/>
                    </div>
                )}
                {!status && currentWeather && <CurrentWeather props={currentWeather}/>}
                {!status && forecast && <Forecast props={forecast}/>}
            </div>
        </React.Fragment>
    );
}

export default App;
