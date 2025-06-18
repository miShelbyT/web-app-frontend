import { useReactToPrint } from 'react-to-print'
import { useRef, useEffect } from 'react'

import Inventory from './Inventory.js'
import { inventoryService } from '../services/InventoryApi'
import { useAuth } from './AuthContext'

function Home() {

  const { fetchProducts } = inventoryService

  const { updateInventory } = useAuth()


  useEffect(() => {
    try {
      getInventory()
    } catch (e) { console.log(e) }
    // eslint-disable-next-line
  }, [])

  async function getInventory() {
    const fetchInventory = await fetchProducts()
    if (fetchInventory) {
      updateInventory(fetchInventory)
    }
  }

  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => reactToPrintFn()}>Print</button>

      <div>
        <Inventory contentRef={contentRef} />
      </div>
    </>
  )
}

export default Home
