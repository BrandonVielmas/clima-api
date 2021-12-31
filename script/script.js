//clase consulta a la api
class Clima{
    constructor(ciudad,pais){
        this.apiKey = '45e80954b43d6d138c08cd359938a7e0';
        this.ciudad = ciudad;
        this.pais = pais;
    };

    async obtenerClima(){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.ciudad},${this.pais}&appid=${this.apiKey}&units=metric`;
        const respuesta = await fetch(url);
        const datos = respuesta.json();
        //console.log(datos);
        return datos;
    };

    cambiarLocalizacion(ciudad,pais){
        this.ciudad = ciudad;
        this.pais = pais;
    };
};

//clase para pintar
class Pintar{
    constructor(){
        this.localizacion = document.getElementById("clima-localizacion");
        this.descripcion = document.getElementById("clima-descripcion");
        this.string = document.getElementById("clima-string");
        this.humedad = document.getElementById("clima-humedad");
        this.viento = document.getElementById("clima-viento");
    }

    render(clima){
        this.localizacion.textContent = clima.name + ' / ' + clima.sys['country'];
        this.descripcion.textContent = clima.weather[0]['description'];
        this.string.textContent = clima.main.temp + ' °C';
        this.humedad.textContent = 'Humedad: ' + clima.main.humidity + '%';
        this.viento.textContent = 'Viento: a ' + clima.wind.speed + ' m/s';
        if(clima.main.humidity < 30){
            document.getElementById("img-clima").src="./img/sol.png";
        }else if(clima.main.humidity > 30 && clima.main.humidity < 50){
            document.getElementById("img-clima").src="./img/nublado.png"
        }
        else{
            document.getElementById("img-clima").src="./img/lluvioso.png";
        }
    }

};

//controladora
const pintar = new Pintar();
const clima = new Clima('Mexico','MX');

async function buscarClima(){
    const datos = await clima.obtenerClima();
    pintar.render(datos);
}

document.getElementById('btn-clima').addEventListener('click', (e) => {
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;     
    clima.cambiarLocalizacion(ciudad,pais);
    buscarClima();
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded',buscarClima());