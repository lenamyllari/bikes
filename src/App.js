import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import Select from 'react-select';
import Weather from './components/Weather'
import styled from 'styled-components'
import { Map, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Routing from "./components/RoutingMachine";

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
        destination: {
            lat:"",
            long:""
        },
        isMapInit: false,
        destLat: "60.170716",
        destLong: "24.941412"
    };

    options = [];

    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: false});

    };

    render() {
        const mystyle = {
            color: "black",
            backgroundColor: "DodgerBlue",
            padding: "20px",
            fontFamily: "Arial",

        };

        const position = this.state.chosen
        const destination = this.state.destination;

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
                            <h3>Choose the destination bike station</h3>
                            <Select
                                placeholder="Select destination station"
                                options={this.options}
                                onChange={this.getRoute}
                            />
                            <Weather ></Weather>

                        </Col>
                        <Col size={2}>
                            <Map center={[position.lat, position.long]} zoom={15}
                                 style={{ width: '100%', height: '700px'}}
                                 ref={this.saveMap}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker
                                    position={[
                                        position.lat,
                                        position.long
                                    ]}
                                    onClick={() => {
                                        this.setState({activeStation: this.state.chosen.name});
                                    }}
                                />
                                {this.state.activeStation && (<Popup
                                    position={[
                                        position.lat,
                                        position.long
                                    ]}
                                    onClose={() => {
                                        this.setState({activeStation: null});
                                    }}
                                >
                                    <div>
                                        <h2>{this.state.chosen.name}</h2>
                                        <p>Free bikes: {this.state.chosen.free_bikes}</p>
                                        <p>Empty slots: {this.state.chosen.empty_slots}</p>
                                    </div>
                                </Popup>)}
                                {this.state.isMapInit && <Routing map={this.map} position={[position.lat, position.long]} destination={[destination.lat, destination.long]}/>}
                            </Map>
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
                    this.options.push({"value": element.name, "label": element.name, "latitude": element.latitude, "longitude": element.longitude,
                    "free_bikes": element.free_bikes, "empty_slots": element.empty_slots});
                });
                this.setState({data: names});
            })
    };

    showData = (e) => {
        //this.setState({isMapInit: false});
        this.setState({
                chosen: {
                    name: e.name,
                    freeBikes: e.free_bikes,
                    freeSlots: e.empty_slots,
                    lat: e.latitude,
                    long: e.longitude,
                }})
    };

    getRoute = (e) => {
        this.setState({
                destination: {
                    lat: e.latitude,
                    long: e.longitude
                        }
                    }, () => this.getDestination()
                )

    }

    getDestination =() => {
        this.setState({isMapInit: true}, () => console.log(this.state.isMapInit));
    };




}




