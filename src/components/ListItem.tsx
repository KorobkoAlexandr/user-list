import React from 'react';
import './ListItem.scss'
const ListItem = (props: any) => {

    return (
        <li className="user-list__item">{props.user.name} {props.user.surname}</li>
    )
}

export default ListItem;
