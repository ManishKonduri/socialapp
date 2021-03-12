import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ sendDataToParent }) => {
    const [searchText, setSearchText] = React.useState("");
    return (
        <div>
            <TextField label="Search" variant="filled" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            <SearchIcon style={{ marginTop: '25px' }} onClick={() => sendDataToParent(searchText)} />
        </div>
    );
  };

  export default SearchBar;