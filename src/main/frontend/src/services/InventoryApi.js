const BASEURL = `${process.env.REACT_APP_API_URL}/inventory_items`;
const username = localStorage.getItem("email");
const password =  localStorage.getItem("password");

const headers = { "Content-Type": "application/json" }

export const inventoryService = {

  fetchProducts:  async () => {
    headers['Authorization'] = 'Basic ' + btoa(`${username}:${password}`)
    try {
      const resp = await fetch(BASEURL, {headers: headers})
      if(resp.ok) {
        return resp.json()
      } else return resp
    } catch (err) { console.error(err) }
  },

  addProduct: async (inventoryItem)=> {
    headers['Authorization'] = 'Basic ' + btoa(`${username}:${password}`)
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
    headers['Authorization'] = 'Basic ' + btoa(`${username}:${password}`)
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
    headers['Authorization'] = 'Basic ' + btoa(`${username}:${password}`)
    try {
      const res = await fetch(`${BASEURL}/${id}`, { method: "DELETE", headers: headers })
      return res.status

    } catch(err) { console.error(err) }
  }

}