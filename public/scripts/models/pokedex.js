'use strict';

var app = app || {};

let requestURL = "https://pokeapi.co/api/v2/pokemon/" // URL of the pokemon we are requesting

let returnData;
let pokemonName;
let pokemonSprite;
let pokemonType = [];
let pokemonWeight;
let pokemonHeight;
let pokemonStats = []; // speed, spDef, spAtk, def, atk, hp
let pokemonDescription;

(function(module) {

  const pokemon = {}; // wtf am i even doing with my life?

$.ajax({
    url: 'https://pokeapi.co/api/v2/generation/1/',
    method: 'GET',
    success: function(data) {
        returnData = data;
    }
});

});
