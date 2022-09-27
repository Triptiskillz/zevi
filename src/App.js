import { useState } from "react";
import "./App.scss";
var data = require("./MOCK_DATA.json");

export default function App() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>Search</h1>
        <div className="search-inner">
          <input
            type="text"
            placeholder="Search.."
            value={value}
            onChange={onChange}
          />
          <i
            class="fa fa-search"
            onClick={() => onSearch(value)}
            aria-hidden="true"
          ></i>
        </div>

        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row"
                key={item.full_name}
              >
                <div className="name">{item.full_name}</div>

                <div className="overlay">
                  <button class="btn">View</button>
                </div>
                <div className="fafa">
                  <i class="fa fa-heart"></i>
                </div>
              </div>
            ))}
        </div>

        <div className="flex-container">
          {data
            .filter((items) => {
              if (value == "") {
                return items;
              } else if (
                items.full_name.toLowerCase().includes(value.toLowerCase())
              ) {
                return items;
              }
            })
            .map((items, key) => {
              return (
                <div class="card">
                  <i class="fa fa-heart"></i>
                  <img src={items.image} alt="John" />
                  <h> {items.full_name}</h>
                  <p class="title">
                    {items.phone}
                    <br />
                    {items.email}
                  </p>
                  <p>{items.address}</p>
                  <p>
                    <button>View</button>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
