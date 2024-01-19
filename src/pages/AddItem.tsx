import { useState } from 'react';
import { AdminRoute } from '../secured_routes/AuthRoute';
import { useProducts } from '../context/ProductContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
function AddItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [img, setImg] = useState('');
  const [desc, setdesc] = useState('');
  const {addProduct} = useProducts()

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


    const p = await addProduct(newItem)
    if(p) {
      message.success("Added item")
      nav("/store")
    } else {
      message.error("There was a problem adding the item, check the network tab")
    }
 
    // You can add logic here to send the item data to your server for processing or save it to your local storage.
  };

  return (
    <div className="container">
      <h2>Add New Item</h2>
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
          Add Item
        </button>
      </form>
    </div>
  );
}


export default AdminRoute(AddItem)