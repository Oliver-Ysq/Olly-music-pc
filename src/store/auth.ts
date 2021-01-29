import {makeAutoObservable} from "mobx";
import instance from "../request/request";

interface checkPhoneData {
    data: {
        code: number; exist: number; hasPassWord: boolean, nickName: any
    }
}


class AuthStore {

    loginState: number = 0 //登录状态
    phone: string | undefined = ""   //手机号
    id: string | undefined = "" //id
    nickname: string | undefined = ""    //昵称
    avaUrl: string | undefined = ""  //头像地址


    constructor() {
        makeAutoObservable(this);
    }

    setAuthInfo(phone: string, id: string, nickname: string, avaUrl: string, state: number) {
        this.phone = phone
        this.id = id
        this.loginState = state
        this.nickname = nickname
        this.avaUrl = avaUrl
    }

    //登录账号
    login(phone: string, password: string) {
        return new Promise<any>((resolve, reject) => {
            instance.get(`/login/cellphone?timestamp=${new Date().getTime()}&phone=${phone}&password=${password}`)
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
            instance.get(`/logout?timestamp=${new Date().getTime()}`)
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
            instance.post(`/login/status?timestamp=${new Date().getTime()}`)
                .then((res: IRes) => {
                    if (res.data.data.account !== null) {
                        let result: any = res.data.data
                        this.setAuthInfo("", result.account.id, result.profile.nickname, result.profile.avatarUrl, 1)
                        resolve(result)
                    } else {
                        console.log("未登录")
                        reject(res)
                    }
                })
                .catch((res: any) => reject(res))
        })
    }

    //发送手机验证码
    getCaptcha(phone: string) {
        return new Promise<any>((resolve, reject) => {
            if (!!phone && phone.length === 11) {
                instance.get(`/captcha/sent?timestamp=${new Date().getTime()}&phone=${phone}`)
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
            instance.get(`/cellphone/existence/check?phone=${phone}&timestamp=${new Date().getTime()}`)
                .then((res: checkPhoneData) => resolve(res))
                .catch((res: any) => reject(res))
        })
    }

}

export default new AuthStore();
