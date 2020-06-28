import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
});

  const [consulta, guardarConsultar] = useState(false);
  const {ciudad, pais} = busqueda;
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  useEffect(() => {
    const consultarAPI = async () =>{
      if(consulta){
        const appId = '297f13ee95e0148b9570550769d42786';
        const url =`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }

      }
    }
    consultarAPI();
    // eslint-disable-next-line
  }, [consulta]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header
        titulo = 'Clima react app'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 sm12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 sm12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
