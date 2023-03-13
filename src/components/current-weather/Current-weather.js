import classes from "./Current-weather.module.css";

const CurrentWeather = ({props}) => {
  return (
    <div className={classes.weather}>
      <div className={classes.top}>
        <div>
          <p className={classes.city}>{props.city}</p>
          <p className={classes.weatherdescription}>{props.weather[0].description}</p>
        </div>
        <img 
          alt="weather"
          className={classes.weathericon}
          src={`icons/${props.weather[0].icon}.png`}
        />
      </div>
      <div className={classes.bottom}>
        <p className={classes.temperature}>{Math.round(props.main.temp)}°C</p>
        <div className={classes.details}>
          <div className={classes.row}>
            <span className={classes.label}>Details</span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Feels like</span>
            <span className={classes.value}>{Math.round(props.main.feels_like)}°C</span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Wind</span>
            <span className={classes.value}>{props.wind.speed} m/s</span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Humidity</span>
            <span className={classes.value}>{props.main.humidity}%</span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Pressure</span>
            <span className={classes.value}>{props.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
