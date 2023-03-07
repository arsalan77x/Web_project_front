import React, { useState} from "react";

const ProductsContext = React.createContext();

const ProductsProvider = props => {

    const [products, setProducts] = useState([])

    return (
        <ProductsContext.Provider
            value={{
                products: products, setProducts: setProducts,
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    );
}

export { ProductsProvider, ProductsContext };
