import React from 'react';
import { Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default class BikeMap extends React.Component {

    state = {
        name: this.props.name,
        freeBikes: this.props.free_bikes,
        freeSlots: this.props.empty_slots,
        lat: this.props.lat,
        long: this.props.long,
        zoom: 13,
        activeStation: null,
    };

    render() {

        return (
            <Map center={[this.props.lat, this.props.long]} zoom={15}
                 style={{ width: '100%', height: '700px'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker


                    position={[
                    this.props.lat,
                    this.props.long
                ]}
                        onClick={() => {
                            this.setState({activeStation: this.props.name});
                        }}
                />
                {this.state.activeStation && (<Popup
                    position={[
                        this.props.lat,
                        this.props.long
                    ]}
                   onClose={() => {
                                this.setState({activeStation: null});
                    }}
                >
                    <div>
                        <h2>{this.props.name}</h2>
                        <p>Free bikes: {this.props.free_bikes}</p>
                        <p>Empty slots: {this.props.empty_slots}</p>
                    </div>
                </Popup>)}
            </Map>


        )
    }
}
