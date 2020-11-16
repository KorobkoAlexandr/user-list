import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../reducers";
import { usersCurrentPage } from "../selectors/usersSelectors";
import './PaginatorItem.scss';

const PaginatorItem = (props: {page: number}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(usersCurrentPage);
    const goToPage = ( page: number) => {
        dispatch(changePage(page))
    };

    return (
        <li className={currentPage === props.page ? 'active': ''} onClick={() => goToPage(props.page)}>{props.page}</li>
    )
}

export default PaginatorItem;
