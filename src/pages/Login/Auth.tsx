import React, {useEffect, useState} from "react"
import {useStores} from "../../store";
import "./style.scss"
import Setup from "./Setup";
import Login from "./Login";
import { RouteComponentProps } from "react-router-dom";

interface IProps {
    routerProps: RouteComponentProps
}

const Auth: React.FC<IProps> = (props) => {

    const [pageState, setPageState] = useState(0)
    const {AuthStore} = useStores()
    useEffect(() => {
        (async function () {
        })()
    }, [AuthStore])


    return (
        <div className="wrapper">
            {pageState === 0 ? <Login history={props.routerProps.history} setPageState={setPageState}/> : <Setup setPageState={setPageState}/>}
        </div>
    )
}
export default Auth;