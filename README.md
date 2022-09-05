# Pokedex

This is an app that allows you to view all available pokemons and choose two
to simulate the battle between them. Furthermore you can modify some basic
statistics like hp or damage from specific attacks.

## Running the app

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run cypress open`

Runs cypress test manager. Allows to run e2e tests and also component tests.

## Using the app

After running the user will visit a home page. The app bar allows to move
to the pokemon list. On pokemon list page the user can click the card he
selected to open the details of the pokemon.

Pokemon Details page contains a form  with inputs for hp, name and damage
for specific attacks. If damage input is disabled that means the atatck
doesn't have a damage assigned (user can read on the card what the attack
does and why it does not have damage). There is also displayed a cost for
each attack.

On the bottom of the Pokemon Details page there is a button that allows
the user to add a pokemon to battle. In the app bar there will be shown
how many pokemons are in the battle (maximum is 2 pokemons in battle).
after adding 2 pokemons to the battle, a user can hit the "Battle!" button
to simulate it and see who wins or if it is a draw.

Have fun!
