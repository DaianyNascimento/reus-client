import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";
import { Card, Col, Row, Button, Descriptions} from 'antd';

const { Meta } = Card;

export function ListProductsHome({ products }) {

    const [newAlert, setNewAlert] = useState([]);

        const sendingAnAlert = async () => {
            console.log(products);
            try {
              const { data } = await axios.post(`${API_BASE_URL}/homeProducts/${products._id}`, newAlert);
              console.log(data);
              setNewAlert((oldAlerts) => {
                return [...oldAlerts, data.alert];
              });
            } catch (error) {
              console.log("Error in updating the alert list on the server!", error);
            }
        }

    return (
        <div>
        <Row style={{ width: '100%', justifyContent: 'center' }}>
        <Col>
        <Card hoverable style={{ width: 230, height: 300, margin: 10 }}>
      
        <img className="divCardImg" src={products.image} alt={products.title} height={100}/>
        
    
        <Meta title = {products.title}/>
        <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
    <Descriptions.Item>{products.description}</Descriptions.Item>

    </Descriptions>
        
    <Button className="btnStyle" type="primary" onClick = {sendingAnAlert}> I want this! </Button>

    </Card>
    </Col>

    </Row>     
        </div>
    );
}

