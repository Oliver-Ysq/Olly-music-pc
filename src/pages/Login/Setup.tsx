import {Button, Col, Form, Input, Row, Tooltip, Modal} from "antd";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";
import "./style.scss"
import {useStores} from "../../store";
import {observer} from "mobx-react";

interface setupData {
    captcha: string;
    confirm: string;
    nickname: string;
    password: string;
    phone: string;
}

const useSetup = () => {
    const {AuthStore} = useStores()
    const [setupPhone, setSetupPhone] = useState("")
    const [haveSendCaptcha, setHaveSendCaptcha] = useState(false)
    const onFinish = async (values: setupData) => {
        console.log('Received values of form: ', values);
        if (!haveSendCaptcha) return
        try {
            let res = await AuthStore.setup(values.phone, values.password, values.captcha, values.nickname)
            console.log(res)
            Modal.success({
                title: "success",
                content: "注册成功"
            })
        } catch (err) {
            Modal.error({
                title: "Fail",
                content: err.response.data.msg
            })
        }

    };

    //获取验证码
    const getCaptcha = async () => {

        if (!setupPhone || setupPhone.length !== 11) {
            Modal.error({
                title: "error",
                content: "请输入合法的手机号"
            })
            return
        }
        //查看号码是否被注册过
        let res = await AuthStore.checkPhoneValidation(setupPhone)
        if (res.data.exist === -1) {
            // 未注册过则发送验证码
            try {
                console.log(setupPhone)
                let res = await AuthStore.getCaptcha(setupPhone)
                if (res.data) {
                    console.log('发送成功')
                    setHaveSendCaptcha(true)
                } else {
                    Modal.error({content: "发送验证码失败，请稍后重试"})
                }
            } catch (err) {
                Modal.error({content: "发送验证码失败，请稍后重试"})
            }
        } else {
            Modal.error({content: "该手机号码已注册过"})

        }
    }

    //获取手机号
    const changePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSetupPhone(e.target.value)
    }
    return {
        setupPhone, setSetupPhone,
        haveSendCaptcha, setHaveSendCaptcha,
        onFinish, changePhoneNumber, getCaptcha
    }
}

const Setup: React.FC<{ setPageState: Dispatch<SetStateAction<number>> }> = observer((props) => {
    const [form] = Form.useForm();
    const {
        onFinish, changePhoneNumber, getCaptcha
    } = useSetup()

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };


    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{}}
            scrollToFirstError
        >

            <Form.Item
                name="nickname"
                label={
                    <span>
            昵称&nbsp;
                        <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined/>
            </Tooltip>
          </span>
                }
                rules={[{required: true, message: 'Please input your nickname!', whitespace: true}]}
            >
                <Input autoComplete="off"/>
            </Form.Item>


            <Form.Item
                name="phone"
                label="手机号"
                rules={[{required: true, message: '请输入你的手机号!'}]}
            >
                <Input style={{width: '100%'}} autoComplete="off" onChange={changePhoneNumber}/>
            </Form.Item>


            <Form.Item label="验证码" rules={[{required: true}]}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[{required: true, message: '请输入验证码!'}]}
                        >
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button onClick={getCaptcha}>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item>


            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    }, () => ({
                        validator(_, value) {
                            if (!value || value.length >= 8) {
                                return Promise.resolve();
                            }
                            return Promise.reject('请输入8位以上的密码!');
                        },
                    }),
                ]}
                hasFeedback
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout} className="buttonWrapper">
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <Button type="primary" onClick={() => props.setPageState(0)}>Go to Log in!</Button>
            </Form.Item>
        </Form>
    )
})

export default Setup;