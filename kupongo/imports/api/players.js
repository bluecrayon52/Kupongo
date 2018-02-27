import {Mongo} from 'meteor/mongo';

// constructor function for MongoDB for the players collection
export const Players = new Mongo.Collection('players');