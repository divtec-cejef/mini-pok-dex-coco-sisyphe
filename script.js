/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = 'red';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémons
const pokemonsTab = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau,toto', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

/*
 * Fonction qui retourne le code HTML de la carte du pokémon qui est passée en paramètre
 * @param pokemon { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' } un objet Pokémon
 */

// barreRecherche = barre de recherches HTML
// divContainer = liste contenant Pokemons HTML
// filtreType = quel type doit être affiché
// listeOrdre = quel ordre est choisi
const divContainer = document.querySelector('.pokemon-container');
const barreRecherche = document.getElementById('search-bar');
const filtreType = document.getElementById('type-filter');
const listeOrdre = document.getElementById('sort-order');

// Déclaration de la fonction qui génère une carte pokemon
function generatePokemonCardHTML(pokemon){
    const imgPath = `images/${pokemon.img}`;
    // Sort les types de la forme tableau d'objets pour les transformer en liste de chaînes de caractère (séparés par une virgule)
    let tabType = pokemon.type.split(',');
    let type1 = tabType[0]; // 1er type est en position 0
    let type2 = tabType[1]; // 2ème type est en position 1
    let bgColor = typeColors[type1]

    // Si un deuxième type existe
    if(type2) {
        let t2 = typeColors[type2] || DEFAULT_COLOR;
        bgColor = `linear-gradient(to right, ${typeColors[type1]} 50%, ${t2} 50%);`;
    }

    // Ce que contient la fonction comme attributs
    return `<div class="pokemon-card"
                 style="background: ${bgColor};">
                <img src="${imgPath}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <div>Type: ${pokemon.type.replace(',', ' / ')}</div>
                <div>Niveau: ${pokemon.level}</div>
            </div>
            `;
}

/*
 * Fonction qui affiche le nom des pokémons dans la <div class="pokemon-container">
 * @param = tableau Pokemons
 */
function displayPokemons(pokemonsTab) {

    // Vide le contenu du container
    divContainer.innerHTML = '';
    // Si tableau est vide, si la taille est de 0
    if(!pokemonsTab.length) {
        divContainer.innerHTML = "<p>Dracaufeu a tout brûlé, aucun Pokémon ne correspond à ta recherche !</p>";
        return; // Sort de la fonction
    }
    let resultatHTML = '';
    // Pour chaque pokémon du tableau pokemonsTab
    for (let pokemon of pokemonsTab) {
        resultatHTML += generatePokemonCardHTML(pokemon);
    }
    // Ajoute les cartes au container
    divContainer.innerHTML = resultatHTML;
}

/*
 * Fonction qui filtre les Pokemons en fonction de la recherche de l'utilisateur
 * (affiche que les résultats contenant la même chaîne de caractères que la recherche)
 * des filtres sélectionnés dans les menus déroulants,
 * (affiche uniquement si l'option sélectionnée est la même qu'un type de Pokemon)
 * et par ordre défini (croissant, alphabétique)
 */
function filtrerEtTrierPokemons() {
    divContainer.innerHTML = '';

    // crée une constante qui garde la valeur (en minuscules) entrée dans la barre de recerches
    const recherche = barreRecherche.value.toLowerCase();
    const typeChoisi = filtreType.value;
    const ordreChoisi = listeOrdre.value;

    // crée une variable qui compare la recherche avec les noms de Pokemons (mis en minuscule) dans le tableau pokemonsTab --> laisse passer seulement le (ou les) pokemon si correspondants
    let pokemonsFiltres = pokemonsTab.filter(pokemon => pokemon.name.toLowerCase().includes(recherche));
    // modification de la variable pokemonFiltres: filtrer le résultat déjà trié
    // si le type choisi est "rien" (et ne correspond à aucun type Pokemon), ne rien faire
    // si le type choisi dans le menu est égal à un des types de pokemons, filtrer les résultats pour n'afficher que ceux-ci
    pokemonsFiltres = pokemonsFiltres.filter(pokemon => typeChoisi === "" || pokemon.type.includes(typeChoisi));

    if(ordreChoisi === `name-asc`) {
        pokemonsFiltres.sort((a, b) => a.name.localeCompare(b.name)); // trier la variable par ordre alphabétique
                                                                                            // (nom de a comparé à nom de b, trier a et b par ordre alphabétique)
    } else if(ordreChoisi === `name-desc`) {
        pokemonsFiltres.sort((a, b) => b.name.localeCompare(a.name)); // trier la variable par ordre inverse alphabétique
                                                                                            // (nom de a comparé à nom de b, trier a et b par ordre inverse alphabétique)
    } else if(ordreChoisi === `level-asc`) {
        pokemonsFiltres.sort((a, b) => a.level - b.level); // trier la variable par ordre croissant
                                                                                // (int de pokemon.level de a comparé à int de pokemon.level de b, trier a et b par ordre croissant)
    } else if(ordreChoisi === `level-desc`) {
        pokemonsFiltres.sort((a, b) => b.level - a.level); // trier la variable par ordre décroissant
                                                                                // (int de pokemon.level de a comparé à int de pokemon.level de b, trier a et b par ordre décroissant)
    } else {
        pokemonsFiltres;
    }

    displayPokemons(pokemonsFiltres);
}

/*
 * Fonctions qui écoute les évènement
 * Si "entrée de texte" dans "barre de recherche", applique filtrer... quand évènement survient
 * Si "changement de choix" dans "filtre de types", applique filtrer... quand évènement survient
 * Si "changement de choix" dans "liste d'ordre", applique filtrer... quand évènement survient
 */
barreRecherche.addEventListener('input', filtrerEtTrierPokemons);
filtreType.addEventListener('change', filtrerEtTrierPokemons);
listeOrdre.addEventListener('change', filtrerEtTrierPokemons);

// Appelle la fonction filtrerEtTrierPokemons
filtrerEtTrierPokemons();