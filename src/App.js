import React from "react";
import "./App.css";
import ImagesData from "./Components/ImagesData";
import { TextField, Button } from "@material-ui/core";
import DialogBox from "./Components/DialogBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: ImagesData,
      randomImage: "",
      firstPlayerScore: 0,
      secondPlayerScore: 0,
      startGame: false,
      playerType: "",
      firstPlayerName: "",
      secondPlayerName: "",
      firstPlayerSelected: false,
      secondPlayerSelected: false,
      autoPlayerData: [true, false, true, false, true, false, true, false, true, false],
      winnerMessage: "",
      openDialog: false,
      setIntervalAction: true,
    };
  }

  componentWillMount() {
    console.log(this.state.images);
    const random = Math.floor(Math.random() * this.state.images.length);
    console.log(random, this.state.images[random]);
    const randomData = (random, this.state.images[random]);
    this.setState({ randomImage: randomData });
  }

  setImage = () => {
    console.log("setimage call");
    const random = Math.floor(Math.random() * this.state.images.length);
    console.log(random, this.state.images[random]);
    const randomData = (random, this.state.images[random]);
    this.setState({ randomImage: randomData, firstPlayerSelected: false, secondPlayerSelected: false });
  };

  computerPlayer = () => {
    alert("computer start");
    const random = Math.floor(Math.random() * this.state.autoPlayerData.length);
    console.log(random, this.state.autoPlayerData[random]);
    const randomData = (random, this.state.autoPlayerData[random]);
    console.log(randomData);
    this.setState({ autoPlayerData: randomData }, () => {
      this.firstPlayerFlyFunction();
    });
  };

  firstPlayerFlyFunction = () => {
    this.setState(
      {
        firstPlayerScore:
          this.state.playerType === "user"
            ? this.state.firstPlayerSelected === false
              ? this.state.randomImage.canFly === "yes"
                ? this.state.firstPlayerScore + 1
                : this.state.firstPlayerScore
              : this.state.firstPlayerScore
            : this.state.autoPlayerData === false
            ? this.state.firstPlayerScore
            : this.state.firstPlayerScore + 1,
        setIntervalAction: false,
      },
      () => {
        this.setState({ firstPlayerSelected: true });
        setTimeout(this.setImage, 2000);
      }
    );
  };

  firstPlayerNotFlyFunction = () => {
    this.setState(
      {
        firstPlayerScore:
          this.state.firstPlayerSelected === false
            ? this.state.randomImage.canFly === "no"
              ? this.state.firstPlayerScore + 1
              : this.state.firstPlayerScore
            : this.state.firstPlayerScore,
        setIntervalAction: false,
      },
      () => {
        this.setState({ firstPlayerSelected: true });
        setTimeout(this.setImage, 2000);
      }
    );
  };

  secondPlayerFlyFunction = () => {
    this.setState(
      {
        secondPlayerScore:
          this.state.secondPlayerSelected === false
            ? this.state.randomImage.canFly === "yes"
              ? this.state.secondPlayerScore + 1
              : this.state.secondPlayerScore
            : this.state.secondPlayerScore,
        setIntervalAction: false,
      },
      () => {
        this.setState({ secondPlayerSelected: true });
        setTimeout(this.setImage, 2000);
      }
    );
  };

  secondPlayerNotFlyFunction = () => {
    this.setState(
      {
        secondPlayerScore:
          this.state.secondPlayerSelected === false
            ? this.state.randomImage.canFly === "no"
              ? this.state.secondPlayerScore + 1
              : this.state.secondPlayerScore
            : this.state.secondPlayerScore,
      },
      () => {
        this.setState({ secondPlayerSelected: true });
        setTimeout(this.setImage, 1000);
      }
    );
  };
  startGameFunction = () => {
    this.setState({ startGame: true }, () => {
      if (this.state.playerType === "computer") {
        setTimeout(this.computerPlayer, 1000);
      }
    });
  };

  getWinnerFunction = () => {
    this.setState({ openDialog: true }, () => {
      if (this.state.firstPlayerScore > this.state.secondPlayerScore) {
        this.setState({
          winnerMessage:
            this.state.playerType === "user" ? `${this.state.firstPlayerName}! Win the game` : `Computer! Win the game`,
        });
      }
      if (this.state.firstPlayerScore == this.state.secondPlayerScore) {
        this.setState({
          winnerMessage: `No one Win the game! both user's score are same`,
        });
      } else {
        this.setState({
          winnerMessage:
            this.state.playerType === "user"
              ? `${this.state.secondPlayerName}! Win the game`
              : `Computer! Win the game`,
        });
      }
    });
  };

  closeDialogFunction = () => {
    this.setState({
      openDialog: false,
      startGame: false,
      playerType: "",
      images: ImagesData,
      randomImage: "",
      firstPlayerScore: 0,
      secondPlayerScore: 0,
      firstPlayerName: "",
      secondPlayerName: "",
      firstPlayerSelected: false,
      secondPlayerSelected: false,
      winnerMessage: "",
      setIntervalAction: true,
    });
  };

  selectPlayerType = (value) => {
    this.setState({ playerType: value });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    // setInterval(this.setImage, 10000);
    if (this.state.user)
      if (this.state.setIntervalAction) {
        this.intervalID = setInterval(this.setImage, 5000);
      } else {
        clearInterval(this.intervalID);
      }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "blue",
          height: "100vh",
          width: "100%",
          backgroundImage: "linear-gradient(to bottom right, green, #5d5da2, green)",
        }}
      >
        {this.state.startGame ? (
          <>
            {this.state.playerType === "user" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                      border: "2px solid white",
                      height: "60px",
                      width: "130px",
                    }}
                    onClick={() =>
                      this.state.playerType === "user" ? this.firstPlayerNotFlyFunction() : this.computerPlayer()
                    }
                  >
                    <span style={{ color: "white", fontSize: "30px", display: "flex", textAlign: "center" }}>
                      Don't Fly
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      this.state.playerType === "user" ? this.firstPlayerFlyFunction() : this.computerPlayer()
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                      border: "2px solid white",
                      height: "60px",
                      width: "100px",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "30px" }}>Fly</span>
                  </div>
                </div>
                <span style={{ fontSize: "20px" }}>{this.state.firstPlayerName}</span>
                <span
                  style={{ color: "white", fontSize: "20px", fontWeight: 600, marginTop: "5%", marginBottom: "5%" }}
                >
                  Score: {this.state.firstPlayerScore}
                </span>
              </>
            ) : (
              <span style={{ color: "white", fontSize: "20px", fontWeight: 600, marginTop: "5%", marginBottom: "5%" }}>
                Computer Score: {this.state.firstPlayerScore}
              </span>
            )}
            <div style={{ height: "200px", width: "200px", display: "flex", justifyContent: "center" }}>
              <img src={this.state.randomImage.imageUrl} alt="" style={{ height: "150px", width: "150px" }} />
            </div>
            <span style={{ color: "white", fontSize: "20px", fontWeight: 600, marginTop: "5%", marginBottom: "5%" }}>
              Score: {this.state.secondPlayerScore}
            </span>
            <span style={{ fontSize: "20px" }}>{this.state.secondPlayerName}</span>
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  border: "2px solid white",
                  height: "60px",
                  width: "130px",
                }}
                onClick={() => this.secondPlayerNotFlyFunction()}
              >
                <span style={{ color: "white", fontSize: "30px", display: "flex", textAlign: "center" }}>
                  Don't Fly
                </span>
              </div>
              <div
                onClick={() => this.secondPlayerFlyFunction()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  border: "2px solid white",
                  height: "60px",
                  width: "100px",
                }}
              >
                <span style={{ color: "white", fontSize: "30px" }}>Fly</span>
              </div>
            </div>
            <Button
              onClick={() => this.getWinnerFunction()}
              style={{ marginTop: "10%", color: "blue", backgroundColor: "white", marginTop: "3%" }}
              variant="contained"
              color="primary"
            >
              Stop the Game
            </Button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "50vh",
              width: "40vh",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            {this.state.playerType === "" ? (
              <div
                style={{
                  width: "80%",
                  height: "20vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => this.selectPlayerType("computer")}
                  style={{ color: "white" }}
                  variant="contained"
                  color="primary"
                >
                  Play With Computer
                </Button>
                <Button
                  onClick={() => this.selectPlayerType("user")}
                  style={{ color: "white" }}
                  variant="contained"
                  color="primary"
                >
                  Play Game
                </Button>
              </div>
            ) : (
              <>
                {this.state.playerType === "user" ? (
                  <>
                    <TextField
                      color="white"
                      style={{ color: "white" }}
                      id="outlined-basic"
                      onChange={this.handleChange("firstPlayerName")}
                      label="First Player Name"
                      value={this.state.firstPlayerName}
                      variant="outlined"
                    />
                    <TextField
                      color="white"
                      style={{ color: "white" }}
                      id="outlined-basic"
                      onChange={this.handleChange("secondPlayerName")}
                      label="Second Player Name"
                      value={this.state.secondPlayerName}
                      variant="outlined"
                    />
                  </>
                ) : (
                  <TextField
                    color="white"
                    style={{ color: "white" }}
                    id="outlined-basic"
                    onChange={this.handleChange("name")}
                    label="Your Name"
                    value={this.state.name}
                    variant="outlined"
                  />
                )}
                <Button
                  onClick={() => {
                    if (this.state.playerType === "user") {
                      if (this.state.firstPlayerName !== "" && this.state.secondPlayerName !== "") {
                        this.startGameFunction();
                      } else {
                        alert("fill the name");
                      }
                    } else {
                      if (this.state.name !== "") {
                        this.startGameFunction();
                      } else {
                        alert("fill the name");
                      }
                    }
                  }}
                  style={{ color: "white" }}
                  variant="contained"
                  color="primary"
                >
                  Start Game
                </Button>
              </>
            )}
          </div>
        )}
        {this.state.openDialog ? (
          <DialogBox closeDialogFunction={this.closeDialogFunction} winnerMessage={this.state.winnerMessage} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
