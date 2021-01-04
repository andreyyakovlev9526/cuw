import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Archive from './components/Archive';
import Settings from './components/admin_components/Settings';
import Navigation from './components/page_parts/Navigation';
import Users from './components/admin_components/users/Users';
import Admin from './components/admin_components/Admin';
import Songs from './components/admin_components/songs/Songs';
import Members from './components/admin_components/members/Members';
import SongList from './components/admin_components/song-list/SongList';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/upload" exact/>

          <Route path="/admin/settings" component={Settings}/>

          <Route path="/archive" component={Archive}/>

          <Route path="/admin/song-list" component={SongList} exact/>

          <Route path="/admin/users" component={Users}/>

          <Route path="/admin/songs" component={Songs} />

          <Route path="/admin/members" component={Members} />

          <Route path="/admin" component={Admin}/>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
