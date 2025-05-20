import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'

import Inventory from './Inventory.js'

function Home({
  updateCurrentItem,
  inventory,
  updateItem,
  deleteItem,
}) {
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  return (
    <>
      <button className="btn btn-secondary mb-3" onClick={() => reactToPrintFn()}>Print</button>

      <div>
        <Inventory
          contentRef={contentRef}
          updateCurrentItem={updateCurrentItem}
          inventory={inventory}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
    </>
  )
}

export default Home
