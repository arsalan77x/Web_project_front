import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import APP_URL from "../../../Data/APP_URL";
import placeholder from "../../../images/product_placeholder_image.png"

const ImageContainer = props => {
    return (
        <LazyLoadImage
            height={props.height}
            placeholderSrc={placeholder}
            src={props.src ? APP_URL + props.src : undefined}
            // effect="blur"
            width={props.width}
            // {...props} 
            />
    );
};
export default ImageContainer;