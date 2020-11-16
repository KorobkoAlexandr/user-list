import React from 'react';
import './Paginator.scss'
import PaginatorItem from "./PaginatorItem";

const Paginator = (props: {pages: number}) => {

    const generatePagination = () => {
        const {pages} = props;
        const paginationCount = !!(pages % 5) ? pages / 5 + 1 : pages / 5;
        return Array.from({length: paginationCount}, (v,i) => ++i)
            .map((page, ind) => (
                <PaginatorItem page={page} key={ind}/>
            ))
    }

    return (
        <ul className="paginator-list">
            {generatePagination()}
        </ul>
    )
}

export default Paginator;
