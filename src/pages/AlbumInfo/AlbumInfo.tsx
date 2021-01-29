import React, {useEffect, useState} from "react"
import {RouteComponentProps} from "react-router-dom";
import instance from "../../request/request";
import "./style.scss"
import {Button} from "antd"
import List from "../../components/List/List";

const useAlbumInfo = (id: string) => {
    const [songList, setSongList] = useState([])
    useEffect(() => {
        (async function () {
            try {
                let res = await instance.get(`/playlist/detail?id=${id}`)
                console.log(res.data)
                let {trackIds} = res.data.playlist
                let url = `/song/detail?ids=${res.data.playlist.trackIds[0].id}`
                for (let i = 1; i < trackIds.length; i++)
                    url += `,${trackIds[i].id}`
                let songRes = await instance.get(url)
                console.log(songRes.data.songs)
                setSongList(songRes.data.songs)
            } catch (e) {
                console.log(e.response)
            }
        })()
    }, [id])
    return {
        songList
    }
}

interface IParams {
    id: string
}

interface ILocationState {
    picUrl: string;
    text: string;
    trackCount: string;
    playCount: number;
    description: string
}

const AlbumInfo: React.FC<RouteComponentProps<IParams, any, ILocationState>> = (props) => {
    console.log(props)
    const {match, location} = props
    const {songList} = useAlbumInfo(match.params.id)
    console.log(location.state)
    const {picUrl, text, trackCount, playCount, description} = location.state
    return (
        <div className="album-wrapper">
            <div className="album-top">
                <img src={picUrl} alt="picUrl"/>
                <div className="album-top-right">
                    <div>
                        <div className="album-title">{text}</div>
                        <div>
                            <div className="album-description">{description}</div>
                            <div className="album-detail">
                                <text>playCount: {playCount}</text>
                            </div>
                            <div className="album-detail">
                                <text>follower: {trackCount}</text>
                            </div>
                        </div>
                        <div className="album-button-wrapper">
                            <Button type="primary">播放全部</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="album-content">
            </div>
            <List list={songList}></List>
        </div>)
}
export default AlbumInfo;
