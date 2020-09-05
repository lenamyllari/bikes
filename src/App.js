import React from 'react';
import axios from 'axios'
import './App.css';
import Select from 'react-select';

export default class App extends React.Component{
    state = {
        data: [],
        chosen: {
            name: "",
            freeBikes: "",
            freeSlots: "",
        },
    };

    options = [];

    render() {
        const mystyle ={
            color: "black",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
        };
        return (
            <div className="App" style={mystyle}>
                    <Select
                        placeholder="Select bike station"
                        options={this.options}
                        onChange={this.showData}
                    />
                <div className="data" >
                            <p><b>Selected station: </b> {this.state.chosen.name}</p>

                    <p><b>Free bikes: </b> {this.state.chosen.freeBikes}</p>

                    <p><b>Empty slots: </b> {this.state.chosen.freeSlots}</p>
                    </div>
                </div>

        );

    };
    componentDidMount(){
        axios.get('http://api.citybik.es/v2/networks/citybikes-helsinki')
            .then(res =>{
                const names = res.data.network.stations;
                console.log(names);
                Array.from(names).forEach(element => {
                    this.options.push({"value": element.name, "label": element.name});
                });
                this.setState({data: names});
                console.log(this.state.data)
            })
    };

    showData= (e)  => {
        this.state.data.forEach(element => {
            if (element.name ==e.value){
                this.setState({chosen: {
                    name: element.name,
                    freeBikes: element.free_bikes,
                    freeSlots: element.empty_slots,
                    }
                }
            )}
        });
    };
}




