Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    filter: '',
    menu: '',
    myList: [],
    name: 'Hello Cine',
    filmsList: "",
    user : "",
    privilege : "",
    password : "",
  },
  created () {
    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
    this.$http.get('/list')
      .then(list => {
        console.log('affichage de ma liste', list)
        this.filmsList = list.data
      })
      .catch(err => {
        console.log('error', err)
      })
  },
  methods: {
    sendNewElement () {
      this.$http.post('/list', {
        name: this.name
      })
        .then(() => {
          this.myList.push({
            name: this.name
          })
        })
    },
    changePage (page) {
      this.currentPage = page;
    }
  }
})