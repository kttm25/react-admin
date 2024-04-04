import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Paginator from '../../components/paginator';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderItem';

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(0);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('orders');

                setOrders(data.data)
            }
        )()
    }, [])
    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/orders/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
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
                            orders.map((p: Order) => {
                                return (
                                    <>
                                        <tr key={p.id}>
                                            <td scope="col">{p.id}</td>
                                            <td scope="col">{p.name}</td>
                                            <td scope="col">{p.email}</td>
                                            <td scope="col">{p.total}</td>
                                            <td scope="col">
                                                <a href='#' className='btn btn-sm btn-outline-secondary'>
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <div>
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
                                                            {p.order_items.map((pi: OrderItem) => {
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