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
      <button onClick={deleteAll}>Delete All!</button>
    </div>
  );
}