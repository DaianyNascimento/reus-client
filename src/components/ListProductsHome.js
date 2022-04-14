import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

import { Card, Col, Row, Button, Descriptions, Modal} from 'antd';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

export function ListProductsHome({ products }) {
  
  const [newAlert, setNewAlert] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

      const sendingAnAlert = async () => {
    if (!user) {
      alert("Please login to request a product!");
      navigate("/login");
    } else if (user.role === "donor") {
      alert("As a donor, you can't request a product!");
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/homeProducts/${products._id}`, newAlert);
      setNewAlert((oldAlerts) => {
        return [...oldAlerts, data.alert];
      });

      alert("Thanks! The donor will receive a notification.");
    } catch (error) {
      console.log("Error in updating the alert list on the server!", error);
    }
  }

        function info() {
          Modal.info({
            content: (
              <div>
                <h3>{products.title}</h3>
                <p>{products.description}</p>
              </div>
            ),
            onOk() {},
          });
        }



    return (
        <div>
        <Row style={{ width: '100%', justifyContent: 'center' }}>
        <Col>
        <Card hoverable style={{ width: 230, height: 300, margin: 10 }}>
      
        <img className="divCardImg" src={products.image} alt={products.title} height={100}/>
        
        <Meta className="homeCardTitle" title = {products.title}/>
        <Button className="btnStyle btnWant" type="primary" onClick = {sendingAnAlert}> I want this! </Button>
        <Button className="btnStyle" type="primary" onClick={info}>Info</Button>
        </Card>
        </Col>
    </Row>     
        </div>
    );

}

