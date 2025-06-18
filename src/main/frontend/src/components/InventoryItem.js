import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { inventoryService } from '../services/InventoryApi';
import { useAuth } from './AuthContext'

function InventoryItem({ item, updateItem, deleteItem }) {

  let {id, name, type, size, color, vendor, orderDate, quantity, numSold, numAvailable, purchasePrice, salesPrice, saleStatus, lastUpdatedBy, lastUpdatedDate, manager } = item;
  const { updateProduct, deleteProduct } = inventoryService
  const { currentUser, updateCurrentItem } = useAuth();

  async function handleSellOne(){
    if(numAvailable > 0) {
      item.numAvailable--
      item.numSold++
      item.lastUpdatedBy = currentUser.id
      try{
        const updatedItem = await updateProduct(item)
        updateItem(updatedItem)
      } catch(e) {
        console.log(e)
      }
      
    } else {
      window.alert("There are no more of these items left to sell.")
    }
  }

  
  function handleBuyMore(){
    updateCurrentItem(item)
  }


  function confirmDelete(id){
    const del = window.confirm("Are you sure you want to delete this?")
    if(del) {
      handleDelete(id)
    }
  }

  async function handleDelete(){
      const resp = await deleteProduct(id)
      if(resp === 204) {
        deleteItem(id)
        window.alert("You have succesfully deleted this item.")
      } 
  }

  return (
    <tr className="item-row">
      <th scope="row">{id}</th>
      <td className="col-2">{orderDate}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{size}</td>
      <td>{color}</td>
      <td>{vendor}</td>
      <td>{quantity}</td>
      <td>{numSold}</td>
      <td>{numAvailable}</td>
      <td>{purchasePrice}</td>
      <td>{salesPrice}</td>
      <td>{saleStatus}</td>
      <td>{lastUpdatedBy}</td>
      <td className="col-2">{lastUpdatedDate}</td>
      <td>{manager.id}</td>

      {(currentUser.isAdmin) && (
        <>
      <td>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-top">sell one</Tooltip>}
      >
        <button onClick={handleSellOne}>
          <i className="material-icons">sell</i>
        </button>
      </OverlayTrigger>
        
      </td>
      <td>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-top">buy more</Tooltip>}
      >
        <button onClick={handleBuyMore}>
          <Link to="/inventory_item/edit">
          <i className="material-icons">add_circle</i>
          </Link>
        </button>
        </OverlayTrigger>
      </td>
      <td>
        <button onClick={confirmDelete}>
          <i className="material-icons">delete</i>
        </button>
      </td>
      </>
)}
      
    </tr>
  )
}

export default InventoryItem
