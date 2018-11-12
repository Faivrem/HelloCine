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

    // Films
    viewFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("viewFilm");
    },
    editFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("editFilm");
    },
    createFilm (film) {
      if (film.Title == "") {
          alert('Veuillez indiquer le titre')
      }
      else {
        film['Index'] = this.filmsList.length
        this.$http.post('/add',film).then(() =>{
            this.filmsList.push(film)
            this.changePage('listeDesFilms')
            alert('Votre film a bien été créé')
        })
      }
    },

    modifyFilm (film) {

      console.log(film)

      if (film.Title == "") {
            alert('Veuillez indiquer le titre')
      }
      else {
          //film['Index'] = this.filmsList.length
          this.$http.post('/edit',film).then(() => {
              //this.filmsList.push(film)
              //console.log(this.filmsList[film.Index])
              this.filmsList[film.Index] = film
              this.changePage('listeDesFilms')
              alert('Votre film a bien été modifié')
          })
      }
    },


    // User
    changeuser(user){
      console.log('iciiiiii')
      this.pseudo = user
      this.changePage("connexion")
    },
    inscriptionuser(user){
      if (user.password === user.repeatpassword){
        this.$http.post('/register',user).then(() => {
            this.changePage('listeDesFilms')
            alert('Vous êtes désormais inscrit !')
        }).catch(error =>{
          console.log(error)
          alert(error.body)
        })
      }
      else{
        alert("Le mot de passe n'est pas identique")
      }
    }
  }
})