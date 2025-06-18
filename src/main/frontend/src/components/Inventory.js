import InventoryItem from './InventoryItem.js'
import { useState } from 'react'
import { useAuth } from './AuthContext'


function Inventory({ contentRef }) {

  const [input, setInput] = useState('')

  function handleSearch(e) {
    const query = e.target.value;
    setInput(query)
  }
  
  const { inventory } = useAuth()
  if (!inventory.length) return <>loading...</>

  function changeUpperCase(str) {
    return str.replace(/[A-Z]/g, (match) => ' ' + match.toLowerCase())
  }

  const filteredData = inventory.filter((item) => item.type.toLowerCase().includes(input.toLowerCase()))

  const tableHeaders = Object.keys(inventory[0]).map((el) => changeUpperCase(el))



  return (
    <div ref={contentRef}>

      <div className="input-group mb-3 search">
              <div className="input-group-prepend search-icon">
                <i className="material-icons">search</i>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="search to filter inventory type"
                aria-label="search"
                value={input}
                onChange={handleSearch}
              />
            </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th scope="col" className="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td>There are no items to show</td>
            </tr>
          ) : (
            filteredData.map((el) => (
              <InventoryItem
                key={el.id}
                item={el}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Inventory
