import React from "react"
import {useStores} from "../../store";
import "./style.scss"
// @ts-ignore
import {observer} from "mobx-react";
import {Carousel} from "antd"
import DailyRecommend from "./DailyRecommend";
import MyCard from "../../components/MyCard/MyCard";
// import {Link} from "react-router-dom";
// const DailyRecommend = lazy(() => import("./DailyRecommend"))
// const MyCard = lazy(() => import("../../components/MyCard/MyCard"))

const TopList = observer(() => {
    const {HomeStore} = useStores()
    return (
        <>
            <div className="title">热门榜单</div>
            <div className="topList-wrapper">
                {HomeStore.topList.map(v => {
                    return (
                        <MyCard key={v.id} id={v.id} url={v.coverImgUrl} text={v.name} trackCount={v.trackCount}
                                playCount={v.playCount} description={v.description}/>
                    )
                })}
            </div>
        </>
    )
})

const RecommendList = observer(() => {
    const {HomeStore} = useStores()
    return (
        <>
            <div className="title">推荐歌单</div>
            <div className="recommend-wrapper">
                {HomeStore.recommendList.map(v => {
                    return (
                        <MyCard key={v.id} id={v.id} url={v.picUrl} text={v.name} trackCount={v.trackCount}
                                playCount={v.playCount} description={v.copywriter}/>
                    )
                })}
            </div>
        </>
    )
})


const Home = observer(() => {
    const {HomeStore} = useStores()

    const handleBannerClick = (targetId: string) => {
        console.log(targetId)
    }
    return (
        <div className="home-wrapper">

            {/*轮播图*/}
            <Carousel autoplay={true} className="carousel-item-wrapper">
                {HomeStore.bannerList.map(v => {
                    return (<div key={v.imageUrl}>
                        <img src={v.imageUrl} alt="" className="carousel-item-img"
                             onClick={() => handleBannerClick(v.targetId)}/>
                    </div>)
                })}
            </Carousel>

            {/*每日推荐*/}
            <DailyRecommend/>


            {/*热门榜单*/}
            <TopList/>


            {/*推荐歌单*/}
            <RecommendList/>


        </div>

    )
})

export default Home;
