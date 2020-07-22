import React, { useState } from 'react';

import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));

const Search = ({ games, getQuery }) => {
  // console.log('games in search', games);
  const [text, setText] = useState('');
  const classes = useStyles();

  const onSearch = (q) => {
    setText(q);
    getQuery(q);
  };
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-search"
          label="Search Game"
          type="search"
          variant="outlined"
          value={text}
          onChange={(e) => onSearch(e.target.value)}
        />
      </form>
    </Grid>
  );
};

export default Search;
