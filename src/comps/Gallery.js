import React, { useState } from 'react';
import ImageGrid1 from './ImageGrid1';
import Modal from './Modal';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    return (
        <div>
        <ImageGrid1 setSelectedImg={setSelectedImg} />
        { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
        </div>
    )
}

export default Gallery;