const link = 'http://api.weatherstack.com/current?access_key=4f78f019fe6cc78cdcbae6b2fa4981e8';

const fetchData = async () => {
    const result = await fetch(`${link}&query=London`);
    const data = await result.json();


    console.log(data);
}

fetchData();