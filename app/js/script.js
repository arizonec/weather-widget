const link = 'http://api.weatherstack.com/current?access_key=4f78f019fe6cc78cdcbae6b2fa4981e8';

const root = document.getElementById('root');

let store = {
    city: 'London',
    feelslike: 0,
    cloudcover: 0,
    temperature: 0,
    humidity: 0,
    observationTime: '00:00 AM',
    pressure: 0,
    uvIndex: 0,
    visibility: 0,
    isDay: 'yes', 
    weatherDescription: '',
    windSpeed: 0,
} 

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();

    console.log(data)

    const {
        current: {
            feelslike,
            cloudcover,
            temperature,
            humidity,
            observation_time: observationTime,
            pressure,
            uv_index: uvIndex,
            visibility,
            is_day: isDay, 
            weather_descriptions: weatherDescription,
            wind_speed: windSpeed,
        }
    } = data;

    store = {
        ...store,
        feelslike,
        cloudcover,
        temperature,
        humidity,
        observationTime,
        pressure,
        uvIndex,
        visibility,
        isDay, 
        windSpeed,
        weatherDescription: weatherDescription[0],
    };

    renderComponents();
};

const findImg = (weatherDescription) => {
    if(weatherDescription === 'Overcast') return 'the.img';
}

const markUp = () => {
    const {city, weatherDescription, observationTime, temperature} = store;

    return `<div class="container">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="../images/${findImg(weatherDescription)}" alt="" />
                <div class="description">${weatherDescription}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties"></div>
      </div>`
};

const renderComponents = () => {
    root.innerHTML = markUp();
};

fetchData();