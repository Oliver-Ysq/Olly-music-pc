import React, {Dispatch, SetStateAction} from "react"
import {useStores} from "../../store";
import {
    Form, Input, Button, Modal,
} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import "./style.scss"
import {observer} from "mobx-react";

interface IOnFinish {
    PhoneNumber: string;
    password: string;
}

interface IProps {
    setPageState: Dispatch<SetStateAction<number>>
    history: any
}

const Login: React.FunctionComponent<IProps> = observer((props) => {

    const {history} = props
    const {AuthStore} = useStores()

    const onFinish: (ars: IOnFinish) => void = ({PhoneNumber, password}) => {
        if (!!PhoneNumber && PhoneNumber.length === 11 && !!password) {
            AuthStore.login(PhoneNumber, password)
                .then(res => {
                    if (res.data.code === 200) {
                        console.log(res)
                        Modal.success({
                            title: "success",
                            content: "登陆成功",
                            onOk: () => {
                                history.push("/")
                            }
                        })
                    } else {
                        console.log(res)
                        Modal.error({
                            title: "error",
                            content: res.data.msg || "登陆失败"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    window.alert("登陆失败，请重试")
                })
        }
    }

    return (

        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: false}}
            onFinish={onFinish}
        >
            <Form.Item
                name="PhoneNumber"
                rules={[{required: true, message: '请输入手机号码!'}]}
            >
                <Input autoComplete="off" prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="手机号码"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: '请输入密码!'}]}
            >
                <Input autoComplete="off"
                       prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="账号密码"
                />
            </Form.Item>

            <Form.Item className="buttonWrapper">
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in!
                </Button>
                <Button type="primary" onClick={() => props.setPageState(1)}>go to register!</Button>
            </Form.Item>
        </Form>
    )
})
export default Login;