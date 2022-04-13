import {  Alert  } from 'antd';

export function ListAlerts({alerts}) {
    
    return (
        <div className="alertsProfile" style={{padding: "24px" }}>
             <Alert className="alertsProfile" message={alerts.donee.name} type="success" showIcon />
             <Alert className="alertsProfile" message={alerts.product.title} type="info" showIcon />
        </div>
    );
}