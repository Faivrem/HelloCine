Vue.component('index', {

    template : `
    <div class="jumbotron accueil_titre" style="background-image:url(../background.png);">
	    <h1>Bienvenue sur l'application Hello Ciné !</h1>
		<p></p>
		<p><a class="btn btn-primary btn-lg" href="connexion.html" role="button">Connexion</a>
		<a class="btn btn-primary btn-lg" href="inscription.html.html" role="button">Inscription</a></p>
	</div>
    `
});

Vue.component('navigation-bar', {
    template : `
    <nav class="navbar">
        <div class="page-header">
            <ul class="nav nav-pills pull-right ">
                <li> <a href="index.html">Accueil </a></li>
                <li> <a href="afficherFilm.html">Liste des films </a></li>
                <li> <a href="inscription.html">Inscription </a></li>

                <li>
                    <a href="connexion.html"> Connexion </Connexion><i class="glyphicon glyphicon-user"></i></a> </li>
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
            <h3 class="modal-title titre_site"> <a class="titre_site" href="#"><i class="glyphicon glyphicon-film"></i> HelloCine</a>
            </h3>
        </div>
    </nav>
    `
});

Vue.component('container-film', {

    template : `
    
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

    template : `
    <div class="panel panel-default">
	    <div class="panel-heading">
			<h1 class="modal-title">Connexion </h1>
		</div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="inputAddress">Login</label>
                        <input type="text" class="form-control mesinputs" id="inputAddress" placeholder="Login">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputEmail4">Mot de passe</label>
                        <input type="password" class="form-control mesinputs" id="inputEmail4" placeholder="Mot de passe">
                    </div>
                </div>
    
                <div class="form-row">
    
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <button type="submit" class="btn btn-primary">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
	</div>
    
    `
});

Vue.component('podium', {

    template : `
    <h2 class="top_titre_centrer">Les  3 derniers films</h2>
    `
});


Vue.component('film-item', {

    props : ['todo'],
    template : `
    <div class="col-sm-4 col-md-4">
        <div class="thumbnail">
            <img src= '{{ todo.image }}' alt="...">
            <div class="caption">
                <h3>{{ todo.titre }}</h3>
                <p>{{ todo.description }}</p>
                <i>{{ todo.annee }} </i>
                <p><a href="#" class="btn btn-primary" role="button">Voir </a> <a href="#" class="btn btn-default" role="button">Editer </a></p>
            </div>
        </div>
    </div>
    `

});


Vue.component('footer-item', {
    template: `
    <footer>
        <div class="text-center">
            <a href="index.html">Page d'accueil</a>
        </div>
	</footer>
    `
});

const app = new Vue ({
    el:'#app',
    data: {
        name : "Hello Cine",
        filmsList: [
            { id: 0, titre: 'Films1', description: 'Description1', annee: 'Année 1', image: 'https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjMve26vpjeAhWrz4UKHfVBClsQjRx6BAgBEAU&url=https%3A%2F%2Fpngtree.com%2Ffree-icon%2Fclapperboard_959598&psig=AOvVaw3Vh1qasCugvdaKYlc0iydq&ust=1540244074938328'},
            { id: 1, titre: 'Films2', description: 'Description2', annee: 'Année 2' , image: 'https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjMve26vpjeAhWrz4UKHfVBClsQjRx6BAgBEAU&url=https%3A%2F%2Fpngtree.com%2Ffree-icon%2Fclapperboard_959598&psig=AOvVaw3Vh1qasCugvdaKYlc0iydq&ust=1540244074938328'},
            { id: 2, titre: 'Films3', description: 'Description3', annee: 'Année 3', image: '\'https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjMve26vpjeAhWrz4UKHfVBClsQjRx6BAgBEAU&url=https%3A%2F%2Fpngtree.com%2Ffree-icon%2Fclapperboard_959598&psig=AOvVaw3Vh1qasCugvdaKYlc0iydq&ust=1540244074938328'}
        ]

    }
});