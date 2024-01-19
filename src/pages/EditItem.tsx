import { useEffect, useMemo, useState } from 'react';
import { AdminRoute } from '../secured_routes/AuthRoute';
import { useProducts } from '../context/ProductContext';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
function EditItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [img, setImg] = useState('');
  const [desc, setdesc] = useState('');
  const {addProduct,editProduct} = useProducts()

  const {products} = useProducts()
  const {id} = useParams()
  const product = useMemo(() => products.find(p => String(p.id) == id) ,[id,products])

  useEffect(() => {
    if(product) {
      setName(product.title)
      setPrice(String(product.price))
      setBarcode(product.barcode)
      setImg(product.img)
      setdesc(product.description)
    }
  },[product])
  const nav = useNavigate()
  const handleAddItem = async () => {
    // Create an item object with the provided data
    const newItem = {
      title:name,
      price:+price,
      barcode,
      img,
      description:desc
    };


    const p = await editProduct(id, newItem)
    if(p) {
      message.success("Saved changes successfuly")
      nav("/store")
    } else {
      message.error("There was a problem adding the item, check the network tab")
    }
 
    // You can add logic here to send the item data to your server for processing or save it to your local storage.
  };

  return (
    <div className="container">
      <h2>Edit {product?.title}</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Img</label>
          <input
            type="text"
            value={img}
            className="form-control"
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Barcode</label>
          <input
            type="text"
            className="form-control"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddItem}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}


export default AdminRoute(EditItem)