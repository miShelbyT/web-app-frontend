import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { inventoryService } from '../services/InventoryApi'
import { useAuth } from './AuthContext'

function EditInventoryItem() {
  const { currentUser, currentItem, updateItem } = useAuth()
  const { name, type, size, color, vendor, purchasePrice, numAvailable, quantity } = currentItem
  const { updateProduct } = inventoryService
  const navigate = useNavigate()
  

  const [item, setItem] = useState({
    salesPrice: currentItem.salesPrice,
    saleStatus: currentItem.saleStatus,
    numToPurchase: 0
  })


  function handleChange(e) {
    let val = e.target.value
    if (e.target.type === 'number') {
      if (e.target.name === 'numToPurchase') {
       val = Number(val)
      } else
        val = parseFloat(val)
    }
    setItem((prev) => ({ ...prev, [e.target.name]: val }))
  }

  async function handleUpdateItem(e) {
    e.preventDefault()
    currentItem.numAvailable += item.numToPurchase
    currentItem.quantity += item.numToPurchase
    currentItem.saleStatus = item.saleStatus
    currentItem.salesPrice = item.salesPrice
    currentItem.lastUpdatedDate = new Date().toISOString().substring(0, 10)
    currentItem.lastUpdatedBy = currentUser.id
    const updatedProduct = await updateProduct(currentItem)
    updateItem(updatedProduct)
    navigate('/')
  }

  return (
    <form className="inventory">
      <div className="form-row ">
        <div className="col-md-3 mb-3">Name: {name}</div>
        <div className="col-md-3 mb-3">Type: {type}</div>
        <div className="col-md-3 mb-3">Size: {size}</div>
      </div>
      <div className="form-row">
        <div className="col-md-3 mb-3">Color: {color}</div>
        <div className="col-md-3 mb-3">Vendor: {vendor}</div>
      </div>
      <div className="form-row">
        <div className="col-md-3 mb-3">
          Purchase Price: {purchasePrice}
        </div>

        <div className="col-md-3 mb-3">
          Available Items: {numAvailable}
        </div>
        <div className="col-md-3 mb-3">Current Quantity: {quantity}</div>
      </div>
      <div className="form-row">
        <div className="col-md-3 mb-3">
          <label htmlFor="sales price">Sales Price</label>
          <input
            type="number"
            className="form-control"
            name="salesPrice"
            id="sales price"
            placeholder="49.99"
            min="1"
            step=".01"
            value={item.salesPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="sales status">Sales Status</label>
          <input
            type="text"
            className="form-control"
            name="saleStatus"
            id="sales status"
            placeholder="Full Price"
            value={item.saleStatus}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="item purchase">Buy More Items: </label>
          <input
            type="number"
            className="form-control"
            name="numToPurchase"
            id="item purchase"
            min="0"
            value={item.numToPurchase}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        onClick={handleUpdateItem}
      >
        Submit form
      </button>
    </form>
  )
}

export default EditInventoryItem
