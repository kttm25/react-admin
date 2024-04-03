import axios from 'axios';
import React from 'react';

const ImageUpload = (props: {upload: (url: string) => void}) => {

    const Upload = async (files: FileList | null) => {
        if( files === null)
            return;

        const formData = new FormData();

        formData.append('image', files[0])
        const  { data } = await axios.post('upload', formData)

        props.upload(data.url);
    }
 
    return (
        <div>
            <label className='btn btn-primary'>
                Upload <input type='file' hidden onChange={e => Upload(e.target.files)}/>
            </label>
        </div>
    );
};

export default ImageUpload;