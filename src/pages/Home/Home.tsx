import React, {useEffect} from "react"
import {useStores} from "../../store";
import "./style.scss"
import MyCard from "../../components/MyCard/MyCard";
import {observer} from "mobx-react";
import {Carousel} from "antd"

const Home = observer(() => {
    const {HomeStore} = useStores()
    useEffect(() => {
        (async () => {
            await HomeStore.getBannerList()
            await HomeStore.getRecommendList()
            await HomeStore.getTopList()
        })()
    }, [HomeStore])

    const handleBannerClick = (targetId: string) => {
        console.log(targetId)
    }

    return (
        <div className="home-wrapper">

            <Carousel autoplay={true} className="carousel-item-wrapper">
                {HomeStore.bannerList.map(v => {
                    return (<div key={v.imageUrl}>
                        <img src={v.imageUrl} alt="" className="carousel-item-img"
                             onClick={() => handleBannerClick(v.targetId)}/>
                    </div>)
                })}
            </Carousel>

            <div className="title">推荐歌单</div>
            <div className="recommend-wrapper">
                {HomeStore.recommendList.map(v => {
                    return (
                        <MyCard key={v.id} id={v.id} url={v.picUrl} text={v.name}/>
                    )
                })}
            </div>

            <div className="title">热门榜单</div>
            <div className="topList-wrapper">
                {HomeStore.topList.map(v => {
                    return (
                        <MyCard key={v.id} id={v.id} url={v.coverImgUrl} text={v.name}/>
                    )
                })}
            </div>


        </div>
    )
})
export default Home;
