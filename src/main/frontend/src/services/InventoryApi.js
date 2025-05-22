const BASEURL = `${process.env.REACT_APP_API_URL}/inventory_items`;

const headers = { "Content-Type": "application/json" };
let token = localStorage.getItem('token') || "";

export const inventoryService = {

  fetchProducts:  async () => {
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
    try {
      const resp = await fetch(BASEURL, {headers: headers})
      if(resp.ok) {
        return resp.json()
      } else return resp
    } catch (err) { console.error(err) }
  },

  addProduct: async (inventoryItem)=> {
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
    try {
      const resp = await fetch(BASEURL, {
        method: "POST",
        headers: headers, 
        body: JSON.stringify(inventoryItem)
      })
      if(resp.status === 201) { 
        return resp.json()
}
    } catch(err) { console.error(err) }
  },
  updateProduct: async (inventoryItem)=> {
    headers['Authorization'] = `Bearer ${token}`
    try {
      const resp = await fetch(`${BASEURL}/${inventoryItem.id}`, {
        method: "PUT",
        headers: headers, 
        body: JSON.stringify(inventoryItem)
      })
      if(resp.ok) {
        return resp.json()
      }

    } catch(err) { console.error(err) }
  },
  deleteProduct: async (id) => {
    headers['Authorization'] = `Bearer ${token}`
    try {
      const res = await fetch(`${BASEURL}/${id}`, { method: "DELETE", headers: headers })
      return res.status

    } catch(err) { console.error(err) }
  }

}