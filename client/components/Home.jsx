import React from 'react';
import GameForm from './GameForm.jsx';
import GamesList from './GamesList.jsx';
import { AppBar, Tab, Tabs } from '@material-ui/core/';

const Home = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: 'games',
    1: 'add',
  };

  const indexToTabNames = {
    games: 0,
    add: 1,
  };
  const [selectedTab, setSelectedTab] = React.useState(indexToTabNames[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="My Games" />
          <Tab label="Add Games" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <GamesList />}
      {selectedTab === 1 && <GameForm />}
    </>
  );
};

export default Home;
