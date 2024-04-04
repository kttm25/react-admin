import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Navigate, useSearchParams } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

const ProductsEdit = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();
    const ref = useRef<HTMLInputElement>(null);


    useEffect(() =>{
        (
            async () => {
                const {data} = await axios.get(`products/${parseInt(searchParams.get('id') || "0")}`)
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            }
        )()
    }, [])

    const updateImage = (url: string) => {
        if(ref.current)
            ref.current.value = url;
        setImage(url)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${parseInt(searchParams.get('id') || "0")}`, {
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
                    <input type="text" defaultValue={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="mb-3 mt-3 row">
                    <label> Description </label>
                    <textarea defaultValue={description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>


                <div className="mb-3 mt-3 row">
                    <label> Image </label>
                    <div className='input-group'>
                        <input ref={ref} defaultValue={image} type="text" className="form-control" onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload upload={setImage}/>
                    </div>
                </div>


                <div className="mb-3 mt-3 row">
                    <label> Price </label>
                    <input type="text" defaultValue={price} className="form-control" onChange={(e) => setPrice(e.target.value)} />
                </div>

                <button className="btn btn-outline-secondary" type="submit">Save</button>
            </form>
        </Wrapper >
    );
};

export default ProductsEdit;