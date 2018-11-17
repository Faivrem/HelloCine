Vue.prototype.$http = axios

const app = new Vue({
    el: '#app',
    data: {
        currentPage: 'index',
        currentFilmId: '',
        filter: '',
        menu: '',
        name: 'Hello Cine',
        filmsList: '',
        mon_user: '',
        search: '',
        error: {message: ''},
        success: {message: ''}

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
        this.success.message = ''
        this.error.message = ''

    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },

        // Films
        viewFilm (indexFilm) {
            this.currentFilmId = indexFilm
            this.changePage('viewFilm')
        },
        editFilm (indexFilm) {
            this.currentFilmId = indexFilm
            this.changePage('editFilm')
        },
        createFilm (film) {
            if (film.Title == '') {
                alert('Veuillez indiquer le titre')
            }
            else {
                film['Index'] = this.filmsList.length
                this.$http.post('/add', film)
                    .then(() => {
                        this.filmsList.push(film)
                        this.changePage('listeDesFilms')
                        alert('Votre film a bien été créé')
                        document.location.reload(true)
                    })
            }
        },
        deleteFilm (film) {
            if (confirm('Êtes vous sûr de vouloir supprimer ce  film ?')) {
                this.$http.post('/delete', film)
                    .then(() => {
                        this.filmsList.splice(film.Index, 1)
                        for (let i = 0; i < this.filmsList.length; i++) {
                            this.filmsList[i].Index = i
                        }
                        alert('Votre film a bien été supprimé')
                        this.changePage('listeDesFilms')
                        document.location.reload(true)
                    })
            }

        },

        modifyFilm (film) {

            console.log(film)

            if (film.Title == '') {
                alert('Veuillez indiquer le titre')
            }
            else {
                //film['Index'] = this.filmsList.length
                this.$http.post('/edit', film)
                    .then(() => {
                        //this.filmsList.push(film)
                        //console.log(this.filmsList[film.Index])
                        this.filmsList[film.Index] = film
                        this.changePage('listeDesFilms')
                        alert('Votre film a bien été modifié')
                        document.location.reload(true)
                    })
            }
        },

        // User

        inscriptionuser (user) {
            if (user.password != '' && user.password === user.repeatpassword && user.username != '') {
                this.$http.post('/register', user)
                    .then((req) => {

                        //alert(req.data);
                        if (req.status === 200) {
                            alert(req.data)
                            this.success.message = req.data
                            this.changePage('listeDesFilms')
                        }
                        else {
                            this.error.message = req.data
                            this.changePage('inscription')
                        }
                    }).catch(error => {
                    console.log(error)

                })
            }
            else {
                this.error.message = 'Le mot de passe n\'est pas identique ou les champs sont vides !'
                //alert("Le mot de passe n'est pas identique ou les champs sont vides !")
            }
        },
        logout () {
            this.$http.get('/logout').then(() => {
                this.mon_user = ''
                this.changePage('index')
                alert('Vous êtes déconnecté')
            })
        },
        connexion (user) {
            if (user.password != '' && user.username != '') {
                this.$http.post('/login', user)
                    .then((response) => {
                        //alert(response.data);
                        this.success.message = ''
                        this.error.message = ''

                        if (response.status === 200) {
                            alert(response.data)
                            this.success.message = response.data
                            document.location.reload(true)

                            this.changePage('listeDesFilms')
                        } else {
                            this.error.message = response.data
                            this.changePage('connexion')
                        }
                    }).catch(err => {

                    console.log('Error' + error)
                })
            }
            else {
                this.error.message = 'Le ou les champs sont vides !'
                //alert("Le ou les champs sont vides !")
            }
        }
    },
    computed: {
        filteredList () {
            if (this.filmsList) {
                return this.filmsList.filter(film => {
                    return film.Title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            return this.filmsList
        }
    }
})

