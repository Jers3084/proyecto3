import {
  imprimirFecha,
  cargarPaisesenSelector,
  imprimirDatosPais,
} from "./funciones.js"; //Importa funciones

let myChart1; //inicializa variables
let myChart2;
let myChart3;

//Imprime la fecha actual en la paguina
window.onload = function () {
  imprimirFecha();
};

//Carga la lista de paises existentes en la API de Covid-19 en las opciones del campo de entrada Select
cargarPaisesenSelector();

//Ejecuta la busqueda de datos y la impresion de Graficas cuando se selecciona un pais del campo de entrada Select
const selectElement = document.querySelector(".selector");
selectElement.addEventListener("change", (event) => {
  document.getElementById("loader").style.visibility = "visible";
  var e = document.getElementById("campos");
  var pais = e.value;
  imprimirGraficos(pais); //LLama funcion que consulta datos e imprime graficos
});

//Funcion que consulta los datos de la API e Imprime los datos en Graficas utilizando Chartjs
async function imprimirGraficos(paisBuscado) {
  const cadenaDeBusqueda = "https://corona.lmao.ninja/v2/countries/";
  const cadenaDeBusqueda1 = cadenaDeBusqueda + paisBuscado;
  var response = await fetch(cadenaDeBusqueda1)
    .then((response) => response.json())
    .then((nombres) => {
      const dataArray = [nombres];
      const dataArray1 = [
        {
          Casos: nombres.cases,
        },
      ];
      var nombrePais = paisBuscado;
      var identificador = nombres.countryInfo.iso3;
      var poblacion = nombres.population;
      var latitud = nombres.countryInfo.lat;
      var longitud = nombres.countryInfo.long;
      var continente = nombres.continent;
      var bandera = nombres.countryInfo.flag;
      imprimirDatosPais(
        nombrePais,
        identificador,
        poblacion,
        latitud,
        longitud,
        continente,
        bandera
      );

      const ctx = document.getElementById("myChart1").getContext("2d");

      if (myChart1) {
        myChart1.destroy();
      }

      myChart1 = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Datos de Casos de COVID-19 " + paisBuscado,
              data: dataArray1[0],
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 1)",
              borderColor: "rgb(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });

  const cadenaDeBusqueda2 = cadenaDeBusqueda + paisBuscado;
  response = await fetch(cadenaDeBusqueda2)
    .then((response) => response.json())
    .then((nombres) => {
      const dataArray = [nombres];
      const dataArray2 = [
        {
          Recuperados: nombres.deaths,
        },
      ];
      const ctx = document.getElementById("myChart2").getContext("2d");
      if (myChart2) {
        myChart2.destroy();
      }

      myChart2 = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "# de Muertes por COVID-19 " + paisBuscado,
              data: dataArray2[0],
              backgroundColor: "rgba(200,16,23, 1)",
              borderColor: "rgb(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });

  const cadenaDeBusqueda3 = cadenaDeBusqueda + paisBuscado;
  response = await fetch(cadenaDeBusqueda3)
    .then((response) => response.json())
    .then((nombres) => {
      const dataArray = [nombres];
      const dataArray3 = [
        {
          Activos: nombres.recovered,
        },
      ];
      const ctx = document.getElementById("myChart3").getContext("2d");
      if (myChart3) {
        myChart3.destroy();
      }

      myChart3 = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "# de Recuperados de COVID-19 " + paisBuscado,
              data: dataArray3[0],
              backgroundColor: "rgba(111,203,159, 1)",
              borderColor: "rgb(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      document.getElementById("loader").style.visibility = "hidden";
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}
