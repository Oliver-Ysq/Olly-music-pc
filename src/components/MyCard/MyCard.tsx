import React, {useEffect} from "react";
import {Card} from "antd"
import "./style.scss"

interface IProps {
    url: string;
    text: string;
    id: string;
}

const MyCard: React.FC<IProps> = ({url, text, id}) => {
    useEffect(() => {

    })
    const gotoAlbum = () => {
        console.log(id)
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