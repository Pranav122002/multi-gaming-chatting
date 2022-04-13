const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let num_users_online = 0;
var tic_tac_toe_players = {},
  unmatched;
(GameCollection =
  require("./static/JAVASCRIPT/mortal-kombat-games.js").GameCollection),
  (games = new GameCollection());





    mongoose.connect("mongodb+srv://Pranav:multi-gaming-chatting@cluster0.pxjff.mongodb.net/test", {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  
  db.on("error", () => {
    console.log("error in conection");
  });
  db.once("open", () => {
    console.log("Mongodb Connected");
  });
  
  app.use("/", homeRouter);



  // mongoose.connect("mongodb://localhost:27017/multi-gaming-chatting", {
  //   useNewUrlParser: true,
  // });
  // const db = mongoose.connection;
  
  // db.on("error", () => {
  //   console.log("error in conection");
  // });
  // db.once("open", () => {
  //   console.log("Mongodb Connected");
  // });
  
  // app.use("/", homeRouter);
  
  








app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/index.html");
});

// global chat-app
app.get("/chat-app", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/chat-app.html");
});

// Multiplayer ingame chatbox
// app.get('/chat-box', function (req, res) {
//   res.sendFile(__dirname + '/static/HTML/chat-box.html');
// });

app.get("/tic-tac-toe", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/tic-tac-toe.html");
});

app.get("/mortal-kombat", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/mortal-kombat.html");
});

app.get("/battleship", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/battleship-index.html");
});

app.get("/battleship/singleplayer", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/battleship-singleplayer.html");
});

app.get("/battleship/multiplayer", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/battleship-multiplayer.html");
});

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/home.html");
});

app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/about.html");
});

app.get("/profile", function (req, res) {
  res.render("profile", { name: req.body.name, email: req.body.email });

  // res.sendFile(__dirname + '/views/profile.ejs');
});

app.get("/category", function (req, res) {
  res.sendFile(__dirname + "/static/HTML/category.html");
});

app.use("/static", express.static(path.join(__dirname, "static")));

// CHAT-APP
// CHAT-APP
// CHAT-APP
// CHAT-APP
// CHAT-APP
// CHAT-APP

// socket.io:
io.on("connection", function (socket) {
  //each socket is unique to each client that connects:
  console.log("chat-app");
  // console.log("socket.id: " + socket.id);

  //let the clients know how many online users are there:
  io.emit("updateNumUsersOnline", ++num_users_online);

  socket.on("username", function (username_from_client) {
    socket.username = username_from_client;

    //let all users know that this user has connected:
    io.emit("userConnected", socket.username);
  });

  //handle adding a message to the chat.
  socket.on("addChatMessage(client->server)", function (msg) {
    //io.emit(..., ...); - sending the message to all of the sockets.
    io.emit("addChatMessage(server->clients)", [
      socket.username,
      prepareMessageToClients(socket, msg),
    ]);
  });

  //handle isTyping feature
  //istyping - key down
  socket.on("userIsTypingKeyDown(client->server)", function (undefined) {
    io.emit("userIsTypingKeyDown(server->clients)", [
      socket.username,
      prepareIsTypingToClients(socket),
    ]);
  });

  //istyping - key up
  socket.on("userIsTypingKeyUp(client->server)", function (undefined) {
    io.emit("userIsTypingKeyUp(server->clients)", socket.username);
  });

  socket.on("disconnect", function () {
    io.emit("userDisconnected", socket.username);
    io.emit("updateNumUsersOnline", --num_users_online);
    console.log("chat-app disconnected");
  });
});

// //start our server:

// // -------------------------------------------------
function getParsedTime() {
  const date = new Date();

  let hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  let min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  return hour + ":" + min;
}

// Prepare the message that will be sent to all of the clients
function prepareMessageToClients(socket, msg) {
  return (
    "<span >" +
    ' <span class="timepra">' +
    getParsedTime() +
    " </span>" +
    " <strong>" +
    socket.username +
    "</strong> : " +
    msg +
    "</span>"
  );
}

//prepare the '___ is typing...' message
function prepareIsTypingToClients(socket) {
  return "<li><strong>" + socket.username + "</strong> is typing...</li>";
}

// tic-tac-toe
// tic-tac-toe
// tic-tac-toe
// tic-tac-toe
// tic-tac-toe
// tic-tac-toe

