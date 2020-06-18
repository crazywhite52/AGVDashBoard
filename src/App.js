import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon, MDBLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Logo from './assets/jib-logo-white2.png';
import Routes from './Routes';
import AuthService from './authlogin/AuthService'
class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      collapseID: ''
    };
  }

  componentDidMount() {
    //console.log(this.Auth.loggedIn())
  }
  handleLogout() {
    this.Auth.logout();
    window.location.reload();
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className='flyout'>

          <MDBNavbar color='indigo' dark expand='md' fixed='top' scrolling>
            {/* <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} /> */}

            {/* <strong className='align-middle white-text'>AGV DashBoard</strong>
            </MDBNavbarBrand>  */}
            <MDBNavbarBrand href='#'>
              <img
                src={Logo}
                height='35'
                alt=''
              /> <strong className='align-middle white-text'>AGV DashBoard</strong>
            </MDBNavbarBrand>


            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            {this.Auth.loggedIn() && (
              <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user-circle" /> User
                    </MDBDropdownToggle>
                      <MDBDropdownMenu className='dropdown-default'>
                        <MDBDropdownItem onClick={this.handleLogout}>Log out</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>

                </MDBNavbarNav>
              </MDBCollapse>
            )}

          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>

          <MDBFooter color='indigo'>
            <p className='footer-copyright mb-0 py-3 text-center'>
              &copy; {new Date().getFullYear()} Copyright:
              <a href='/'> MIS </a>
            </p>
          </MDBFooter>

        </div>
      </Router>
    );
  }
}

export default App;
