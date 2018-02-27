import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Players} from './../imports/api/players';

console.log('Players List:',Players.find().fetch());

Tracker.autorun(function(){
  console.log('Players List:',Players.find().fetch());
});

// temporary array of objects, eventually taken from DB
const players = [{
    _id: '1',
    name: 'Heather',
    score: 10
  }, {
    _id: '2',
    name: 'Nathan',
    score: 9
  },{
    _id: '3',
    name: 'Remi',
    score: 8
  },{
    _id: '4',
    name: 'Rue',
    score: 7
  }]; 

const renderPlayers = function (playersList) {
  return playersList.map(function(player) {
    return <p key={player._id}>{player.name} has {player.score} point(s).</p>; 
  });
};

Meteor.startup(function () {
  let name = 'Nathan';
  let title = 'Kupongo'; 
  let jsx = (
  <div>
    {/* This is a comment */}
    <h1>{title}</h1>
    <p>Hello {name}, This is from your client/main.js</p>
    <p>This is a new paragraph</p>
    {renderPlayers(players)}
  </div>
);
  ReactDOM.render(jsx, document.getElementById('app'));
}); 
