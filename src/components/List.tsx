import React, { useEffect, useState } from 'react';
import ListItem from "./ListItem";
import RandomUser from "./RandomUser";
import './List.scss'
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

const List = (props: any) => {
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [randomUser, setRandomUser]: [any, any] = useState(null);
    const [showRandomU, setShowRandomU] = useState(false);

    useEffect(setVisibleUsersEffectCb, [props.users, props.currentPage, props.ids]);

    useEffect(setRandomUserEffectCb, [props.users, props.ids]);

    useEffect(switchUserEffectCb, [showRandomU]);

    function setVisibleUsersEffectCb() {
        const start = (props.currentPage - 1) * 5;
        const end = props.currentPage * 5;
        const visibleUsers: any = props.ids.slice(start, end).map((key: string) => props.users[key]);
        setVisibleUsers(visibleUsers);
    }

    function setRandomUserEffectCb() {
        const subscription = interval(8000)
            .subscribe(val => {
                const usersTotal = props.ids.length;
                const random = Math.round(usersTotal * Math.random());
                setRandomUser(props.users[random || random + 1]);
                setShowRandomU(true);
            })
        return () => {
            subscription.unsubscribe();
        }
    }

    function switchUserEffectCb() {
        const subscription = interval(1000)
            .subscribe(val => {
                if(showRandomU) {
                    setShowRandomU(false);
                }
            })
        return () => {
            subscription.unsubscribe();
        }
    }

    return (
        <div className="user-list-wrapper">
            <ul className="user-list">
                {
                    Object.keys(visibleUsers)
                        .map((key: any) => (<ListItem user={visibleUsers[key]} key={key}/>))
                }
            </ul>
            <RandomUser randomUser={randomUser} show={showRandomU}/>
        </div>
    )
}

export default List;
