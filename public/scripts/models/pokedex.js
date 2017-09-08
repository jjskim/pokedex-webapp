'use strict';

var app = app || {};

let requestURL = 'https://pokeapi.co/api/v2/pokemon/' // Base URL of the pokemon we are requesting
let requestedPokemon;
let returnData;
let pokemonName;
let pokemonSprite;
let pokemonType = [];
let pokemonWeight;
let pokemonHeight;
let pokemonStats = []; // speed, spDef, spAtk, def, atk, hp -- in that order
let pokemonDescription;
let language;
let languageKey;
const LANGUAGE_MASTER_KEY = { // english, japanese, french, german, spanish, italian

  English: {
    stats: ['HP', 'Attack', 'Defence', 'Special Attack', 'Special Defence', 'Speed'],
    labels: ['Height', 'Weight', 'Type', 'Stats'],
    flavorTextIndex: 1,
    nameIndex: 0,
    typeIndex: 6
  },

  Japanese: {
    stats: ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ'],
    labels: ['高さ', '重量', 'タイプ', '値'],
    flavorTextIndex: 7,
    nameIndex: 8,
    typeIndex: 0
  },

  French: {
    stats: ['PV', 'Attaque', 'Défense', 'Attaque Spéciale', 'Défense Spéciale', 'Vitesse'],
    labels: ['La taille', 'Poids', 'Type', 'Valeurs'],
    flavorTextIndex: 5,
    nameIndex: 4,
    typeIndex: 2
  },

  German: {
    stats: ['KP', 'Angriff', 'Verteidigung', 'Spezialangriff', 'Spezialverteidigung', 'Initiative'],
    labels: ['Höhe', 'Gewicht', 'Art', 'Werte'],
    flavorTextIndex: 4,
    nameIndex: 3,
    typeIndex: 3
  },

  Spanish: {
    stats: ['PS', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'],
    labels: ['Altura', 'Peso', 'Tipo', 'Valores'],
    flavorTextIndex: 3,
    nameIndex: 2,
    typeIndex: 4
  },

  Italian: {
    stats: ['PS', 'Attacco', 'Difesa', 'Attacco Speciale', 'Difesa Speciale', 'Velocità'],
    labels: ['Altezza', 'Peso', 'Tipo', 'Valori'],
    flavorTextIndex: 2,
    nameIndex: 1,
    typeIndex: 5
  },

};

(function(module) {

  const pokemon = {};

  $(document).ready(function() {
    $('.toggle-nav').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      $('.menu ul').toggleClass('active');
    });
  });
  pokemon.getPokemonName = function() {
    $('.pikapic').hide();
    $('#search').on('submit', function(e) {
      $('#search button').hide();
      e.preventDefault();
      requestURL = 'https://pokeapi.co/api/v2/pokemon/'
      pokemonStats = []; // emptying the stats array for subsequent searches
      pokemonType = []; // emptying the types array for subsequent searches
      requestedPokemon = $('#poke-search').val().toLowerCase();
      language = $('#language-filter').val();
      pokemon.setLanguageKey(language);
      requestURL += requestedPokemon;
      $('.pikapic').show();
      pokemon.getPokemonInfo(requestURL);
    });
  };

  pokemon.setLanguageKey = function(language) {
    if (language === "English") {
      languageKey = LANGUAGE_MASTER_KEY.English;
    } else if (language === "Japanese") {
      languageKey = LANGUAGE_MASTER_KEY.Japanese;
    } else if (language === "French") {
      languageKey = LANGUAGE_MASTER_KEY.French;
    } else if (language === "German") {
      languageKey = LANGUAGE_MASTER_KEY.German;
    } else if (language === "Spanish") {
      languageKey = LANGUAGE_MASTER_KEY.Spanish;
    } else if (language === "Italian") {
      languageKey = LANGUAGE_MASTER_KEY.Italian;
    }
  };

  pokemon.getPokemonInfo = function(requestURL) {
    $.ajax({
      url: requestURL,
      method: 'GET',
      success: function(data) {
        returnData = data;
        for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
          $.ajax({
            url: data.types[typeIndex].type.url,
            method: 'GET',
            success: function(data) {
              pokemonType.push(data.names[languageKey.typeIndex].name);
            }
          });
        }
        pokemon.loadPokemonInfo(returnData);
      }
    });
  };

  pokemon.loadPokemonInfo = function(returnData) {
    pokemonSprite = returnData.sprites.front_default;
    pokemonHeight = returnData.height;
    pokemonWeight = returnData.weight;
    for (let j = 0; j < returnData.stats.length; j++) {
      pokemonStats.push(returnData.stats[j].base_stat);
    }
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon-species/" + requestedPokemon,
      method: 'GET',
      success: function(data) {
        pokemonName = data.names[languageKey.nameIndex].name;
        pokemonDescription = data.flavor_text_entries[languageKey.flavorTextIndex].flavor_text;
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
      weight: pokemonWeight / 10,
      heightTitle: languageKey.labels[0],
      weightTitle: languageKey.labels[1],
      typeTitle: languageKey.labels[2],
      statsTitle: languageKey.labels[3],
      hpTitle: languageKey.stats[0],
      atkTitle: languageKey.stats[1],
      defTitle: languageKey.stats[2],
      spAtkTitle: languageKey.stats[3],
      spDefTitle: languageKey.stats[4],
      speedTitle: languageKey.stats[5]
    };


    $(document).ready(function() {
      var ctx = document.getElementById('pokeChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          // labels: languageKey.stats,
          labels: ['Hp', 'Atk', 'Def', 'Sp Atk', 'Sp Def', 'Spd'],
          datasets: [{
            data: [pokemonStats[5], pokemonStats[4], pokemonStats[3], pokemonStats[2], pokemonStats[1], pokemonStats[0]],
            backgroundColor: [
              '#1a8cff',
              '#3399ff',
              '#4da6ff',
              '#66b3ff',
              '#80bfff',
              '#99ccff'
            ]
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    });

    var template = Handlebars.compile($('#pokedexTemplate').html())(info);
    $('#pokedex').prepend(template);
    $('#pokedex').fadeIn();
    $('.pikapic').hide();
    $('#search button').show();
  };

  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.tooltips.enabled = false;

  module.pokemon = pokemon;

})(app);
