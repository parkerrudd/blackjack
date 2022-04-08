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
      stay: false
    })

  }


  render() {
    const {card, loading, dealCards, hit, stay} = this.state;

    const deal = () => {
      this.setState({
        dealCards:true
      })
    }; 

    const hitMe = () => {
      this.setState({
        hit: this.state.hit + 1, 
      })
    }
    return (

    <div className='App'>
        <div className='heading'>
          <h1>Blackjack</h1>
          <button onClick={deal} id="header-btn">Draw Cards</button>
        </div>

        <div>
          {dealCards ? <UserDraw cards={this.state.card} anotherCard={this.state.hit}/> : ''}
          {dealCards ? <DealerDraw cards={this.state.card}/> : ''}
        </div>
            {
            dealCards ?  
            <div className='player-btns'> 
                  <button onClick={hitMe} className='btns' id='hit-btn'>Hit Me</button>
                  <button className='btns' id='stay-btn'>Stay</button>
            </div> 
            : ''
            }
    </div>

    ); 
  }
}

export default App;
