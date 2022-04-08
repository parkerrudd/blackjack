import React, { Component, useState } from 'react';
import './App.css';
import UserDraw from './userDraw';
import DealerDraw from './dealerDraw';

class App extends Component {

  state = {
    loading: true,
    card: null
  }

  async componentDidMount() {
    const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"; 
    const response = await fetch(url); 
    const data = await response.json(); 
    this.setState({
      card: data,
      loading: false,
      dealCards: false,
      hit: 0,
      stay: false,
      playerCount: 0, 
      dealerCount: 0
    })

  }


  render() {
    const {card, loading, dealCards, hit, stay, dealerCount, playerCount} = this.state;

    const deal = () => {
      let cardOne, cardTwo
      if (this.state.card.cards[0].value ==  "KING" || this.state.card.cards[0].value ==  "QUEEN" || this.state.card.cards[0].value ==  "JACK") {
        cardOne = 10
      } else if (this.state.card.cards[0].value ==  "ACE") {
        cardOne = 11
      }
      else if (this.state.card.cards[0].value !=  "KING" || this.state.card.cards[0].value !=  "QUEEN" || this.state.card.cards[0].value !=  "JACK") {
        cardOne = this.state.card.cards[0].value
      } 
      if (this.state.card.cards[1].value ==  "KING" || this.state.card.cards[1].value ==  "QUEEN" || this.state.card.cards[1].value ==  "JACK") {
        cardTwo = 10
      } else if (this.state.card.cards[1].value ==  "ACE") {
        cardTwo = 11
      } else if (this.state.card.cards[1].value !=  "KING" || this.state.card.cards[1].value !=  "QUEEN" || this.state.card.cards[1].value !=  "JACK") {
        cardTwo = this.state.card.cards[1].value
      } 
      this.setState({
        dealCards: true, 
        playerCount: parseInt(cardOne) + parseInt(cardTwo)
      })
      
  }; 

    const hitMe = () => {
      this.setState({
        hit: this.state.hit + 1, 
      })
    }

    const stayHere = () => {
      this.setState({
        stay: true
      })
    }

    // const compareCount = () => {
      
    // }
    return (

    <div className='App'>
        <div className='heading'>
          <div className="counts">
            <p>Player Count: {this.state.playerCount}</p>
            <p>Dealer Count: {this.state.dealerCount}</p>
          </div>
          <h1>Blackjack</h1>
          <button onClick={deal} id="header-btn">Draw Cards</button>
        </div>

        <div>
          {dealCards ? <UserDraw cards={this.state.card} anotherCard={this.state.hit} doneBetting={this.state.stay} playerCount={this.state.playerCount}/> : ''}
          {dealCards ? <DealerDraw cards={this.state.card} reveal={this.state.stay} dealerCount={this.state.dealerCount}/> : ''}
        </div>
            {
            dealCards ?  
            <div className='player-btns'> 
                  <button onClick={hitMe} className='btns' id='hit-btn'>Hit Me</button>
                  <button onClick={stayHere} className='btns' id='stay-btn'>Stay</button>
            </div> 
            : ''
            }
    </div>

    ); 
  }
}

export default App;
