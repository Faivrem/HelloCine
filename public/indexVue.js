Vue.prototype.$http = axios;
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
    mon_user : "",
    search : ""
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
    this.$http.get('/user')
      .then(user => {
        console.log('affichage de mon  user ', user)
        this.mon_user = user.data
      })
      .catch(err => {
        console.log('error', err)
      })
  },
    methods: {
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
          this.$http.post('/add', film).then(() => {
            this.filmsList.push(film)
            this.changePage('listeDesFilms')
            alert('Votre film a bien été créé')
          })
        }
      },
      deleteFilm (film) {
        if (confirm("Êtes vous sûr de vouloir supprimer ce  film ?")) {
          this.$http.post('/delete', film).then(() => {
            this.filmsList.splice(film.Index, 1)
            for (let i = 0; i < this.filmsList.length; i++) {
              this.filmsList[i].Index = i
            }
            alert('Votre film a bien été supprimé')
            this.changePage('listeDesFilms')
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
          this.$http.post('/edit', film).then(() => {
            //this.filmsList.push(film)
            //console.log(this.filmsList[film.Index])
            this.filmsList[film.Index] = film
            this.changePage('listeDesFilms')
            alert('Votre film a bien été modifié')
          })
        }
      },

      // User
      changeuser (user) {
        console.log('iciiiiii')
        this.pseudo = user
        this.changePage("index")
      },
      inscriptionuser (user) {
        if (user.password != "" && user.password === user.repeatpassword && user.username != "") {
          this.$http.post('/register', user).then((req) => {
            alert(req.data)
            if (req.status === 200) {
              this.changePage('listeDesFilms')
            }
          }).catch(error => {
            console.log(error)
            alert(error.body)
          })
        }
        else {
          alert("Le mot de passe n'est pas identique ou les champs sont vides !")
        }
      },
      logout () {
        this.$http.get('/logout').then(() => {
          this.mon_user = ""
          this.changePage('index')
          alert('Vous êtes déconnecté')
        })
      }
    },
  computed: {
    filteredList() {
      if(this.filmsList){
        return  this.filmsList.filter(film => {
          return film.Title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return this.filmsList
    }
  }
})

