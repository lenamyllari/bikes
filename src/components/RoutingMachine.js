import React from 'react';
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

class Routing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map
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
        this.leafletElement.spliceWaypoints(1,1, L.latLng(this.props.destination));
        console.log("getWaypoints ",this.leafletElement.getWaypoints())
        console.log("getPlan ", this.leafletElement.getPlan())
        return this.leafletElement.getPlan()
    }

    setStartpoint=()=>{
        console.log(this.props)
        this.leafletElement.spliceWaypoints(0,1, L.latLng(this.props.station))
        console.log("getWaypoints ",this.leafletElement.getWaypoints())
        console.log("getPlan ", this.leafletElement.getPlan())
        return this.leafletElement.getPlan()
    }

    createLeafletElement() {
        console.log("routing")
        const { map } = this.props;
        let leafletElement = L.Routing.control({
            waypoints: [L.latLng(this.props.position), L.latLng(this.props.destination)]
        }).addTo(map.leafletElement);
        return leafletElement.getPlan();
    }

    render() {
        return null
    }
}
export default withLeaflet(Routing);


