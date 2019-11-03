import React, {Component} from 'react';
import Header from './componentes/Header';
import AgregarCita from './componentes/AgregarCita';
import ListaCitas from './componentes/ListaCitas';

import './css/index.css';
import './bootstrap.min.css';

class App extends Component {

  state = {
    citas: []
  }

  //Se ejecuta cuando todo esta cargado
  componentDidMount(){
    const citasLS = localStorage.getItem(`citas`);
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  //Se ejecuta antes de que todo este cargado
  componentWillMount(){

  }

  //Se ejecuta al cerrar el componente
  componentWillUnmount(){

  }

  //Se ejecuta si hay algun cambio 
  componentDidUpdate(){
    localStorage.setItem(
      'citas',
      //convertimos a JSON el String
      JSON.stringify(this.state.citas)
    )
  }

  crearCita = (nuevaCita) => {
    const citas = [...this.state.citas, nuevaCita];
    this.setState({
      citas
    });
  }

  borrarCita = id => {
    //Obtener copia del state
    const citasActuales = [...this.state.citas];

    //borrar el elemento del state
    const citas = citasActuales.filter(cita => cita.id !== id);

    //Actualizar el state
    this.setState({
      citas
    });
  }

  render(){
    return (
      <div className="container">
        <Header 
          titulo={'Administrador de pacientes de veterinaria'}
        />
        <div className="row">
          <div className="col-md-6">
            <AgregarCita 
              crearCita={this.crearCita}
            />
          </div>
          <div className="col-md-6">
            <ListaCitas 
              citas={this.state.citas}
              borrarCita={this.borrarCita}
            />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
