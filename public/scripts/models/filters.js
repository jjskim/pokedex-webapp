'use strict';

var app = app || {};

let requestURL = 'https://pokeapi.co/api/v2/type' // Base URL of the pokemon we are requesting
let requestedPokemon;
let returnData;
let pokemonName;
let pokemonSprite;
let pokemonType = [];
let pokemonWeight;
let pokemonHeight;
let pokemonStats = []; // speed, spDef, spAtk, def, atk, hp -- in that order
let pokemonDescription;

(function(module) {

  const pokemon = {};

  pokemon.getPokemonName = function() {
    $('#search').on('click', function(e) {
      e.preventDefault();
      requestURL = 'https://pokeapi.co/api/v2/pokemon/'
      pokemonStats = []; // emptying the stats array for subsequent searches
      pokemonType = []; // emptying the types array for subsequent searches
      requestedPokemon = $('#poke-search').val().toLowerCase();
      requestURL += requestedPokemon;
      pokemon.getPokemonInfo(requestURL);
    });
  };

  pokemon.getPokemonInfo = function(requestURL) {
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
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon-species/" + requestedPokemon,
      method: 'GET',
      success: function(data) {
        pokemonDescription = data.flavor_text_entries[1].flavor_text;
        pokemon.makePokedex();
      }
    });
  };

  pokemon.makePokedex = function() {
    let info = {
      pokeName: pokemonName,
      pokeSprite: pokemonSprite,
      pokeDescription: pokemonDescription,
      pokeHp: pokemonStats[5],
      pokeAtk: pokemonStats[4],
      pokeDef: pokemonStats[3],
      pokeSpecialAtk: pokemonStats[2],
      pokeSpecialDef: pokemonStats[1],
      pokeSpeed: pokemonStats[0],
      pokeTypes: pokemonType,
      height: pokemonHeight / 10,
      weight: pokemonWeight / 10
    };


    $(document).ready(function(){
      var ctx = document.getElementById('pokeChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Hp', 'Atk', 'Def', 'Sp Atk', 'Sp Def', 'Spd'],
          datasets: [
            {
              data: [pokemonStats[5], pokemonStats[4], pokemonStats[3], pokemonStats[2], pokemonStats[1], pokemonStats[0]],
              backgroundColor: [
                '#1a8cff',
                '#3399ff',
                '#4da6ff',
                '#66b3ff',
                '#80bfff',
                '#99ccff'
              ]
            }
          ]
        }
      })
    });
    var template = Handlebars.compile($('#pokedexTemplate').html())(info);
    $('#pokedex').prepend(template);
    $('main').hide();
    $('#pokedex').fadeIn();

  };



  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.tooltips.enabled = false;

  module.pokemon = pokemon;

})(app);
