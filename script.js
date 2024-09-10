/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

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

// Tableau d'objets représentant les Pokémon
const pokemonTab = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { }
];

/*
 * Fonction qui retourne le code HTML de la carte du pokémon passé en paramètre
 * @param { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
 */
function generatePokemonCardHTML(pokemon) {
    return `<div class="pokemon-card" style="background: #705898;">
                <img src="images/${pokemon.img}" alt="${pokemon.name}"/>
                <h2>${pokemon.name}</h2>
                <div>Type: ${pokmon.type.replace(',',' / ')}</div>
                <div>Niveau: ${pokemon.level}</div>
            </div>`;
}
    

const containerDiv = document.querySelector('.pokemon-container');

// Fonction pour AFFICHER le nom des Pokemons dans le div
function displayPokemons() {

    containerDiv.innerHTML = ''; // EFFACE les données actuelles du div container-pokemon

    // à faire dans la condition: SI longueur du tableau est égale à 0 (différent de autre)
    if(!pokemonTab.length) { // if(pokemonTab.length === 0) --> === de valeur 0, de valeur numérique 0 et de type null
        containerDiv.innerHTML += "<p>Dracaufeu a tout brûlé, aucun Pokémon ne correspond à ta recherche !</p>";
        return; // sort de la fonction
    }

    
    let resultatHTML = ''; // CREE resultatHTML, pour n'appeler qu'une fois innerHTML (gourmand en énergie)
    for (let pokemon of pokemonTab) {
        resultatHTML += generatePokemonCardHTML(pokemon);
    }
    containerDiv.innerHTML = resultatHTML;
    /*
    for (let pokemon of pokemonTab) {
        let pokemonType = pokemon.type.split(',');

        if(pokemonType.length === 1){
            resultatHTML += `<p>${pokemon.name} <small>${pokemonType[0]}</small></p>`;
        } else if (pokemonType.length === 2){
            resultatHTML += `<p>${pokemon.name} <small>${pokemonType[0]}</small> <small>${pokemonType[1]}</small></p>`
        }
    }
    */



}
displayPokemons();