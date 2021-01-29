import {observer} from "mobx-react";
import {useStores} from "../../store";
import {List} from "antd";
import songImgUrl from "../../assets/song.png";
import {Link} from "react-router-dom";
import React from "react";

const DailyRecommend = observer(() => {
    const {HomeStore} = useStores()
    return (
        <div className="dailyRecommend-wrapper">
            <div className="dailyRecommend-content">
                <div className="dailyRecommend-title"> 猜你喜欢</div>
                <div className="dailyRecommend-item">
                    <List
                        size="small"
                        itemLayout="horizontal"
                        dataSource={HomeStore.dailyRecommendList}
                        renderItem={(item: { name: string; id: string }) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img src={songImgUrl} alt="" style={{height: "1.8rem"}}/>}
                                    title={<Link to={`/playsong/${item.id}`}
                                                 style={{color: "#aaa"}}>{item.name}</Link>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
})

export default DailyRecommend