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
      dealerCount: 0, 
      dealerCardThree: false
    })

  }


  render() {
    const {card, loading, dealCards, hit, stay, dealerCount, playerCount, dealerCardThree} = this.state;

    if (this.state.playerCount > 21) {
      setTimeout(() => alert('You Busted'), 500)
    }
    if (this.state.dealerCount >= 16 && this.state.playerCount > this.state.dealerCount) {
      setTimeout(() => alert('You Won!'), 500)
    }

    const deal = () => {
      let cardOne, cardTwo, cardThree
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

      if (this.state.card.cards[2].value ==  "KING" || this.state.card.cards[2].value ==  "QUEEN" || this.state.card.cards[2].value ==  "JACK") {
        cardThree = 10
      } else if (this.state.card.cards[2].value ==  "ACE") {
        cardThree = 11
      } else if (this.state.card.cards[2].value !=  "KING" || this.state.card.cards[2].value !=  "QUEEN" || this.state.card.cards[2].value !=  "JACK" || this.state.card.cards[2].value != "ACE") {
        cardThree = this.state.card.cards[2].value
      } 
      this.setState({
        dealerCount: parseInt(cardThree)
      })

      if (parseInt(cardOne) + parseInt(cardTwo) == 21) {
        setTimeout(() => alert('Blackjack!'), 500)
      }
      
  }; 

    const hitMe = () => {
      this.setState({
        hit: this.state.hit + 1, 
      })

      let cardFive
      if (this.state.card.cards[4].value ==  "KING" || this.state.card.cards[4].value ==  "QUEEN" || this.state.card.cards[4].value ==  "JACK") {
        cardFive = 10
      } else if (this.state.card.cards[4].value == "ACE" && this.state.playerCount <= 10) {
        cardFive = 11
      } else if (this.state.card.cards[4].value == "ACE" && this.state.playerCount >= 10) {
        cardFive = 1
      } else if (this.state.card.cards[4].value !=  "KING" || this.state.card.cards[4].value !=  "QUEEN" || this.state.card.cards[4].value !=  "JACK") {
        cardFive = this.state.card.cards[4].value
      } 
      if (this.state.hit === 0) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardFive)
        })
      }

      let cardSix
      if (this.state.card.cards[5].value ==  "KING" || this.state.card.cards[5].value ==  "QUEEN" || this.state.card.cards[5].value ==  "JACK") {
        cardSix = 10
      } else if (this.state.card.cards[5].value == "ACE" && this.state.playerCount <= 10) {
        cardSix = 11
      } else if (this.state.card.cards[5].value == "ACE" && this.state.playerCount >= 10) {
        cardSix = 1
      } else if (this.state.card.cards[5].value !=  "KING" || this.state.card.cards[5].value !=  "QUEEN" || this.state.card.cards[5].value !=  "JACK") {
        cardSix = this.state.card.cards[5].value
      } 
      if (this.state.hit === 1) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardSix)
        })
      }

      let cardSeven
      if (this.state.card.cards[6].value ==  "KING" || this.state.card.cards[6].value ==  "QUEEN" || this.state.card.cards[6].value ==  "JACK") {
        cardSeven = 10
      } else if (this.state.card.cards[6].value == "ACE" && this.state.playerCount <= 10) {
        cardSeven = 11
      } else if (this.state.card.cards[6].value == "ACE" && this.state.playerCount >= 10) {
        cardSeven = 1
      } else if (this.state.card.cards[6].value !=  "KING" || this.state.card.cards[6].value !=  "QUEEN" || this.state.card.cards[6].value !=  "JACK") {
        cardSeven = this.state.card.cards[6].value
      } 
      if (this.state.hit === 2) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardSeven)
        })
      }
    }

    const stayHere = () => {
      this.setState({
        stay: true
      })

      let cardFour
      if (this.state.card.cards[3].value ==  "KING" || this.state.card.cards[3].value ==  "QUEEN" || this.state.card.cards[3].value ==  "JACK") {
        cardFour = 10
      } else if (this.state.card.cards[3].value == "ACE" && this.state.dealerCount <= 10) {
        cardFour = 11
      } else if (this.state.card.cards[3].value == "ACE" && this.state.dealerCount >= 10) {
        cardFour = 1
      } else if (this.state.card.cards[3].value !=  "KING" || this.state.card.cards[3].value !=  "QUEEN" || this.state.card.cards[3].value !=this.state.card.cards[3].value != "ACE") {
        cardFour = this.state.card.cards[3].value
      } 

      this.setState({
        dealerCount: this.state.dealerCount + parseInt(cardFour)
      }) 

      if (this.state.dealerCount + parseInt(cardFour) < 16) {
        setTimeout(() => {
          this.setState({
            dealerCardThree: true
          })
        }, 500)
      }

    }

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
          {dealCards ? <DealerDraw cards={this.state.card} reveal={this.state.stay} dealerCount={this.state.dealerCount} dealerCardThree={dealerCardThree}/> : ''}
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
