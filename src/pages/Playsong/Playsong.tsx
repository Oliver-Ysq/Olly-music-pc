import React from "react"
import {RouteComponentProps} from "react-router-dom";

interface IParams {
    id: string
}

const Playsong: React.FC<RouteComponentProps<any, any, IParams>> = (props) => {
    const {match} = props
    return (<div>{match.params.id}</div>)
}

export default Playsong;