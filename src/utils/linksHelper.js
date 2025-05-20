function buildLinks(baseUrl, resource, id = null ) {
   const url = id === null
      ? `${baseUrl}/${resource}`
      : `${baseUrl}/${resource}/${id}`

   const links = {
      self: { href: url, method: id === null ? 'GET' : 'GET' },
      list: { href: `${baseUrl}/${resource}`, method: 'GET' },
      create: { href: `${baseUrl}/${resource}`, method: 'POST' },
   }

   if (id !== null) {
      Object.assign(links, {
         update: { href: url, method: 'PUT' },
         delete: { href: url, method: 'DELETE' }
      })
   }

   return links
}

module.exports = { buildLinks }