import React, { useEffect, useState } from 'react';
import './RandomUser.scss'


const RandomUser = (props: {randomUser: any, show: boolean}) => {
    const [classes, setClasses] = useState("random-user");

    useEffect(() => {
        const classes = props.show ? "random-user show" : "random-user";
        setClasses(classes);
    }, [props.show]);

    return (
        <div className={classes}>
            {props.randomUser && <span>Random User: {props.randomUser.surname} {props.randomUser.name}</span>}
        </div>
    )
}

export default RandomUser;
