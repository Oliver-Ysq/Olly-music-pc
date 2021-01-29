import React, {lazy, Suspense} from "react";
import "./style/normalize.scss";
import "./style/app.scss"
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import My from "./pages/My/My";
import {Layout} from 'antd';

const SingerInfo = lazy(() => import( "./pages/SingerInfo/SingerInfo"))
const AlbumInfo = lazy(() => import("./pages/AlbumInfo/AlbumInfo"))
const Auth = lazy(() => import("./pages/Login/Auth"))
const Singer = lazy(() => import("./pages/Singer/Singer"))
const Header = lazy(() => import("./components/Header/Header"))
const Footer = lazy(() => import("./components/Footer/Footer"))
const Playsong = lazy(() => import("./pages/Playsong/Playsong"))


let App: React.FC = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Layout style={{minHeight: '100vh'}}>
                <Header/>
                <Layout.Content className="site-layout">
                    <div className="site-layout-background" style={{padding: 24, flex: 1}}>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/my" component={My}/>
                            <Route path="/singer" component={Singer}/>
                            <Route path="/login" render={(routerProps) => <Auth routerProps={routerProps}/>}/>
                            <Route path="/playsong/:id" component={Playsong}/>
                            <Route path="/singerInfo" component={SingerInfo}/>
                            <Route path="/albumInfo/:id" component={AlbumInfo}/>
                            <Redirect from="/*" to="/"/>
                        </Switch>
                    </div>
                </Layout.Content>
                <Footer/>
            </Layout>
        </Suspense>
    )
}

export default App;
