import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown.jsx";
import Results from "./Results.jsx";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";
// import ThemeContext from "./ThemeContext.jsx";

function SearchParams(props) {
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  // // context + hook 的用法
  // const [theme, setTheme] = useContext(ThemeContext);

  function requestPets() {
    pet
      .animals({
        location: props.location,
        breed,
        type: animal,
      })
      .then(({ animals }) => {
        setPets(animals || []);
      });
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
  }, [setBreeds, setBreed, animal]);

  return (
    <div className="search-params">
      {/* context + theme */}
      {/* <label htmlFor="location">
        Theme
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="darkblue">Dark Blue</option>
          <option value="chartreuse">Chartreuse</option>
          <option value="mediumorchid">Medium Orchid</option>
        </select>
      </label> */}

      {/* redux */}
      <label htmlFor="location">
        Theme
        <select
          value={props.theme}
          onChange={(e) => props.setTheme(e.target.value)}
          onBlur={(e) => props.setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="darkblue">Dark Blue</option>
          <option value="chartreuse">Chartreuse</option>
          <option value="mediumorchid">Medium Orchid</option>
        </select>
      </label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            type="text"
            id="location"
            value={props.location}
            onChange={(e) => props.setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />

        <button style={{ backgroundColor: props.theme }} type="submit">
          Submit
        </button>
      </form>

      <div className="search">
        <Results pets={pets} />
      </div>
    </div>
  );
}

const mapStateToProps = ({ theme, location }) => ({ theme, location });
const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(changeTheme(theme)),
  setLocation: (location) => dispatch(changeLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
