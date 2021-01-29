import React from "react";
import "./style/normalize.scss";
import "./style/app.scss"
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import My from "./pages/My/My";
import {Layout} from 'antd';
import SingerInfo from "./pages/SingerInfo/SingerInfo";
import AlbumInfo from "./pages/AlbumInfo/AlbumInfo";
import Auth from "./pages/Login/Auth";
import Singer from "./pages/Singer/Singer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


let App: React.FC = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header/>
            <Layout.Content className="site-layout">
                <div className="site-layout-background" style={{padding: 24, flex: 1}}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/my" component={My}/>
                        <Route path="/singer" component={Singer}/>
                        <Route path="/singerInfo" component={SingerInfo}/>
                        <Route path="/albumInfo" component={AlbumInfo}/>
                        <Route path="/login" render={(routerProps) => <Auth routerProps={routerProps}/>}/>
                    </Switch>
                </div>
            </Layout.Content>
            <Footer/>
        </Layout>
    )
}

export default App;
