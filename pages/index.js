import socketIOClient from "socket.io-client"
import React, { useState } from 'react';
import { Component } from 'react';

import List from "./components/List";
import Console from "./components/Console";
import Aside from './components/Aside'
import { Footer } from "./components/Footer";
import { Log } from "./components/Log";
import { Game } from "./components/Game";
import { Player } from "./components/Player";
import { AppBar } from "./components/AppBar";
import { AppContent } from "./components/AppContent";
import TitleBar from "./components/TitleBar";
import Container from "./components/Container";
import { BottomPanel, RoundButton } from './components/BottomPanel'
import { Button } from "./components/Button";
import Axios from "axios";

//const socket = socketIOClient("http://127.0.0.1:5000");
const socket = socketIOClient("https://safe-falls-95007.herokuapp.com/");

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newLog: undefined,
            logs: [],

            newPlayer: undefined,
            players: [],

            newGame: undefined,
            games: [],
        }

        this.handleMessages()

        // this.sendMessage = this.sendMessage.bind(this)
        // this.getMessage = this.getMessage.bind(this)
    }

    clearLogs = () => {
        this.setState({ logs: [] })
    };

    clearPlayers = () => {
        this.setState({ players: [] })
    }

    clearGames = () => {
        this.setState({ games: [] })
    }

    addLog = () => {
        this.setState(state => {
            const logs = [...state.logs, state.newLog];
            return {
                logs,
                newLog: undefined,
            };
        });
    };

    addPlayer = () => {
        this.setState(state => {
            const players = [...state.players, state.newPlayer];
            return {
                players,
                newPlayer: undefined,
            };
        });
    };

    addGame = () => {
        this.setState(state => {
            const games = [...state.games, state.newGame];
            return {
                games,
                newGame: undefined,
            };
        });
    }

    sendAddPlayerAction() {
        socket.emit("addPlayer", {})
    }

    sendServerResetAction() {
        socket.emit("reset", {})
    }

    //handle server socket messages
    handleMessages() {

        this.handleLogMessages()

        this.handlePlayerMessages()

        this.handleGamesMessages()

        this.handleOthers()
    }

    handleOthers() {
        socket.on("reset", (data) => {
            this.clearLogs();
            this.clearPlayers();
            this.clearGames();
        });
    }

    handleGamesMessages = () => {

        //add old games
        socket.on("oldGames", (games) => {
            this.clearGames();
            for (let game of games) {
                this.setState({ newGame: game });
                this.addGame();
            }
        });

        //add new game
        socket.on("newGame", (game) => {
            this.setState({ newGame: game });
            this.addGame();
        });
    }

    handlePlayerMessages() {
        socket.on("oldPlayers", (players) => {
            this.clearPlayers();
            for (let player of players) {
                this.setState({ newPlayer: player });
                this.addPlayer();
            }
        });
        //add new player
        socket.on("newPlayer", (player) => {
            this.setState({ newPlayer: player });
            this.addPlayer();
        });
    }

    //handle log messages
    handleLogMessages() {

        //get old logs
        socket.on("oldLogs", (logs) => {
            this.clearLogs()
            for (let log of logs) {
                this.setState({ newLog: log })
                this.addLog()
            }
        })

        //add new log
        socket.on("newLog", (log) => {
            this.setState({ newLog: log })
            this.addLog()
        })
    }

    render() {

        let logs = []
        let players = []
        let games = []

        let i = 0
        for (let log of this.state.logs) {
            logs.push(<Log key={i++} level={log.level} time="12.45" message={log.message} />)
        }

        let j = 0
        for (let player of this.state.players) {
            players.push(<Player key={j++} name={player.name} />)
        }

        let k = 0
        for (let game of this.state.games) {
            games.push(<Game key={k++} name={game.name} player1={game.player1Name} player2={game.player2Name} />)
        }

        return (<div>
            <AppBar title="Gamer Server Control Panel"></AppBar>
            <AppContent>
                <Aside title="Players">
                    <TitleBar title="Players"></TitleBar>
                    <Container>
                        <List>
                            {players}
                        </List>
                    </Container>
                    {/* <BottomPanel>
                        <RoundButton text="Add" click={this.sendAddPlayerAction} />
                        <RoundButton text="Delete All" />
                    </BottomPanel> */}
                </Aside>
                <Console>
                    <TitleBar title="Console"></TitleBar>
                    <Container>
                        <List>
                            {logs}
                        </List>
                    </Container>
                </Console>
                <Aside title="Games">
                    <TitleBar title="Games"></TitleBar>
                    <Container>
                        <List>
                            {games}
                        </List>
                    </Container>
                </Aside>
            </AppContent>
            <Footer >
                <Button text="Reset Server" click={this.sendServerResetAction}/>
                {/* <Button text="Send Message" click={this.sendMessage}></Button> */}
                {/* <Button text="Get Message" click={this.getMessage}></Button> */}
            </Footer>

            <style jsx global>
                {`
                html{
                    height : 100%;
                }
                body{
                    margin : 0px;
                    height : 100%;
                }

                #__next{
                    height : 100%;
                }

                div{
                    display : flex;
                    flex-direction : column;
                    height : 100%;
                }
            `}
            </style>
        </div>
        );
    }
    /*
    sendMessage() {
        const playerID = this.state.players[0].id
        Axios.post(
            'http://localhost:5000/sendMessages',
            { 
                id: playerID,
                //localMessageCount : 0,
                messages :[
                    {
                        type : "normal",
                        content : "Normal Message"
                    }
                ] },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) =>{
            console.log(response.data)
        })
    }

    getMessage(){
        const playerID = this.state.players[1].id
        Axios.post(
            'http://localhost:5000/getMessages',
            { 
                playerId : playerID,
                localMessageCount : 1,
                /*messages :[
                    {
                        type : "normal",
                        content : "Normal Message"
                    }
                ] 
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) =>{
            console.log(response.data)
        })
    }*/
}

export default HomePage;


