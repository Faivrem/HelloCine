Vue.component('index', {
    template : "<p> Je m'appelle {{ prenom + ' ' + familyName }}</p>",
    data : function() {
        return {
            prenom : "Ludovic",
            familyName : "Carlu"
        }
    }
});

Vue.component('navigation-bar', {
    template : `
    <nav class="navbar">
        <div class="page-header">
            <ul class="nav nav-pills pull-right ">
                <li> <a href="test/index.html">Accueil </a></li>
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
    `,
    data : {

    },
    methods : {
        
    }
});

const app = new Vue ({
    el:'#app',
    data: {
        name:'Hello Maxime'
    }
});