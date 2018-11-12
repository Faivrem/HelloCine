/* globals Vue */
;(function () {
    'use strict'

    const template = `
    <section id="accueil">
      <h1>Titre de ma page d'accueil</h1>
      <p>Mon super texte</p>
    </section>
    `

    Vue.component('accueil', {
        template: template
    });

    Vue.component('index', {

        template : `
    <div class="jumbotron accueil_titre" style="background-image:url(./images/background.png);">
	    <h1>Bienvenue sur l'application Hello Ciné !</h1>
		<p></p>
		<p><a class="btn btn-primary btn-lg" @click="$emit('change-page', 'connexion')" role="button">Connexion</a>
		<a class="btn btn-primary btn-lg" @click="$emit('change-page', 'inscription')" role="button">Inscription</a></p>
	</div>
    `
    });

    Vue.component('navigation-bar', {

        template : `
    <nav class="navbar">
        <div class="page-header">
            <ul class="nav nav-pills pull-right ">
                <li> <a @click="$emit('change-page', 'index')">Accueil </a></li>
                <li> <a @click="$emit('change-page', 'listeDesFilms')">Liste des films </a></li>
                <li> <a @click="$emit('change-page', 'inscription')">Inscription </a></li>

                <li>
                    <a @click="$emit('change-page', 'connexion')"> Connexion </Connexion><i class="glyphicon glyphicon-user"></i></a> </li>
                </li>
                <li>
                    <form method="post"  action="">
                        <input type='submit' class="btn btn-info button_deco" value='Se déconnecter'/>
                    </form>
                <li>
                    <form class="navbar-form navbar-left form_deco" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <button type="submit" class="btn btn-default">Rechercher</button>
                    </form>
                </li>

            </ul>
            <h3 class="modal-title titre_site"> <a class="titre_site" @click="$emit('change-page', 'index')"><i class="glyphicon glyphicon-film"></i> HelloCine</a>
            </h3>
        </div>
    </nav>
    `
    });


    Vue.component('inscription-form', {

        template : `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="modal-title">Inscription </h1>
        </div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label>Login</label>
                        <input type="text" class="form-control mesinputs"  v-model="user.username" placeholder="Login">
                    </div>
                </div>
    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mot de passe</label>
                        <input type="password" class="form-control"  v-model="user.password" placeholder="Mot de passe">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Repéter le mot de passe</label>
                        <input type="password" class="form-control" v-model="user.repeatpassword"  placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <a @click="$emit('inscriptionuser', user)" class="btn btn-primary" role="button">S'inscrire </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    
    `,
      data: function () {
        return {
          user : {
            'username' : '',
            'password' :'',
            'repeatpassword' : ''
          }
        }
      },
    });

    Vue.component('connexion-form', {
        template: `
    <div class="panel panel-default">
	    <div class="panel-heading">
			<h1 class="modal-title">Connexion </h1>
		</div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="inputAddress">Login</label>
                        <input v-model ="username" type="text" class="form-control mesinputs" id="inputAddress" placeholder="Login">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputEmail4">Mot de passe</label>
                        <input v-model ="password" type="password" class="form-control mesinputs" id="inputEmail4" placeholder="Mot de passe">
                    </div>
                </div>
    
                <div class="form-row">
    
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <button @click="login()" class="btn btn-primary">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
	</div>
    
    `,
        data: function () {
          return {
            username : this.username,
            password: ''
          }
        },
        methods: {
          login () {
            let compo = this;
            this.$http.post('/login', {
              username: this.username,
              password: this.password

            }).then(function (response){
              if (response.status === 200) {
                //console.log(response.data.user)
                compo.$emit('change-user', response.data.user)
                }
              })
              console.log(this.username + this.password);
            }
        }
      }
    );

    Vue.component('podium', {

        template : `
    <h2 class="top_titre_centrer">Les  3 derniers films</h2>
    `
    });


    Vue.component('film-item', {

        props : ['filmitem'],
        template : `

    <div class="col-lg-4">
        <div class="thumbnail">
            <img :src= "filmitem.Poster" alt="...">
            <div class="caption">
                <h3>{{ filmitem.Title }}</h3>
                <p>{{ filmitem.Plot }}</p>
                <i>{{ filmitem.Year }} </i>
                <p>
                    <a @click="$emit('event-film', 'viewFilm','filmitem.Index')" class="btn btn-primary" role="button">Voir </a> 
                    <a @click="$emit('edit-film', 'editFilm','filmitem.Index')" class="btn btn-default" role="button">Editer </a>
                </p>
            </div>
        </div>
    </div>
    `

    });

    Vue.component('film-view', {

      props : ['filmitem'],
      template : `
  
      <div class="col-lg-12">
          <div class="thumbnail">
          <h1 align="center">{{ filmitem.Title }}</h1>
          <h4 align="center" >{{ filmitem.Year }} </h4>
              <img :src= "filmitem.Poster" alt="...">
              <div class="caption">
                  <p><b>Plot : </b>{{ filmitem.Plot }}</p>
                  <p><b>Realeased : </b>{{ filmitem.Released }}</p>
                  <p><b>Actors : </b>{{ filmitem.Actors }}</p>
                  <p><b>Awards : </b>{{ filmitem.Awards }}</p>
                  <p><b>Runtime : </b>{{ filmitem.Runtime }}</p>
                  <p><b>Rating : </b>{{ filmitem.imdbRating }}/10</p>
                  <p>
                      <a @click="$emit('change-page', 'editFilm')" class="btn btn-primary" role="button">Editer </a>                            
                  </p>
              </div>
          </div>
          <a @click="$emit('change-page', 'listeDesFilms')" class="btn btn-default" role="button">Retour à la liste</a>
      </div>
      `

    });
    Vue.component('film-edit', {

      props : ['filmitem'],
      template : `
  
      <div><div class="col-lg-6">
          <div class="thumbnail">
           <h1>Titre : <input v-model="filmvisu.Title"> </h1>
           <h2>Image (web) : <input v-model="filmvisu.Poster"> </h2>
           <h4 align="center" > Year : <input type="number" v-model="filmvisu.Year"></h4>
           <h4>Plot :</h4>
           <textarea v-model="filmvisu.Plot" cols="30" rows="5" > </textarea>
            <p><b>Realeased : </b> <input type="text" v-model="filmvisu.Released"></p>
            <p><b>Actors : </b><input type="text" v-model="filmvisu.Actors"> </p>
            <p><b>Awards : </b><input type="text" v-model="filmvisu.Awards"> </p>
            <p><b>Runtime : </b><input type="text" v-model="filmvisu.Runtime"> </p>
            <p><b>Rating : </b><input type="number" v-model="filmvisu.imdbRating"></p>
         </div>
     </div>
          
          <div class="col-lg-6">
          <div class="thumbnail">
          <h1 align="center">{{ filmvisu.Title }}</h1>
          <h4 align="center" >{{ filmvisu.Year }} </h4>
              <img :src= "filmvisu.Poster" alt="...">
              <div class="caption">
                  <p><b>Plot : </b>{{ filmvisu.Plot }}</p>
                  <p><b>Realeased : </b>{{ filmvisu.Released }}</p>
                  <p><b>Actors : </b>{{ filmvisu.Actors }}</p>
                  <p><b>Awards : </b>{{ filmvisu.Awards }}</p>
                  <p><b>Runtime : </b>{{ filmvisu.Runtime }}</p>
                  <p><b>Rating : </b>{{ filmvisu.imdbRating }}/10</p>
              </div>
          </div>
          <a @click="$emit('modify-film', filmvisu)" class="btn btn-primary" role="button">Edit</a>
          <a @click="$emit('change-page', 'listeDesFilms')" class="btn btn-default" role="button">Annuler</a>
      </div>
      </div>
      `,
      data: function () {
        return {
          filmvisu: Vue.util.extend({}, this.filmitem)
        }
      }
    });
  Vue.component('film-add', {
    template : `
      <div>
      <div class="col-lg-6">
          <div class="thumbnail">
           <h1>Titre : <input v-model="filmitem.Title"> </h1>
           <h2>Image (web) : <input v-model="filmitem.Poster"> </h2>
           <h4 align="center" > Year : <input type="number" v-model="filmitem.Year"></h4>
           <h4>Plot :</h4>
           <textarea v-model="filmitem.Plot" cols="30" rows="5" > </textarea>
            <p><b>Realeased : </b> <input type="text" v-model="filmitem.Released"></p>
            <p><b>Actors : </b><input type="text" v-model="filmitem.Actors"> </p>
            <p><b>Awards : </b><input type="text" v-model="filmitem.Awards"> </p>
            <p><b>Runtime : </b><input type="text" v-model="filmitem.Runtime"> </p>
            <p><b>Rating : </b><input type="number" v-model="filmitem.imdbRating"></p>
         </div>
     </div>
          
          <div class="col-lg-6">
          <div class="thumbnail">
          <h1 align="center">{{ filmitem.Title }}</h1>
          <h4 align="center" >{{ filmitem.Year }} </h4>
              <img :src= "filmitem.Poster" alt="...">
              <div class="caption">
                  <p><b>Plot : </b>{{ filmitem.Plot }}</p>
                  <p><b>Realeased : </b>{{ filmitem.Released }}</p>
                  <p><b>Actors : </b>{{ filmitem.Actors }}</p>
                  <p><b>Awards : </b>{{ filmitem.Awards }}</p>
                  <p><b>Runtime : </b>{{ filmitem.Runtime }}</p>
                  <p><b>Rating : </b>{{ filmitem.imdbRating }}/10</p>
              </div>
          </div>
          <a @click="$emit('change-page', 'listeDesFilms')" class="btn btn-default" role="button">Annuler</a>
          <a @click="$emit('create-film', filmitem)" class="btn btn-primary" role="button">Ajouter</a>
      </div>
      </div>
      `,
    data: function () {
      return {
        filmitem : {
          "Title" : '',
          "Poster" : 'http://nulldefinition.com/wp-content/uploads/2016/09/null_logo-300x300.png',
          "Year" : 0,
          "Plot" : '',
          "Released" : '',
          "Actors" : '',
          "Awards" : '',
          "Runtime" : '',
          "Rating" : 0,
        }
      }
    }

  });

    Vue.component('footer-item', {
        template: `
     <div class="text-center">
        <a @click="$emit('change-page', 'index')"  class="btn btn-default" >Page d'accueil</a>
     </div>
    `
    });

    Vue.component('ajouter-film-form', {
        template: `
    <div class="col-lg-12" align="right">
		  <p><a @click="$emit('change-page', 'addFilm')"  class="btn btn-info" >Ajouter un film</a></p>
    </div>
    `

    });


    Vue.component('search-form', {

        template: `
<div>
    <h3>Recherche</h3>
    <form action="" method="post">
        <table class="table table-stripped">
            <tr>
                <td><label for="artiste"><strong>Artiste :</strong></label>
                    <select name="artiste">
                        <option selected="selected" disabled="disabled" >Tous</option>
                            <option value="?">?</option>
                    </select>
                </td>
                <td><label for="note"><strong>Note entre :</strong></label>
                    <select name="note">
                        <option selected="selected" disabled="disabled">Tous</option>
                        <option value=1>0 et 1</option>
                        <option value=2>1 et 2</option>
                        <option value=3>2 et 3</option>
                        <option value=4>3 et 4</option>
                        <option value=5>4 et 5</option>
                        <option value=6>5</option>
                    </select>
                </td>
                <td><label for="genre"><strong>Genre :</strong></label>
                    <select name="genre">
                        <option  selected="selected" disabled="disabled">Tous</option>
                            <option value="ss"> ss</option>

                    </select>
                </td>
                <td><label for="date"><strong>Sortie le :</strong></label>
                <input type="date" name="date" id="date"/></td>
                <td><input type="submit" class="btn btn-info" name="recherche" value="Rechercher"/></td>
            </tr>
        </table>
    </form>
    <br>
    </div>
    `,
    });

})()