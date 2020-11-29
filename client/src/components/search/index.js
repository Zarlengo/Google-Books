import React, { useState, useContext} from "react";
import "./style.css";
import API from "../../utils/API";
import BookContext from "../../utils/BookContext";

function Search() {
    const [searchString, setSearchString] = useState("");
    const [ , setBooks ] = useContext(BookContext);

    const searchGoogle = (event) => {
        event.preventDefault();
        API.search({searchString}).then((response) => {
            if (response.status === 200) {
                setBooks(response.data);
            }
        })
    }

    return (
        <div className="search">
            <form>
                <label
                    className="searchLabel"
                >
                    Book Search
                </label>
                <input
                    className="searchButton"
                    type="submit"
                    value="Search"
                    onClick={(event) => searchGoogle(event)}
                />
                <input
                    className="bookSearch"
                    name="search"
                    type="text"
                    value={searchString}
                    onChange={(event) => setSearchString(event.target.value)}
                />
            </form>
        </div>
    )
}

export default Search;
