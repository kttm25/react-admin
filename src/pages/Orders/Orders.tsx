import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Paginator from '../../components/paginator';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderItem';

const hide = {
    maxHeight : 0,
    transition: '500ms ease-in'
}

const show = {
    maxHeight : '150px',
    transition: '500ms ease-out'
}

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('orders');

                setOrders(data.data)
            }
        )()
    }, [])

    const select = (id: number) =>{
        setSelected(selected === id ? 0: id)
    }

    const handleExport = async () =>{
        const {data} = await axios.post('export', {responseType: 'blob'})
        const blob = new Blob([data], {type: 'text/csv'})
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv'
        link.click();
    }


    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <a href='#' className="btn btn-sm btn-outline-secondary" onClick={handleExport}>Export</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((o: Order) => {
                                return (
                                    <>
                                        <tr key={o.id}>
                                            <td scope="col">{o.id}</td>
                                            <td scope="col">{o.name}</td>
                                            <td scope="col">{o.email}</td>
                                            <td scope="col">{o.total}</td>
                                            <td scope="col">
                                                <a href='#' className='btn btn-sm btn-outline-secondary'
                                                    onClick={() => {select(o.id)}}>
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className='overflow-hidden' style={selected === o.id ? show : hide}>
                                                    <table className='table table-sm'>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>product_title</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {o.order_items.map((pi: OrderItem) => {
                                                                return (
                                                                    <tr key={pi.id}>
                                                                        <td>{pi.id}</td>
                                                                        <th>{pi.product_title}</th>
                                                                        <th>{pi.quantity}</th>
                                                                        <th>{pi.price}</th>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Paginator lastPage={lastpage} pageChanged={setPage} />

        </Wrapper>
    );
};

export default Orders;