import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBInput, MDBCardText, MDBCol } from 'mdbreact';
import AuthService from './AuthService'


class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: '' };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    if (this.Auth.login(this.state.value) == true) {
      this.props.history.replace('/')
      window.location.reload();
    }
  }

  render() {

    return (
      <>
        <MDBContainer size="xl">
          <MDBRow style={{ marginTop: '4rem' }}>
            <MDBCol md="3">{''}</MDBCol>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                  waves />
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit}>
                    <MDBCardTitle>Sign in</MDBCardTitle>
                    <MDBInput
                      type="password" value={this.state.value}
                      onChange={this.handleChange}
                      label="Password"
                      outline />
                    <MDBBtn type="submit" >Sign In</MDBBtn>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="3">{''}</MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}

export default Login