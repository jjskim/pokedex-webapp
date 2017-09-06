'use strict';

var app = app || {};

let requestURL = "https://pokeapi.co/api/v2/pokemon/1" // Base URL of the pokemon we are requesting
let requestedPokemon;
let returnData;
let pokemonName;
let pokemonSprite;
let pokemonType = [];
let pokemonWeight;
let pokemonHeight;
let pokemonStats = []; // speed, spDef, spAtk, def, atk, hp -- in that order
// let pokemonDescription; // get this later

(function(module) {

  const pokemon = {};

  pokemon.getPokemonName = function() {
    $('#search').on('submit', function() {
      // console.log('hello');
      requestedPokemon = $('#poke-search').val();
      pokemon.getPokemonInfo(requestedPokemon);
    });
  };

  pokemon.getPokemonInfo = function(pokemonName) {
    // console.log('sending the request');
    $.ajax({
      url: requestURL,
      method: 'GET',
      success: function(data) {
        returnData = data;
        pokemon.loadPokemonInfo(returnData);
      }
    });

  };

  pokemon.loadPokemonInfo = function(returnData) {
    pokemonName = returnData.name;
    pokemonSprite = returnData.sprites.front_default;
    for (let i = 0; i < returnData.types.length; i++) {
      pokemonType.push(returnData.types[i].type.name);
    }
    pokemonHeight = returnData.height;
    pokemonWeight = returnData.weight;
    for (let j = 0; j < returnData.stats.length; j++) {
      pokemonStats.push(returnData.stats[j].base_stat);
    }
    pokemon.makePokedex();
  };

  pokemon.makePokedex = function() {
    let info = {
      pokeName: pokemonName,
      pokeHp: pokemonStats[5],
      pokeAtk: pokemonStats[4],
      pokeDef: pokemonStats[3],
      pokeSpecialAtk: pokemonStats[2],
      pokeSpecialDef: pokemonStats[1],
      pokeSpeed: pokemonStats[0],
      height: pokemonHeight,
      weight: pokemonWeight
    };
    var template = Handlebars.compile($('#pokedexTemplate').html())(info);
    $('#pokedex').append(template);
    $('main').hide();
    $('#pokedex').fadeIn();

  };

  module.pokemon = pokemon;

})(app);
