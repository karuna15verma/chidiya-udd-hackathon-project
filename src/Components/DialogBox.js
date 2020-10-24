import React, { Component } from "react";
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

const styles = {
  heading: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "18",
    marginTop: "7%",
    fontSize: "1.1rem",
    color: "black",
  },
};
class DailogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Dialog
        ref={(e) => {
          try {
            // const target = ReactDOM.findDOMNode(e).children[2].children[0];
            // target.style.borderRadius = "20px";
          } catch (e) {
            // console.log(e);
          }
        }}
        open={true}
        onClose={this.props.closeDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="aria-describedby"
      >
        <DialogContent style={{ minWidth: "250px" }}>
          <DialogContentText>
            <div style={styles.heading}>{this.props.winnerMessage}</div>
          </DialogContentText>
        </DialogContent>
        <Divider style={{ margin: "0 15px" }} />
        <DialogActions
          style={{
            padding: "15px",
          }}
        >
          <Button
            onClick={() => {
              this.props.closeDialogFunction();
            }}
            style={{
              width: "30%",
              color: "blue",
              textTransform: "capitalize",
              margin: "0 15px 0 0",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DailogBox;
