import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'components/container';
import LandingPage from 'components/landingPage';

const url = 'http://' + window.location.hostname + ':8081/index.html';
const preview = 'http://' + window.location.hostname + ':3000/example.html';
const previewios = 'http://' + window.location.hostname + ':3000/example.html';
export default () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Switch>
      <Route path="/producer" component={Container} />
      <Route path="/vr" component={() => (window.location = url)} />
      <Route path="/preview" component={() => (window.location = preview)} />
      <Route path="/previewios" component={() => (window.location = previewios)} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </div>
);
