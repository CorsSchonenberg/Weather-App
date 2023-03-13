import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import classes from "./Forecast.module.css";

const WEEKS_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
  "Sunday",
];

const Forecast = ({ props }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEKS_DAYS.slice(dayInAWeek, WEEKS_DAYS.length).concat(
    WEEKS_DAYS.slice(0, dayInAWeek)
  );

  console.log(forecastDays);

  return (
    <React.Fragment>
      <label className={classes.title}>Daily</label>
      <Accordion allowZeroExpanded>
        {props.list.slice(0, 7).map((item, i) => (
          <AccordionItem key={i}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={classes.dailyItem}>
                  <img
                    alt="weather"
                    className={classes.icon}
                    src={`icons/${item.weather[0].icon}.png`}
                  ></img>
                  <label className={classes.day}>{forecastDays[i]}</label>
                  <label className={classes.description}>
                    {item.weather[0].description}
                  </label>
                  <label className={classes.minMax}>
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className={classes.grid}>
                <div className={classes.gridItem}>
                  <label>Pressure</label>
                  <label>{item.main.pressure}hPa</label>
                </div>
                <div className={classes.gridItem}>
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className={classes.gridItem}>
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className={classes.gridItem}>
                  <label>Wind speed</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className={classes.gridItem}>
                  <label>Sea level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className={classes.gridItem}>
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </React.Fragment>
  );
};
export default Forecast;
