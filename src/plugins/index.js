function install (Vue) {
 const http = new Vue({
   methods: {
     read (option) {
       return fetch(`https://parseapi.back4app.com/classes/${option}/`, {
       method: 'get',
       headers: {         
         "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
         "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
       }
      })
     },
     write (option, object, headerHttp) {
      return fetch(`https://parseapi.back4app.com/classes/${option}`, {
        method: headerHttp,
        body: JSON.stringify(object),
        headers: {
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      })
     },
     erase (option, id) {
      return fetch(`https://parseapi.back4app.com/classes/${option}/${id}`, {
        method: 'DELETE',
        headers: {
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      })
     }
   }
 })
 Vue.prototype.$fetch = http
}

export default install
