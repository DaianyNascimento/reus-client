import { EditProduct } from "./EditProduct";

export function SingleProduct({ product, setAllProducts, deleteSingleProduct }) {
    const handleDeleteProduct = () => {
        deleteSingleProduct(product._id);
    };

    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />

            {<EditProduct
                product={product}
                setAllProducts={setAllProducts}
            />}
            <button onClick={handleDeleteProduct}>Delete!</button>
        </div>
    );
}
