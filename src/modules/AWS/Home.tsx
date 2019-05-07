import * as React from 'react';

export interface IManagementProps {
  history: any;
};

export default class AWSHome extends React.Component<IManagementProps, any> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AWS Amazon Web Services</h1>
        </header>
      </div>
    );
  }
}
