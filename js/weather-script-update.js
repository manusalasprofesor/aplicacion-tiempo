// Almacenamos las claves API de dos servicios
const apiClave = '****************************************'; // Sustituye por tu clave de Openweather
const apiKeyPexels = '****************************************'; // Reemplaza con tu clave de pexels

// Esperamos a que cargue el DOM
window.addEventListener('DOMContentLoaded', ()=>{
    // Seleccionamos los elementos del DOM
    let temperaturaValor = document.querySelector('#temperatura-valor');
    let temperaturaDescripcion = document.querySelector('#temperatura-descripcion');
    let ubicacion = document.querySelector('#ubicacion');
    let iconoDom = document.querySelector('#icono-animado');
    let vientoVelocidad = document.querySelector('#viento-velocidad');

    // Verificamos la geolocalización
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (posicion) =>{
            let longitud = posicion.coords.longitude;
            let latitud = posicion.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiClave}&units=metric&lang=es`;

            try{
                const response = await fetch(url);
                const datos = await response.json();

                let temperatura = Math.round(datos.main.temp);
                temperaturaValor.textContent = `${temperatura} °C`;
                ubicacion.textContent = datos.name;
                temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
                vientoVelocidad.textContent = `${datos.wind.speed} m/s`;

                let icono = datos.weather[0].main;
                iconoDom.src = obtenerIcono(icono);
            }
            catch (error){
                console.error('Error en la petición de OpenWeather: ', error);
            }
        });
    }
});


// Seleccionamos la ciudad introducida por el usuario
document.querySelector('#consulta').addEventListener('click', () =>{
    let ciudad = document.querySelector('#ciudad').value;
    if (ciudad){
        obtenerDatosCiudad(ciudad);
        cambiarFondoCiudad(ciudad);
    }
});

document.querySelector('#ciudad').addEventListener('keyup', (event) =>{
    if (event.key === 'Enter'){
        let ciudad = document.querySelector('#ciudad').value;
        if (ciudad){
            obtenerDatosCiudad(ciudad);
            cambiarFondoCiudad(ciudad);
        } 
    }
});

// Obtenemos los datos del clima de la ciudad introducida por el usuario
const obtenerDatosCiudad = async (ciudad) =>{
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiClave}&units=metric&lang=es`

    try{
        const response = await fetch(urlCity);
        const datos = await response.json();

        document.querySelector('#temperatura-valor-usuario').textContent = `${Math.round(datos.main.temp)} °C`;
        document.querySelector('#ubicacion-usuario').textContent = datos.name;
        document.querySelector('#temperatura-descripcion-usuario').textContent = datos.weather[0].description.toUpperCase();
        document.querySelector('#viento-velocidad-usuario').textContent = `${datos.wind.speed} m/s`;
        document.querySelector('#icono-animado-usuario').src = obtenerIcono(datos.weather[0].main);

    }
    catch (error){
        console.error('Error en la petición de OpenWeather: ', error);
    }
};


// Cambiar el fondo de la app por la fotografía de la ciudad del usuario
const cambiarFondoCiudad = async (ciudad) =>{
    try{
        const urlPexels = `https://api.pexels.com/v1/search?query=${ciudad}&per_page=1`;
        const response = await fetch(urlPexels, {
            headers: {Authorization: apiKeyPexels}
        });

        const datos = await response.json();

        document.body.style.backgroundImage = `url('${datos.photos[0].src.large}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }
    catch (error){
        console.error('Error al cargar la petición de Pexels: ', error);
    }
};

// Función para obtener el icono del clima
const obtenerIcono = (icono) => {
    switch(icono){
        case 'Clouds': return 'img/cloudy-day-1.svg';
        case 'Clear': return 'img/day.svg';
        case 'Snow': return 'img/snowy-1.svg';
        case 'Rain': return 'img/rainy-1.svg';
        case 'Drizzle': return 'img/rainy-2.svg';
        case 'Thunderstorm': return 'img/thunder.svg';
        case 'Atmosphere': return 'img/weather.svg';
        default: return 'img/weather_sunset.svg';
    }
};
