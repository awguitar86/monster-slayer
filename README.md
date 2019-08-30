# Battle Star Wars

This is a game from the VueJS 2 Udemy course that I customized a little.

First off, this game was suppose to be against a monster, but I added a little http request to get Star Wars characters from the swapi api. So, this game is really you battling a Star Wars character. Sounds fun, right!? Unless you're up against Luke Skywalker. Then you might lose. 

This game is different from the one Max does on his course in a few ways:

* Again, I added a little http reqest to grab characters from swapi and it's random so it'll be a different character everytime you reload the page. The only thing is that sometimes swapi is really slow and it takes a little while to load. Be patient :)
* I added a Block and Obliterate button. 
  * The block button gives you a little health back.
  * The Obliterate button, yep you guessed it, obliterates the opponent. But this button is only available for use when your power is full.
* I added a power bar that fills with a little power every time a player attacks or does a special attack. But when a player heals the power goes down a just little bit.
* I added a loading page when you first load the webpage to give a little time to load the character from swapi.
* I added a modal when the game ends that says "You Win!" or "You Lose."
* I also added the effect of the losing player's health bar to turn red, and their power to go to 0.
* I added the functionality of switching turns between players. 
* When an attack or special attack happens it only damages the opponent. Or when you block or heal it only effects you and not the opponent.
* I also changed the ammount of damage or healing that happens.

Anways, hope you enjoy it! You can access the game here at: https://austin-monster-slayer.netlify.com/
