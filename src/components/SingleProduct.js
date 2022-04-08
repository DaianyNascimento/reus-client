export function SingleProduct({ product, updateSingleProduct, deleteSingleProduct }) {
    const handleUpdateProduct = () => {
        updateSingleProduct(product._id, { ...product, title: !product.title, description: !product.description, image: !product.image });
    };
    const handleDeleteProduct = () => {
        deleteSingleProduct(product._id);
    };

    return (
        <div>
            <h2>
                {product.title}
            </h2>
            <button onClick={handleUpdateProduct}>Edit Product</button>
            <button onClick={handleDeleteProduct}>Delete!</button>
        </div>
    );
}
