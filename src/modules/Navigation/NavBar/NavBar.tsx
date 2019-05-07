import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import awsLogo from '../../../images/aws.png';
import s3Logo from '../../../images/s3.svg';
import Routes from '../../Routing/routes';

import './navBar.css';

export class NavBar extends React.Component<any, any>{
  public render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={Routes.AWS}>
          <img src={awsLogo} alt="AWS" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={Routes.S3}><img src={s3Logo} alt="S3" /></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;