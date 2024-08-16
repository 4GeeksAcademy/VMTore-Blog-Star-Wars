import Tatooine from "/src/img/Tatooine.webp";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      planets: [],
      vehicles: [],
      favorites: [],
      TatooineImg: {
        tatooine: Tatooine,
      },
      favorites: JSON.parse(sessionStorage.getItem("favorites")) || [],
    },
    actions: {
      fetchApi: async (url) => {
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Network wrong response");

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Fetch request failed:", error);
          throw error;
        }
      },

      getCharacters: async (id) => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/people/${id}`
          );
          return data.result;
        } catch (error) {
          console.log(error);
        }
      },

      getCharactersList: async () => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/people/`
          );
          const charactersDetailsPromises = data.results.map((character) =>
            actions.getCharacters(character.uid)
          );
          const charactersDetails = await Promise.all(
            charactersDetailsPromises
          );
          setStore({ characters: charactersDetails });
        } catch (error) {
          console.error("Failed to fetch characters list:", error);
        }
      },

      getVehicles: async (id) => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/vehicles/${id}`
          );
          return data.result;
        } catch (error) {
          console.error("Failed to fetch vehicle:", error);
        }
      },

      getVehiclesList: async () => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/vehicles/`
          );
          const vehiclesDetailsPromises = data.results.map((vehicle) =>
            actions.getVehicles(vehicle.uid)
          );
          const vehicleDetails = await Promise.all(vehiclesDetailsPromises);
          setStore({ vehicles: vehicleDetails });
        } catch (error) {
          console.error("Failed to fetch vehicles list:", error);
        }
      },

      getPlanets: async (id) => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/planets/${id}`
          );
          return data.result;
        } catch (error) {
          console.error("Failed to fetch planets:", error);
        }
      },

      getPlanetsList: async () => {
        const actions = getActions();
        try {
          const data = await actions.fetchApi(
            `https://www.swApi.tech/Api/planets/`
          );
          const planetsDetailsPromises = data.results.map((planet) =>
            actions.getPlanets(planet.uid)
          );
          const planetsDetails = await Promise.all(planetsDetailsPromises);
          setStore({ planets: planetsDetails });
        } catch (error) {
          console.error("Failed to fetch planets list:", error);
        }
      },

      addToFavorites: (item, type) => {
        const store = getStore();
        const favorites = store.favorites;

        // Creo un identificador único combinando `uid` y `type`
        const uniqueId = `${item.uid}-${type}`;

        // Verifico si el uniqueId ya está en la lista de favoritos
        const isAlreadyFavorite = favorites.some(
          (favorite) => favorite.uniqueId === uniqueId
        );

        // Si no está, lo agrego; si está, lo elimino
        const newFavorites = isAlreadyFavorite
          ? favorites.filter((favorite) => favorite.uniqueId !== uniqueId)
          : [...favorites, { ...item, type, uniqueId }];

        // Actualizo el store
        setStore({ favorites: newFavorites });
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      },

      getFavorites: () => {
        try {
          const storedFavorites = localStorage.getItem("favorites");
          if (storedFavorites) {
            setStore({ favorites: JSON.parse(storedFavorites) });
          }
        } catch (error) {
          console.log("Error fetching favorites from localStorage:", error);
        }
      },
    },
  };
};

export default getState;
