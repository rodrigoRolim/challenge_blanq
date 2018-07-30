function install (Vue) {
 const http = new Vue({
   methods: {
     read (entity) {
       return fetch(`https://parseapi.back4app.com/classes/${entity}/`, {
       method: 'get',
       headers: {         
         "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
         "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
       }})
     },
   }
 })
 Vue.prototype.$fetch = http
}

export default install
