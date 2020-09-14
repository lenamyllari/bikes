import React from 'react';
import axios from "axios";

export default class Weather extends React.Component {
    state ={
        img_src: "",
        temp: "",
        feels_like: "",
        humidity: "",
        pressure: "",
        sunrise: "",
        sunset: "",
        windDir: "",
        windSpeed: ""
    };

    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&appid=')
            .then(res => {
                const weather = res.data;
                var tmp = weather.main.temp + "°C";
                var feels_like = weather.main.feels_like + "°C";
                var src =  "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
                var sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
                var sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
                var wind = this.windDegreeToText(weather.wind.deg);
                this.setState({
                    img_src:  src,
                    temp: tmp,
                    feels_like: feels_like,
                    humidity: weather.main.humidity,
                    pressure: weather.main.pressure,
                    sunrise: sunrise,
                    sunset: sunset,
                    windDir: wind,
                    windSpeed: weather.wind.speed
                })
            });
    }

    windDegreeToText(degree){
        if (degree>337.5) return 'Northerly';
        if (degree>292.5) return 'North Westerly';
        if(degree>247.5) return 'Westerly';
        if(degree>202.5) return 'South Westerly';
        if(degree>157.5) return 'Southerly';
        if(degree>122.5) return 'South Easterly';
        if(degree>67.5) return 'Easterly';
        if(degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }

    render() {
        return(
            <div>
            <div style={{border: '2px solid black'}}>
                <h2>Weather in Helsinki</h2>
                <h3>{this.state.temp}<img src={this.state.img_src}/></h3>
                <p>Feels like: {this.state.feels_like}</p>
                <p>Humidity:{this.state.humidity}</p>
                <p>Pressure: {this.state.pressure}</p>
                <p>Sunrise: {this.state.sunrise}</p>
                <p>Sunset: {this.state.sunset}</p>
                <p>{this.state.windDir} wind, {this.state.windSpeed} m/s</p>
            </div>
            </div>
        )
    }
}


