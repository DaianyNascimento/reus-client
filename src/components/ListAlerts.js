export function ListAlerts({alerts}) {
    
    return (
        <div>
            <p>{alerts.donee.name}</p>
            <p>{alerts.product.title}</p>
        </div>
    );
}