io.sockets.on("connection", function (socket) {
  console.log("tic tac toe");
  socket.emit("connect", { msg: "hello" });
  joinGame(socket);

  if (getOpponent(socket)) {
    socket.emit("game.begin", {
      symbol: tic_tac_toe_players[socket.id].symbol,
    });
    getOpponent(socket).emit("game.begin", {
      symbol: tic_tac_toe_players[getOpponent(socket).id].symbol,
    });
  }

  socket.on("make.move", function (data) {
    if (!getOpponent(socket)) {
      return;
    }
    socket.emit("move.made", data);
    getOpponent(socket).emit("move.made", data);
  });

  socket.on("disconnect", function () {
    if (getOpponent(socket)) {
      getOpponent(socket).emit("opponent.left");
    }
  });
});

function joinGame(socket) {
  tic_tac_toe_players[socket.id] = {
    opponent: unmatched,

    symbol: "X",
    // The socket that is associated with this player
    socket: socket,
  };
  if (unmatched) {
    tic_tac_toe_players[socket.id].symbol = "O";
    tic_tac_toe_players[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}

function getOpponent(socket) {
  if (!tic_tac_toe_players[socket.id].opponent) {
    return;
  }
  return tic_tac_toe_players[tic_tac_toe_players[socket.id].opponent].socket;
}

// mortal kombat
// mortal kombat
// mortal kombat
// mortal kombat
// mortal kombat
// mortal kombat

var Responses = {
    SUCCESS: 0,
    GAME_EXISTS: 1,
    GAME_NOT_EXISTS: 2,
    GAME_FULL: 3,
  },
  Requests = {
    CREATE_GAME: "create-game",
    JOIN_GAME: "join-game",
  };

io.sockets.on("connection", function (socket) {
  socket.on(Requests.CREATE_GAME, function (gameName) {
    if (games.createGame(gameName)) {
      games.getGame(gameName).addPlayer(socket);
      socket.emit("response", Responses.SUCCESS);
    } else {
      socket.emit("response", Responses.GAME_EXISTS);
    }
  });
  socket.on(Requests.JOIN_GAME, function (gameName) {
    var game = games.getGame(gameName);
    if (!game) {
      socket.emit("response", Responses.GAME_NOT_EXISTS);
    } else {
      if (game.addPlayer(socket)) {
        socket.emit("response", Responses.SUCCESS);
      } else {
        socket.emit("response", Responses.GAME_FULL);
      }
    }
  });
});

// battleship
// battleship
// battleship
// battleship
// battleship
// battleship

const connections = [null, null];

io.on("connection", (socket) => {
  // console.log('New WS Connection')

  // Find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  // Tell the connecting client what player number they are
  socket.emit("player-number", playerIndex);
  console.log("battleship");

  // console.log(`Player ${playerIndex} has connected`);

  // Ignore player 3
  if (playerIndex === -1) return;

  connections[playerIndex] = false;

  // Tell eveyone what player number just connected
  socket.broadcast.emit("player-connection", playerIndex);

  // Handle Diconnect
  socket.on("disconnect", () => {
    // console.log(`Player ${playerIndex} disconnected`);
    console.log("battleship disconnected");

    connections[playerIndex] = null;
    //Tell everyone what player numbe just disconnected
    socket.broadcast.emit("player-connection", playerIndex);
  });

  // On Ready
  socket.on("player-ready", () => {
    socket.broadcast.emit("enemy-ready", playerIndex);
    connections[playerIndex] = true;
  });

  // Check player connections
  socket.on("check-players", () => {
    const players = [];
    for (const i in connections) {
      connections[i] === null
        ? players.push({ connected: false, ready: false })
        : players.push({ connected: true, ready: connections[i] });
    }
    socket.emit("check-players", players);
  });

  // On Fire Received
  socket.on("fire", (id) => {
    console.log(`Shot fired from ${playerIndex}`, id);

    // Emit the move to the other player
    socket.broadcast.emit("fire", id);
  });

  // on Fire Reply
  socket.on("fire-reply", (square) => {
    console.log(square);

    // Forward the reply to the other player
    socket.broadcast.emit("fire-reply", square);
  });

  // Timeout connection
  setTimeout(() => {
    connections[playerIndex] = null;
    socket.emit("timeout");
    socket.disconnect();
  }, 600000); // 10 minute limit per player
});



http.listen(port, function () {
  console.log("listening on localhost : " + port);
});
