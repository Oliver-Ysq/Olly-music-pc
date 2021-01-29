import {Button} from "antd"
import React from "react"
import "./style.scss"

interface IProps {
    list: any[]
}

function handleSinger(list: any[]) {
    if (list.length === 1) return '— ' + list[0].name
    let str = "— "
    for (let i = 0; i < list.length; i++) {
        str += `${list[i].name}, `
    }
    return str
}

const List: React.FC<IProps> = (props) => {
    return (
        <div className="list-wrapper">
            {props.list.map((v) => {
                return (
                    <div className="list-item-wrapper">
                        <div className="list-item-name">
                            {v.name}
                        </div>
                        <div className="list-item-right">
                            <div className="list-item-singer">{handleSinger(v.ar)}</div>
                            <div className="list-item-buttons">
                                <Button size="middle" style={{marginRight: 8}}>播放</Button>
                                <Button size="middle">喜欢</Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List