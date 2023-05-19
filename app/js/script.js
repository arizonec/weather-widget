const link = 'http://api.weatherstack.com/current?access_key=d05a1b0f7aa73e208deab56aac8b032f';

const root = document.getElementById('root');
const popup = document.getElementById('popup');
const textInput = document.getElementById('text-input');
const form = document.getElementById('form');
const close = document.getElementById('close');

let store = {
    city: 'Miami',
    temperature: 0,
    observationTime: '00:00 AM',
    isDay: 'yes', 
    weatherDescription: '',
    properties: {
      cloudcover: {},
      humidity: {},
      windSpeed: {},
      visibility: {}, 
      uvIndex: {},
      pressure: {},
    }
} 

const fetchData = async () => {
    try {
      const query = localStorage.getItem('query') || store.city;
      const result = await fetch(`${link}&query=${query}`);
      const data = await result.json();
      
      const {
        current: {
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
        },
        location: {
          name,
        }
    } = data;

    store = {
        ...store,
        city: name,
        temperature,
        observationTime,
        isDay, 
        weatherDescription: weatherDescription[0],
        properties: {
          cloudcover: {
            title: 'cloudcover',
            value: `${cloudcover}%`,
            icon: 'cloud.png',
          },
          humidity: {
            title: 'humidity',
            value: `${humidity}%`,
            icon: 'humidity.png',
          },
          windSpeed: {
            title: 'windSpeed',
            value: `${windSpeed} m/s`,
            icon: 'wind.png',
          },
          visibility: {
            title: 'visibility',
            value: `${visibility}%`,
            icon: 'visibility.png',
          }, 
          uvIndex: {
            title: 'uvIndex',
            value: `${uvIndex} / 100`,
            icon: 'uv-index.png',
          },
          pressure: {
            title: 'pressure',
            value: `${pressure}%`,
            icon: 'gauge.png',
          },
        }
    };

    renderComponents();
    } catch(err) {
      console.log(err);
    }

    
};

const findImg = (weatherDescription) => {
    const value = weatherDescription.toLowerCase();

    switch(value) {
      case 'partly cloudy': return 'partly.png';
      case 'sunny': return 'sunny.png';
      case 'cloud': return 'cloud.png';
      case 'fog': return 'fog.png';
      case 'clear': return 'clear.png';
      default: return 'the.png';
    };
};

const renderProperty = (properties) => {
  return Object.values(properties).map(({title, value, icon}) => {
    return `<div class="property">
    <div class="property-icon">
      <img src="images/icons/${icon}" alt="">
    </div>
    <div class="property-info">
      <div class="property-info__value">${value}</div>
      <div class="property-info__description">${title}</div>
    </div>
  </div>`;
  }).join('');
};

const markUp = () => {
    const {city, weatherDescription, observationTime, temperature, isDay, properties} = store;
    const containerClass = isDay === 'yes' ? 'is-day' : '';

    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="images/${findImg(weatherDescription)}" alt="" />
                <div class="description">${weatherDescription}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`
};

const renderComponents = () => {
    root.innerHTML = markUp();
    const city = document.getElementById('city');
    city.addEventListener('click', handleClick);
};

const handleClick = () => {
  popup.classList.toggle('active');
};

const handleClose = () => {
  popup.classList.remove('active');
};



const handleInput = (event) => {
  store = {
    ...store,
    city: event.target.value,
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const value = store.city

  if (!value) return null;

  localStorage.setItem('query', value);

  fetchData();
  handleClick();
}

form.addEventListener('submit', handleSubmit);
textInput.addEventListener('click', handleInput);
close.addEventListener('click', handleClose);

fetchData();