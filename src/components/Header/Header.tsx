import React, {useEffect} from "react"
import {Menu, Modal, notification} from "antd";
import {NavLink as Link} from "react-router-dom";
// @ts-ignore
import url from "../../assets/user.png";
import {Layout} from "antd"
import "./style.scss"
import {observer} from "mobx-react";
import {useStores} from "../../store";
import {useHistory} from "react-router"

const Header = observer(() => {
    const {AuthStore, HomeStore} = useStores()
    const history = useHistory()


    useEffect(() => {
        const loadTasks = [AuthStore.checkLoginState(), HomeStore.getBannerList(), HomeStore.getDailyRecommendList(), HomeStore.getTopList(), HomeStore.getRecommendList()]
        Promise.allSettled(loadTasks).then((res: any) => {
            res.forEach((v: any) => {
                if (v.status === "rejected" && v.reason === 1) {
                    notification["warning"]({
                        message: 'warning！',
                        description: "部分内容需登录后才可查看哦",
                        placement: "bottomRight"
                    });
                }
            })

        })
    }, [HomeStore, AuthStore.nickname, AuthStore])


    const handleLogout = () => {
        AuthStore.logout().then((res) => {
            Modal.success({
                title: "success",
                content: "注销成功",
                onOk() {
                    history.push('/')
                }
            })
        })
    }
    return (
        <Layout.Header style={{width: '100%'}}>
            <div className="logo">Olly Music</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
                <Menu.Item key="singer"><Link to="/singer">歌手</Link></Menu.Item>
                <Menu.Item key="my"><Link to="/my">我的音乐</Link></Menu.Item>
                <div className="profileWrapper">
                    <img src={AuthStore.avaUrl || url} className="profile" alt=""/>
                    <div className="loginBtn">
                        {AuthStore.loginState === 0 ? <Link to="/login">登录</Link> :
                            <Link to="/" onClick={handleLogout}>注销</Link>}
                    </div>
                </div>
            </Menu>

        </Layout.Header>
    )
})

export default Header;