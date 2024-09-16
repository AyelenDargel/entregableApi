const contenedor = document.getElementById(`contenedor`);

const obtenerPokemon = async () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
    .then(response => response.json()) // Convierte la respuesta a JSON directamente
    .then(data => {
      console.log(data);
      if (data.results) {
        let cardsInRow = 0;
        data.results.forEach(async (pokemon) => {
          // Obtén la información del Pokémon
          const pokemonData = await fetch(pokemon.url);
          const pokemonDetails = await pokemonData.json();

          // Crea la card
          const card = document.createElement(`div`);
          card.classList.add(`col-md-2`); 
          card.classList.add(`card`);

          // Crea el cuerpo de la card
          const cardBody = document.createElement(`div`);
          cardBody.classList.add(`card-body`);

          // Crea el elemento h5
          const h5 = document.createElement(`h5`);
          h5.classList.add(`card-title`);
          h5.textContent = `nombre: ${pokemon.name}`;

          // Crea la imagen
          const img = document.createElement(`img`);
          img.src = pokemonDetails.sprites.front_default;
          img.alt = `${pokemon.name} image`;
          img.classList.add(`card-img-top`); 

          // Agrega el h5 y la imagen al cuerpo de la card
          cardBody.appendChild(h5);
          cardBody.appendChild(img);

          // Agrega el cuerpo de la card a la card
          card.appendChild(cardBody);

          // Agrega la card al contenedor
          contenedor.appendChild(card);

          cardsInRow++;// Incrementa el contador de cards en la fila

          // Si se han agregado 5 cards, crea un nuevo row
          if (cardsInRow === 5) {
            cardsInRow = 0;
            const newRow = document.createElement(`div`);
            newRow.classList.add(`row`);
            contenedor.appendChild(newRow);
          }
        });
      } else {
        console.error(`La respuesta no tiene la propiedad "results"`);
      }
    })
    .catch(error => {
      console.error(`Error:`, error);
    });
};

const main = async () => {
  await obtenerPokemon();
};

main();