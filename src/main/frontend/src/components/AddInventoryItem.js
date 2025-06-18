import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { inventoryService} from '../services/InventoryApi'
import { useAuth } from './AuthContext'

function AddInventoryItem() {

  const { addProduct } = inventoryService
  const { currentUser, addItem } = useAuth()

  const [item, setItem] = useState(
    {
      name: "",
      type: "",
      size: "",
      color: "",
      vendor: "",
      quantity: 0,
      numSold: 0,
      numAvailable: 0,
      purchasePrice: 0.00,
      salesPrice: 0.00,
      saleStatus: "Full Price",
      lastUpdatedBy: currentUser.id,
      lastUpdatedDate: new Date().toISOString().substring(0, 10),
      orderDate: new Date().toISOString().substring(0, 10),
      manager: {id: currentUser.id}
    }
  )

  const navigate = useNavigate();

  async function handleCreateItem(e) {
    e.preventDefault()
    const updatedItem = await addProduct(item)
    addItem(updatedItem)
    navigate("/")
  }

  function handleChange(e){
    let val = e.target.value;
    if(e.target.type === "number") {
      val = parseFloat(e.target.value)
    } if(e.target.name === "quantity") {
      setItem((prev) => ({...prev, numAvailable: e.target.value}))
    }
    setItem((prev) => ({...prev, [e.target.name]: val}))
  }



  return (
    <form className="inventory" onSubmit={handleCreateItem}>
  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label htmlFor="item name">Item Name</label>
      <input type="text" className="form-control" id="item name" name="name" placeholder="Cocktail Dress" value={item.name} required 
      onChange={handleChange}/>
      <div className="valid-feedback">
        Looks good!
      </div>
      <div className="invalid-feedback">
        Please provide an item name.
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="item type">Item Type</label>
      <input type="text" className="form-control" id="item type" name="type" placeholder="Formal Wear" value={item.type} required 
      onChange={handleChange}/>
      <div className="valid-feedback">
        Looks good!
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="item size">Item Size (as applicable)</label>
      <div className="input-group">
        <input type="text" className="form-control" name="size" id="item size" placeholder="6" value={item.size} 
        onChange={handleChange}/>
      </div>
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label htmlFor="item color">Item Color</label>
      <input type="text" className="form-control" name="color" id="item color" placeholder="Blue" required value={item.color}
      onChange={handleChange}/>
      <div className="invalid-feedback">
        Please provide a color.
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="item vendor">Item Vendor</label>
      <input type="text" className="form-control" name="vendor" id="item vendor" placeholder="Calvin Klein" required value={item.vendor}
      onChange={handleChange}/>
      <div className="invalid-feedback">
        Please provide a vendor.
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="item quantity">Item Quantity</label>
      <input type="number" className="form-control" name="quantity" id="item quantity" placeholder="8" min="1" required value={item.quantity}
      onChange={handleChange}/>
      <div className="invalid-feedback">
        Please provide a number.
      </div>
    </div>
  </div>
  <div className="form-row">
  
    <div className="col-md-4 mb-3">
      <label htmlFor="purchase price">Purchase Price (from Vendor)</label>
      <input type="number" className="form-control" name="purchasePrice" id="purchase price" placeholder="25.99" min="1" step=".01" required value={item.purchasePrice}
      onChange={handleChange}/>
      <div className="invalid-feedback">
        Please provide a price.
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="sales price">Sales Price</label>
      <input type="number" className="form-control" name="salesPrice" id="sales price" placeholder="49.99" min="1" step=".01" required value={item.salesPrice}
      onChange={handleChange}/>
      <div className="invalid-feedback">
        Please provide a price.
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="sale status">Sale Status</label>
      <input type="text" className="form-control" name="saleStatus" id="sale status" placeholder="Full Price" value={item.saleStatus} 
      onChange={handleChange}/>
    </div>
  </div>
  
  <button className="btn btn-primary" type="submit">Submit form</button>
</form>

  )
}

export default AddInventoryItem
