import {makeAutoObservable} from "mobx";
import instance from "../request/request";

class HomeStore {

    recommendList: any[] = []
    bannerList: any[] = []
    topList: any[] = []


    constructor() {
        makeAutoObservable(this);
    }

    //获得banner列表
    getBannerList() {
        return new Promise((resolve, reject) => {
            instance.get(`/banner`)
                .then((res) => {
                    this.setBannerList(res.data.banners)
                    resolve(res.data)
                })
                .catch((res) => reject(res))
        })
    }

    // 获得推荐列表
    getRecommendList() {
        return new Promise<any>((resolve, reject) => {
            instance.get(`/personalized?limit=10`)
                .then(res => {
                    this.setRecommendList(res.data.result)
                    resolve(res.data)
                })
                .catch(res => reject(res))
        })
    }

    getTopList() {
        return new Promise<any>((resolve, reject) => {
            instance.get(`/toplist`)
                .then(res => {
                    this.setTopList(res.data.list.slice(0, 8))
                    resolve(res.data)
                })
                .catch(res => reject(res))
        })
    }

    setRecommendList(list: any[]) {
        this.recommendList = list
    }

    setBannerList(list: any[]) {
        this.bannerList = list
    }

    setTopList(list: any[]) {
        this.topList = list
    }
}

export default new HomeStore();