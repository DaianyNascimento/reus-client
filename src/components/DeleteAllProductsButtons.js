
import { Button } from 'antd';


export function DeleteAllProductsButtons({
  deleteSingleProduct,
  allProducts,
  setAllProducts,
}) {
  const deleteAll = async () => {
    const deletePromises = allProducts.map(({ _id }) => {
      return deleteSingleProduct(_id);
    });
    await Promise.all(deletePromises);
    setAllProducts([]);
  };
  return (
    <div>
      <Button className="btnStyle createBtn1" type="primary" onClick={deleteAll}>Delete All!</Button>
    </div>
  );
}