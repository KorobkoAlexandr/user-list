import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../reducers";
import List from "../components/List"
import Paginator from "../components/Paginator";
import { usersCurrentPage, usersEntities, usersIds, usersLoading } from "../selectors/usersSelectors";

const Main = (props: any) => {
    const dispatch = useDispatch();
    const loading = useSelector(usersLoading);
    const ids = useSelector(usersIds);
    const currentPage = useSelector(usersCurrentPage);
    const users = useSelector(usersEntities);

    const fetchUsers = () => {
        const storageStr = localStorage.getItem('persist:root');
        const storageObj = storageStr && JSON.parse(storageStr);

        if(storageObj) return;

        let promise: any;
        if (loading === 'idle') {
            promise = dispatch(getUsersData());
        }

        return () => {
            if (promise) {
                promise.abort()
            }
        }
    };

    useEffect(fetchUsers, []);

    return (
        <>
            <div>
                <List users={users} ids={ids} currentPage={currentPage}/>
            </div>
            <div>
                <Paginator pages={Object.keys(ids).length}/>
            </div>
        </>
    )
}
export default Main;
