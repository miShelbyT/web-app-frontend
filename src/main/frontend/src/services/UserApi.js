const headers = { "Content-Type": "application/json" }


export const userService = {

  getOrCreateUser: async (url, new_user)=> {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: headers, 
        body: JSON.stringify(new_user)
      })
      if(resp.ok || resp.status === 201) {
        return resp;
} else return false
    } catch(err) { console.error(err) }
  }

}