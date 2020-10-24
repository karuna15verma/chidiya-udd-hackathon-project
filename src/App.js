import React from "react";
import "./App.css";
import ImagesData from "./Components/ImagesData";
import { TextField, Button } from "@material-ui/core";

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
      autoPlayerData: [true, false],
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
    const random = Math.floor(Math.random() * this.state.autoPlayerData.length);
    console.log(random, this.state.autoPlayerData[random]);
    const randomData = (random, this.state.autoPlayerData[random]);
    this.setState({ autoPlayerData: randomData });
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
      },
      () => {
        this.setState({ firstPlayerSelected: true });
        setTimeout(this.setImage, 1000);
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
      },
      () => {
        this.setState({ firstPlayerSelected: true });
        setTimeout(this.setImage, 1000);
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
      },
      () => {
        this.setState({ secondPlayerSelected: true });
        setTimeout(this.setImage, 1000);
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

  selectPlayerType = (value) => {
    this.setState({ playerType: value });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    console.log(this.state.autoPlayerData);
    //
    // setInterval(this.setImage, 10000);
    // if (this.state.firstPlayerSelected === false && this.state.secondPlayerSelected === false) {
    //   setTimeout(this.setImage, 5000);
    // }
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
                      this.state.playerType === "user" ? this.firstPlayerFlyFunction() : this.computerPlayer()
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
              ""
            )}
            {/* <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <span style={{ padding: "10px", display: "flex", textAlign: "center" }}>
                Hello, {this.state.name}! Play the game carefully and get the highest score
              </span>
              <span style={{ color: "white", fontSize: "20px", fontWeight: 600, marginTop: "5%", marginBottom: "5%" }}>
                Score:-{this.state.score}
              </span>
            </div> */}
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
                    label="Name"
                    value={this.state.name}
                    variant="outlined"
                  />
                )}
                <Button
                  onClick={() => this.startGameFunction()}
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
      </div>
    );
  }
}

export default App;
