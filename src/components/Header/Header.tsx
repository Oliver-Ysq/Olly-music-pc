import React, {useEffect} from "react"
import {Menu, Modal} from "antd";
import {NavLink as Link} from "react-router-dom";
// @ts-ignore
import url from "../../assets/user.png";
import {Layout} from "antd"
import "./style.scss"
import {observer} from "mobx-react";
import {useStores} from "../../store";
import {useHistory} from "react-router"

const Header = observer(() => {
    const {AuthStore} = useStores()
    const history = useHistory()

    useEffect(() => {
        (async function () {
            let res = await AuthStore.checkLoginState()
            if (res.account !== null) {
                console.log(res)
                AuthStore.setAuthInfo("", res.account.id, res.profile.nickname, res.profile.avatarUrl, 1)
            } else {
                console.log(res)
            }
        })()

    }, [AuthStore])
    const handleLogout = () => {
        AuthStore.logout().then((res) => {
            console.log('logout', res)
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
                            <div onClick={handleLogout}>注销</div>}
                    </div>
                </div>
            </Menu>

        </Layout.Header>
    )
})

export default Header;