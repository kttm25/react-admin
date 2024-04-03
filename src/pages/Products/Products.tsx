import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Product } from '../../models/product';
import Paginator from '../../components/paginator';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [last_page, setLastPage] = useState(0)

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`products?page=${page}`);
                setLastPage(response.data.meta.last_page)
                setProducts(response.data.data);
            }
        )()
    }, [page]);


    const del = async (id: number) => {
        if (window.confirm('Are you sure you wqnt to delete this record?')) {
            await axios.delete(`products/${id}`);

            setProducts(products.filter((p: Product) => p.id !== id))
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/roles/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p: Product) => {
                                return (
                                    <tr key={p.id}>
                                        <td><img src={p.image} width={50} /> </td>
                                        <td>{p.title} </td>
                                        <td>{p.description} </td>
                                        <td>{p.price} </td>

                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={{ pathname: `/roles/edit`, search: `?id=${p.id}` }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(p.id)} >Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>


                <Paginator lastPage={last_page} pageChanged={setPage}/>
            </div>
        </Wrapper>
    )
}

export default Products;