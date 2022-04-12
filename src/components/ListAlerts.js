export function ListAlerts({alerts}) {
    
    return (
        <div>
            <p>{alerts.donor.name}</p>
            <p>{alerts.product.title}</p>
        </div>
    );
}