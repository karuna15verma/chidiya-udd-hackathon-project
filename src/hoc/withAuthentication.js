import React from "react";
import withFirebase from "./withFirebase";

const access = {};

const AuthUserContext = React.createContext(null);

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export { AuthUserContext };
export default withAuthentication;
