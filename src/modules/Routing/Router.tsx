import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../AWS/Home';
import S3Managent from '../S3/S3Managent';
import Routes from './routes';

export default class Router extends React.Component<any, any>{
  public render() {
    return (
      <Switch>
        <Route exact={true} path={Routes.AWS} component={Home} />
        <Route exact={true} path={Routes.S3} component={S3Managent} />
      </Switch>
    );
  }
}
