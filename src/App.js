import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import Select from 'react-select';
import BikeMap from './components/BikeMap'
import Weather from './components/Weather'
import styled from 'styled-components'

export const Grid = styled.div`
`;
export const Row = styled.div`
display:flex;
`;
export const Col = styled.div`
flex: ${(props) => props.size};
`;
export default class App extends Component {
    state = {
        data: [],
        chosen: {
            name: "",
            freeBikes: "",
            freeSlots: "",
            lat: "60.170716",
            long: "24.941412"
        },
    };

    options = [];

    render() {
        const mystyle = {
            color: "black",
            backgroundColor: "DodgerBlue",
            padding: "20px",
            fontFamily: "Arial",

        };
        return (
            <div className="App" style={mystyle}>
                <Grid>
                    <Row>
                        <Col size={1} style={mystyle}>
                            <Select
                                placeholder="Select bike station"
                                options={this.options}
                                onChange={this.showData}
                            />
                            <div className="data">
                                <p><b>Selected station: </b> {this.state.chosen.name}</p>
                                <p><b>Free bikes: </b> {this.state.chosen.freeBikes}</p>
                                <p><b>Empty slots: </b> {this.state.chosen.freeSlots}</p>
                            </div>
                            <Weather ></Weather>
                        </Col>
                        <Col size={2}>
                            <BikeMap
                                name={this.state.chosen.name}
                                long={this.state.chosen.long}
                                lat={this.state.chosen.lat}
                                free_bikes={this.state.chosen.freeBikes}
                                empty_slots={this.state.chosen.freeSlots}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

    };

    componentDidMount() {
        axios.get('http://api.citybik.es/v2/networks/citybikes-helsinki')
            .then(res => {
                const names = res.data.network.stations;
                Array.from(names).forEach(element => {
                    this.options.push({"value": element.name, "label": element.name});
                });
                this.setState({data: names});
            })
    };

    showData = (e) => {
        this.state.data.forEach(element => {
            if (element.name == e.value) {
                this.setState({
                        chosen: {
                            name: element.name,
                            freeBikes: element.free_bikes,
                            freeSlots: element.empty_slots,
                            lat: element.latitude,
                            long: element.longitude,
                        }
                    }
                )
            }
        });
    };
}




