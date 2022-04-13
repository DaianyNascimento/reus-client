import { EditProduct } from "./EditProduct";
import { Card, Col, Row, Button } from 'antd';

export function SingleProduct({ product, setAllProducts, deleteSingleProduct }) {
  const handleDeleteProduct = () => {
    deleteSingleProduct(product._id);
  };

  return (
    <div>
      <Row justify="center" style={{ width: "100%", justifyContent: "center" }}>
        <Col span={5}>
          <Card
            title={product.title}
            bordered={false}
            style={{ width: 230, height: 300, margin: 10}}
            className="divCard"
          >
            <img className="divCardImg" src={product.image} alt={product.title} height={100} />

          <div className="divEditDeleteBtn">
            {<EditProduct product={product} setAllProducts={setAllProducts} />}
            <Button className="singleDeleteBtn btnStyle" type="primary" onClick={handleDeleteProduct}>
              Delete!
            </Button>
          </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
