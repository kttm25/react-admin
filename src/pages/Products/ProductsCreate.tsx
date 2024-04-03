import React, { SyntheticEvent, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

const ProductsCreate = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title,
            description,
            image,
            price
        })

        setRedirect(true);
    }

    if (redirect)
        return (<Navigate to={'/products'} />)

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label> Title </label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="mb-3 mt-3 row">
                    <label> Description </label>
                    <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>


                <div className="mb-3 mt-3 row">
                    <label> Image </label>
                    <div className='input-group'>
                        <input value={image} type="text" className="form-control" onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload upload={setImage}/>
                    </div>
                </div>


                <div className="mb-3 mt-3 row">
                    <label> Price </label>
                    <input type="number" className="form-control" onChange={(e) => setPrice(parseInt(e.target.value))} />
                </div>

                <button className="btn btn-outline-secondary" type="submit">Save</button>
            </form>
        </Wrapper >
    );
};

export default ProductsCreate;