import React from "react";
import {Card} from "antd"
import "./style.scss"
import {useHistory} from "react-router-dom";

interface IProps {
    url: string;
    text: string;
    id: string;
    trackCount: number,
    playCount: number,
    description: string

}

const MyCard: React.FC<IProps> = ({url, text, id, trackCount, playCount, description}) => {
    const history = useHistory()
    const gotoAlbum = () => {
        history.push({pathname: `/albumInfo/${id}`, state: {picUrl: url, text, trackCount, playCount, description}})
    }
    return (
        <div className="card-wrapper">
            <Card
                onClick={gotoAlbum}
                className="card-card"
                cover={
                    <img
                        className="card-img"
                        alt="img"
                        src={url}
                    />
                }
            >
                <Card.Meta
                    description={text}
                />
            </Card>
        </div>
    )
}

export default MyCard;