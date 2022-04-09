import { useState } from "react";
import { EditProduct } from "./EditProduct";

export function SingleProduct({ product, setAllProducts, deleteSingleProduct }) {
    const [formIsShown, setFormIsShown] = useState(false);

    const handleDeleteProduct = () => {
        deleteSingleProduct(product._id);
    };

    const toggleForm = () => {
        setFormIsShown(!formIsShown);
    };

    return (
        <div>
            <h2>
                {product.title}
            </h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />

            <button type="primary" onClick={toggleForm}>
                {formIsShown ? 'Cancel' : 'Edit Product'}
            </button>
            {formIsShown && <EditProduct
                product={product}
                setAllProducts={setAllProducts}
            />}

            <button onClick={handleDeleteProduct}>Delete!</button>
        </div>
    );
}
