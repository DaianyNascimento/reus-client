

export function ListProductsHome({ products }) {

    const sendAlert = async (alert) => {
     
    }

    return (
        <div>
            <h2>{products.title}</h2>
            <p>{products.description}</p>
            <img src={products.image} alt={products.title} />

            <button >I want this!</button>
        </div>
    );
}