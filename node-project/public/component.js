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
                        <label for="inputAddress">Login</label>
                        <input type="text" class="form-control mesinputs" id="inputAddress" placeholder="Login">
                    </div>
                </div>
    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Mot de passe</label>
                        <input type="password" class="form-control" id="inputEmail4" placeholder="Mot de passe">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4"> Repéter le mot de passe</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <button type="submit" class="btn btn-primary">S'inscrire</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    
    `
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
                        <input v-model ="user" type="text" class="form-control mesinputs" id="inputAddress" placeholder="Login">
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
                        <button v-on:click="login()" class="btn btn-primary">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
	</div>
    
    `,
        data: function () {
          return {
            user : this.user,
            password: ''
          }
        },
        methods: {
          login () {
            var compo = this
            this.$http.post('/login', {
              user: this.user,
              password: this.password
            }).then(function (response){
              if (response.status === 200) {
                console.log(response.data.user)
                compo.$emit('changeuser', response.data.user)
                }
              })
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

        props : ['todo'],
        template : `

    <div class="col-lg-4">
        <div class="thumbnail">
            <img :src= "todo.Images[1]" alt="...">
            <div class="caption">
                <h3>{{ todo.Title }}</h3>
                <p>{{ todo.Plot }}</p>
                <i>{{ todo.Year }} </i>
                <p>
                    <a href= "/todo.id" class="btn btn-primary" role="button">Voir </a> 
                    <a href="#" class="btn btn-default" role="button">Editer </a>
                </p>
            </div>
        </div>
    </div>
    `

    });

    Vue.component('footer-item', {
        template: `
     <div class="text-center">
        <a @click="$emit('change-page', 'index')">Page d'accueil</a>
     </div>
    `
    });

    Vue.component('ajouter-film-form', {
        template: `
    <form method="post" action="">
		<input type='submit' class="btn btn-info row-fluid" value='Ajouter un film'/>
	</form>
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