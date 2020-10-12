import React from 'react';
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

class Routing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map,
            leafletElement: null
        }
    }

    componentDidMount() {
        this.createLeafletElement()
    }

    componentDidUpdate(){
        console.log("update")
        this.setStartpoint()
        this.setEndpoint()
    }

    setEndpoint=()=>{
        console.log(this.props)
        this.state.leafletElement.spliceWaypoints(1,1, L.latLng(this.props.destination));
        console.log("getWaypoints ",this.state.leafletElement.getWaypoints())
        console.log("getPlan ", this.state.leafletElement.getPlan())
        return this.state.leafletElement.getPlan()
    }

    setStartpoint=()=>{
        console.log(this.props)
        this.state.leafletElement.spliceWaypoints(0,1, L.latLng(this.props.position))
        console.log("getWaypoints ",this.state.leafletElement.getWaypoints())
        console.log("getPlan ", this.state.leafletElement.getPlan())
        return this.state.leafletElement.getPlan()
    }

    createLeafletElement() {
        console.log("routing")
        const { map } = this.props;
        this.state.leafletElement = L.Routing.control({
            waypoints: [L.latLng(this.props.position), L.latLng(this.props.destination)]
        }).addTo(map.leafletElement);
        return this.state.leafletElement.getPlan();
    }

    render() {
        return null
    }
}
export default withLeaflet(Routing);


