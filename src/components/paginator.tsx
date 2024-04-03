import React from 'react'

export default function Paginator(props: {lastPage : number, pageChanged: (page: number) => void}) {
    
    let page =1;
    const next = () => {
        if (page <= props.lastPage){
            props.pageChanged(page + 1)
        }
    }

    const prev = () => {
        if (page > 1){
            props.pageChanged(page -1)
        }
    }
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>
        </nav>
    )
}
