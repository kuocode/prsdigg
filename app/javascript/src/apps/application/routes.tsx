import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Article, ArticleNew, Home } from './pages';

export function Routes() {
  return (
    <React.Fragment>
      <Route path='/' exact>
        <Home />
      </Route>
      <Switch>
        <Route path='/articles/new' exact>
          <ArticleNew />
        </Route>
        <Route path='/articles/:uuid' exact>
          <Article />
        </Route>
      </Switch>
    </React.Fragment>
  );
}