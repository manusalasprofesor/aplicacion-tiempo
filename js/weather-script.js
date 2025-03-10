// Declaración de variables
const apiClave = 'a9a0c550e7617ee2a2601fa5dc985f49';

// Consulta por ubicación del usuario
window.addEventListener('load', ()=>{
    // Declaramos variables para los objetos del DOM
    let temperaturaValor = document.querySelector('#temperatura-valor');
    let temperaturaDescripcion = document.querySelector('#temperatura-descripcion');
    let ubicacion = document.querySelector('#ubicacion');
    let iconoDom = document.querySelector('#icono-animado');
    let vientoVelocidad = document.querySelector('#viento-velocidad');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            // console.log(posicion);
            // console.log(posicion.coords.latitude);
            // console.log(posicion.coords.longitude);
            let longitud = posicion.coords.longitude;
            let latitud = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiClave}&units=metric&lang=es`;

            fetch(url)
                .then (response => response.json())
                // .then (json => console.log(json))
                .then (datos =>{
                    let temperatura = Math.round(datos.main.temp);
                    temperaturaValor.textContent = `${temperatura} °C`;
                    ubicacion.textContent = datos.name;
                    temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
                    let icono = datos.weather[0].main;
                    iconoDom.src = obtenerIcono(icono);
                    vientoVelocidad.textContent = `${datos.wind.speed} m/s`;
                })
                .catch(err => console.log('Error: ', err));
        });
    }
});

// Función para obtener el icono animado
const obtenerIcono = (icono) =>{
    switch (icono){
        case 'Clouds': 
            return 'img/cloudy-day-1.svg';
        case 'Clear':
            return 'img/day.svg';
        case 'Snow':
            return 'img/snowy-1.svg';
        case 'Rain':
            return 'img/rainy-1.svg';
        case 'Drizzle':
            return 'img/rainy-2.svg';
        case 'Thunderstorm':
            return 'img/thunder.svg';
        case 'Atmosphere':
            return 'img/weather.svg';
        default:
            return 'img/weather_sunset.svg';        
    }
}