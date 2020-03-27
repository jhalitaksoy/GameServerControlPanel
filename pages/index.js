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
import {BottomPanel, RoundButton} from './components/BottomPanel'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLog: undefined,
            logs: [],

            newPlayer: undefined,
            players: [],
        }

        const socket = socketIOClient("http://127.0.0.1:5000");
        //const socket = socketIOClient("https://safe-falls-95007.herokuapp.com/");

        socket.on("oldLogs", (logs) => {
            this.onClearArray()
            for (let log of logs) {
                this.setState({ newLog: log })
                this.onAddItem()
            }
        })

        socket.on("newLog", (log) => {
            this.setState({ newLog: log })
            this.onAddItem()
        })

        socket.on("oldPlayers", (players) => {
            this.ClearUsers()
            for (let player of players) {
                this.setState({ newPlayer: player })
                this.onAddPlayer()
            }
        })

        socket.on("newPlayer", (player) => {
            this.setState({ newPlayer: player })
            this.onAddPlayer()
        })

    }

    onClearArray = () => {
        this.setState({ logs: [] });
    };

    ClearUsers = () => {
        this.setState({ players: [] });
    }

    onAddItem = () => {
        this.setState(state => {
            const logs = [...state.logs, state.newLog];
            return {
                logs,
                newLog: undefined,
            };
        });
    };

    onAddPlayer = () => {
        this.setState(state => {
            const players = [...state.players, state.newPlayer];
            return {
                players,
                newPlayer: undefined,
            };
        });
    };

    render() {

        let logs = []
        let players = []

        let i = 0
        for (let log of this.state.logs) {
            logs.push(<Log key={i++} level={log.level} time="12.45" message={log.message} />)
        }

        for (let player of this.state.players) {
            players.push(<Player name={player.name} />)
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
                    <BottomPanel>
                        <RoundButton text="Add"/>
                        <RoundButton text="Delete All"/>
                    </BottomPanel>
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
                            <Game name="Game1" player1="Player1" player2="Player2" />
                        </List>
                    </Container>
                </Aside>
            </AppContent>
            <Footer />

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
}

export default HomePage;


