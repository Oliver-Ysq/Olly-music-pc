import {makeAutoObservable} from "mobx";
import instance from "../request/request";

interface checkPhoneData {
    data: {
        code: number; exist: number; hasPassWord: boolean, nickName: any
    }
}

enum loginState {
    unLogin = 0,
    haveLogin = 1
}

class AuthStore {

    loginState: number = loginState.unLogin //登录状态
    phone: string | undefined = ""   //手机号
    id: string | undefined = "" //id
    nickname: string | undefined = ""    //昵称
    avaUrl: string | undefined = ""  //头像地址


    constructor() {
        makeAutoObservable(this);
    }

    setAuthInfo(phone: string, id: string, nickname: string, avaUrl: string, state: number) {
        console.log(arguments)
        this.phone = phone

        this.id = id
        this.loginState = state
        this.nickname = nickname
        this.avaUrl = avaUrl
    }

    //登录账号
    login(phone: string, password: string) {
        return new Promise<any>((resolve, reject) => {
            instance.get(`/login/cellphone?phone=${phone}&password=${password}`)
                .then(async (res) => {
                    this.setAuthInfo(phone, res.data.account.id, res.data.profile.nickname, res.data.profile.avatarUrl, 1)
                    resolve(res)
                    // console.log((await instance(`/user/playlist?uid=${this.id}`)).data)
                })
                .catch(err => reject(err))
        })
    }

    //注销账号
    logout() {
        return new Promise((resolve, reject) => {
            instance.get(`/logout`)
                .then(res => {
                    this.setAuthInfo("", "", "", "", 0)
                    resolve(res.data)
                })
                .catch(res => reject(res))
        })
    }


    //注册账号
    setup(phone: string, password: string, captcha: string, nickname: string,) {
        return new Promise<any>((resolve, reject) => {
            instance.post(`/register/cellphone`, {
                phone, password, captcha, nickname,
                timestamp: new Date().getTime()
            })
                .then((res) => {
                    console.log(res)
                    resolve(res)
                })
                .catch(err => reject(err))
        })
    }

    //查看登录状态
    checkLoginState() {
        interface IRes {
            data: { data: { account: any; code: number; } }
        }

        return new Promise<IRes | any>((resolve, reject) => {
            instance.post(`/login/status`)
                .then((res: IRes) => resolve(res.data.data))
                .catch((res: any) => reject(res))
        })
    }

    //发送手机验证码
    getCaptcha(phone: string) {
        return new Promise<any>((resolve, reject) => {
            if (!!phone && phone.length === 11) {
                instance.get(`/captcha/sent?phone=${phone}`)
                    .then((res) => resolve(res))
                    .catch(err => reject(err))
            } else {
                reject("手机号码不存在或不合法")
            }
        })
    }

    //检查手机号码是否被注册过
    checkPhoneValidation(phone: string) {
        return new Promise<checkPhoneData>((resolve, reject) => {
            instance.get(`/cellphone/existence/check?phone=${phone}`)
                .then((res: checkPhoneData) => resolve(res))
                .catch((res: any) => reject(res))
        })
    }

}

export default new AuthStore();
