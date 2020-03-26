import socketIOClient from "socket.io-client"
import React, { useState } from 'react';
import { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLog : undefined,
            logs : [],

            newPlayer : undefined,
            players : [],
        }

        //const socket = socketIOClient("http://127.0.0.1:5000");
        const socket = socketIOClient("https://safe-falls-95007.herokuapp.com/");

        socket.on("oldLogs", (logs) => {
            this.onClearArray()
            for(let log of logs){
                this.setState({newLog : log})
                this.onAddItem()
            }
        })

        socket.on("newLog", (log) => {
            this.setState({newLog : log})
            this.onAddItem()
        })

        socket.on("oldPlayers", (players) => {
            this.ClearUsers()
            for(let player of players){
                this.setState({newPlayer : player})
                this.onAddPlayer()
            }
        })

        socket.on("newPlayer", (player) => {
            this.setState({newPlayer : player})
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

        for(let log of this.state.logs){
            logs.push(<Log level={log.level} time="12.45" message={log.message} />)
        }

        for(let player of this.state.players){
            players.push(<Player name={player.name} />)
        }

        return (<div>
            <AppBar></AppBar>
            <AppContent>
                <Aside title="Players">
                    <List>
                        {players}
                    </List>
                </Aside>
                <Console>
                    <List>
                        {logs}
                    </List>
                </Console>
                <Aside title="Games">
                    <List>
                        <Game name="Game1" player1="Player1" player2="Player2" />
                    </List>
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

function AppBar() {
    return <header>
        <h3>Gamer Server Control Panel</h3>
        <style jsx>{`
            header{
                display : flex;
                flex : 0 1 auto;
                height : 50px;
                border-bottom : 0px solid lightblue;
                background-color : brown;
                color : white;
                z-index : 3;

                box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.7);
            }
            h3{
                margin : auto;
                margin-left : 20px;
            }
        `}</style>
    </header>
}

function AppContent(props) {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    display : flex;
                    flex-direction : row;
                    flex : 1 1 auto;
                    background-color : #FBE9E7;
                }
            `}
        </style>
    </div>
}

function Aside(props) {
    return <div className="user-manager">
        <TitleBar title={props.title} />
        <Container>
            {props.children}
        </Container>
        <style jsx>
            {`
                .user-manager{
                    flex : 1;
                    height : auto;

                    margin : 15px;
                    border : 0px solid lightblue;
                    border-radius : 5px;

                    background-color : whitesmoke;

                    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
                }
            `}
        </style>
    </div>
}

const Player = (props) => {
    return <li>
        <span>{props.name}</span>

        <style jsx>
            {`
            li{
                    margin : 0px;
                    height : 30px;
                    display : flex;
                    align-items : center;
                    list-style-type: none;
                    padding: 0px;
                    padding-left : 5px;
                    cursor : pointer;
                    border-radius : 3px;
                }
                li:hover{
                    background-color : #FF8F00;
                }

            `}
        </style>
    </li>
}

const Game = (props) => {
    return <li>
        <span>{props.name}</span>

        <style jsx>
            {`
            li{
                margin : 0px;
                height : 30px;
                display : flex;
                align-items : center;
                list-style-type: none;
                padding: 0px;
                padding-left : 5px;
                cursor : pointer;
                border-radius : 3px;
            }
            li:hover{
                background-color : #FF8F00;
            }

        `}
        </style>
    </li>
}

function Console(props) {
    return <div className="console">
        <TitleBar title="Console" />
        <Container>
            {props.children}
        </Container>

        <style jsx>
            {`
                .console{
                    flex : 2;
                    height : auto;
                    margin : 15px 0px;
                    border : 0px solid lightblue;
                    border-radius : 5px;

                    background-color : whitesmoke;

                    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
                }
            `}
        </style>
    </div>
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Log = (props) => {
    let levelColor = "blue"
    let icon = faInfoCircle

    if (props.level == "info") {
        levelColor = "blue"
        icon = faInfoCircle
    } else if (props.level == "warn") {
        levelColor = "#FBC02D"
        icon = faExclamationCircle
    } else if (props.level == "err") {
        levelColor = "#E65100"
        icon = faTimesCircle
    }

    const levelStyle = {
        marginLeft: 5,
        fontWeight: "bold",
        color: levelColor,
        minWidth: 40,
    }
    return <li>
        <FontAwesomeIcon icon={icon} color={levelColor} />
        <span className="time">{props.time}</span>
        <span className="message">{props.message}</span>
        <style jsx>
            {`
                li{
                    margin : 3px 0px;
                    display : flex;
                    align-items : center;
                    list-style-type: none;
                    padding: 1px;
                    cursor : pointer;
                    border-radius : 3px;
                    padding-left : 5px;
                }
                li:hover{
                    background-color : #FF8F00;
                }

                .time{
                    margin-left : 5px;
                    color : #004D40;
                    font-size : 15px;
                }

                .message{
                    margin-left : 5px;
                    font-weight : bold;
                    color : #4E342E;
                }
            `}
        </style>
    </li>
}

const List = (props) => {
    return <ul>
        {props.children}
        <style jsx>
            {`
               
                ul{
                    overflow-y: scroll;
                    overflow: auto;
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0; 
                    padding : 0px;
                    margin : 0px;
                } 
            `}
        </style>
    </ul>
}

const Footer = () => {
    return <footer>
        <h4>footer</h4>
        <style jsx>
            {`
                footer{
                    height : 30px;
                    width : 100%;
                    display : flex;

                    border-top : 0px solid lightblue;

                    background-color : brown;
                    color : white;

                    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.7);
                }

                h4{
                    margin : auto;
                }
            `}
        </style>
    </footer>
}

const TitleBar = (props) => {
    return <div>
        <h4>
            {props.title}
        </h4>

        <style jsx>
            {`
                div{
                    border-top-left-radius : 5px;
                    border-top-right-radius : 5px;
                    width : 100%;
                    height : auto;
                    border-bottom : 1px solid lightblue;
                    background-color : green;
                    color : white;
                }

                h4{
                    margin : auto;
                    padding : 5px;
                }
            `}
        </style>
    </div>
}

const Container = (props) => {
    return <div>
        {props.children}
        <style jsx>
            {`
                div{
                    margin : 10px;
                    position : relative;
                }
            `}
        </style>
    </div>
}

