Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    currentFilmId : '',
    filter: '',
    menu: '',
    myList: [],
    name: 'Hello Cine',
    filmsList: "",
    pseudo : "",
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
    },
    viewFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("viewFilm");
    },
    editFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("editFilm");
    },
    changeuser(user){
      console.log('iciiiiii')
      this.pseudo = user
      this.changePage("connexion")
    }
  }
})