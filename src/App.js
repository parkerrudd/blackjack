import React, { Component } from 'react';
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
      dealerCardThree: false, 
      dealerCardFour: false
    })

  }


  render() {
    const {dealCards,dealerCardThree, dealerCardFour} = this.state;

    if (this.state.playerCount > 21) {
      setTimeout(() => {
        alert('You Busted')
        window.location.reload()
    }, 500)

    }
    if (this.state.dealerCount >= 16 && this.state.playerCount > this.state.dealerCount) {
      setTimeout(() => {
        alert('You Won!')
        window.location.reload()
      }, 500)
    }

    if (this.state.dealerCount > 21) {
      setTimeout(() => {
        alert('Dealer Busted, You Win!')
        window.location.reload(); 
      }, 500)
    }

    const deal = () => {
      let cardOne, cardTwo, cardThree
      if (this.state.card.cards[0].value ===  "KING" || this.state.card.cards[0].value ===  "QUEEN" || this.state.card.cards[0].value ===  "JACK") {
        cardOne = 10
      } else if (this.state.card.cards[0].value ===  "ACE") {
        cardOne = 11
      } else if (this.state.card.cards[0].value === "ACE" && this.state.playerCount >= 10) {
        cardOne = 1
      }  else if (this.state.card.cards[0].value !==  "KING" || this.state.card.cards[0].value !==  "QUEEN" || this.state.card.cards[0].value !==  "JACK") {
        cardOne = this.state.card.cards[0].value
      } 
      
      if (this.state.card.cards[1].value ===  "KING" || this.state.card.cards[1].value ===  "QUEEN" || this.state.card.cards[1].value ===  "JACK") {
        cardTwo = 10
      } else if (this.state.card.cards[1].value ===  "ACE" && this.state.card.cards[0].value <= 10) {
        cardTwo = 11
      } else if (this.state.card.cards[1].value ===  "ACE" && this.state.card.cards[0].value >= 10) {
        cardTwo = 1
      } else if (this.state.card.cards[1].value !==  "KING" || this.state.card.cards[1].value !==  "QUEEN" || this.state.card.cards[1].value !==  "JACK") {
        cardTwo = this.state.card.cards[1].value
      } 
      this.setState({
        dealCards: true, 
        playerCount: parseInt(cardOne) + parseInt(cardTwo)
      })

      if (this.state.card.cards[2].value ===  "KING" || this.state.card.cards[2].value ===  "QUEEN" || this.state.card.cards[2].value ===  "JACK") {
        cardThree = 10
      } else if (this.state.card.cards[2].value ===  "ACE") {
        cardThree = 11
      } else if (this.state.card.cards[2].value !==  "KING" || this.state.card.cards[2].value !==  "QUEEN" || this.state.card.cards[2].value !==  "JACK" || this.state.card.cards[2].value !== "ACE") {
        cardThree = this.state.card.cards[2].value
      } 
      this.setState({
        dealerCount: parseInt(cardThree)
      })

      if (parseInt(cardOne) + parseInt(cardTwo) === 21 && cardThree + parseInt(this.state.card.cards[3].value) !== 21) {
        setTimeout(() => {
          alert('Blackjack!')
          window.location.reload(); 
        }, 500)
      }

      if (parseInt(cardThree) + parseInt(this.state.card.cards[3].value) === 21 && parseInt(cardOne) + parseInt(cardTwo) !== 21) {
        setTimeout(() => {
          alert('Dealer has blackjack. You lose')
          this.setState({
            stay: true,
            dealerCount: this.state.dealerCount + parseInt(this.state.card.cards[3].value)
          })
          window.location.reload(); 
        }, 500)
      }

      if (parseInt(cardOne) + parseInt(cardTwo) === 21 && cardThree + parseInt(this.state.card.cards[3].value) === 21) {
        setTimeout(() => alert('Tie!, both players have blackjack'), 500)
      }
      
  }; 

    const hitMe = () => {
      this.setState({
        hit: this.state.hit + 1, 
      })

      let cardFive
      if (this.state.card.cards[4].value ===  "KING" || this.state.card.cards[4].value ===  "QUEEN" || this.state.card.cards[4].value ===  "JACK") {
        cardFive = 10
      } else if (this.state.card.cards[4].value === "ACE" && this.state.playerCount <= 10) {
        cardFive = 11
      } else if (this.state.card.cards[4].value === "ACE" && this.state.playerCount >= 10) {
        cardFive = 1
      } else if (this.state.card.cards[4].value !==  "KING" || this.state.card.cards[4].value !==  "QUEEN" || this.state.card.cards[4].value !==  "JACK") {
        cardFive = this.state.card.cards[4].value
      } 
      if (this.state.hit === 0) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardFive)
        })
      }

      let cardSix
      if (this.state.card.cards[5].value ===  "KING" || this.state.card.cards[5].value ===  "QUEEN" || this.state.card.cards[5].value ===  "JACK") {
        cardSix = 10
      } else if (this.state.card.cards[5].value === "ACE" && this.state.playerCount <= 10) {
        cardSix = 11
      } else if (this.state.card.cards[5].value === "ACE" && this.state.playerCount >= 10) {
        cardSix = 1
      } else if (this.state.card.cards[5].value !==  "KING" || this.state.card.cards[5].value !==  "QUEEN" || this.state.card.cards[5].value !==  "JACK") {
        cardSix = this.state.card.cards[5].value
      } 
      if (this.state.hit === 1) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardSix)
        })
      }

      let cardSeven
      if (this.state.card.cards[6].value ===  "KING" || this.state.card.cards[6].value ===  "QUEEN" || this.state.card.cards[6].value ===  "JACK") {
        cardSeven = 10
      } else if (this.state.card.cards[6].value === "ACE" && this.state.playerCount <= 10) {
        cardSeven = 11
      } else if (this.state.card.cards[6].value === "ACE" && this.state.playerCount >= 10) {
        cardSeven = 1
      } else if (this.state.card.cards[6].value !==  "KING" || this.state.card.cards[6].value !==  "QUEEN" || this.state.card.cards[6].value !==  "JACK") {
        cardSeven = this.state.card.cards[6].value
      } 
      if (this.state.hit === 2) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardSeven)
        })
      }
      let cardTen
      if (this.state.card.cards[9].value ===  "KING" || this.state.card.cards[9].value ===  "QUEEN" || this.state.card.cards[9].value ===  "JACK") {
        cardTen = 10
      } else if (this.state.card.cards[9].value === "ACE" && this.state.playerCount <= 10) {
        cardTen = 11
      } else if (this.state.card.cards[9].value === "ACE" && this.state.playerCount >= 10) {
        cardTen = 1
      } else if (this.state.card.cards[9].value !==  "KING" || this.state.card.cards[9].value !==  "QUEEN" || this.state.card.cards[9].value !==  "JACK") {
        cardTen = this.state.card.cards[9].value
      } 
      if (this.state.hit === 3) {
        this.setState({
          playerCount: this.state.playerCount + parseInt(cardTen)
        })
      }
    }
    

    const stayHere = () => {
      this.setState({
        stay: true
      })

      let cardFour
      if (this.state.card.cards[3].value ===  "KING" || this.state.card.cards[3].value ===  "QUEEN" || this.state.card.cards[3].value ===  "JACK") {
        cardFour = 10
      } else if (this.state.card.cards[3].value === "ACE" && this.state.dealerCount <= 10) {
        cardFour = 11
      } else if (this.state.card.cards[3].value === "ACE" && this.state.dealerCount >= 10) {
        cardFour = 1
      } else if (this.state.card.cards[3].value !==  "KING" || this.state.card.cards[3].value !==  "QUEEN" || this.state.card.cards[3].value !== "JACK" || this.state.card.cards[3].value !== "ACE") {
        cardFour = this.state.card.cards[3].value
      } 

      this.setState({
        dealerCount: this.state.dealerCount + parseInt(cardFour)
      }) 

      if (this.state.dealerCount + parseInt(cardFour) < 16) {
        let cardEight
        if (this.state.card.cards[7].value ===  "KING" || this.state.card.cards[7].value ===  "QUEEN" || this.state.card.cards[7].value ===  "JACK") {
          cardEight = 10
        } else if (this.state.card.cards[7].value === "ACE" && this.state.dealerCount + cardFour <= 10) {
          cardEight = 11
        } else if (this.state.card.cards[7].value === "ACE" && this.state.dealerCount + cardFour >= 10) {
          cardEight = 1
        } else if (this.state.card.cards[7].value !==  "KING" || this.state.card.cards[7].value !==  "QUEEN" || this.state.card.cards[7].value !== "JACK" || this.state.card.cards[7].value !== "ACE") {
          cardEight = this.state.card.cards[7].value
        } 
        setTimeout(() => {
          this.setState({
            dealerCardThree: true, 
            dealerCount: this.state.dealerCount + parseInt(cardEight)
          })
        }, 1000)
      }

      if (this.state.dealerCount + parseInt(cardFour) + parseInt(this.state.card.cards[7].value) < 16) {
        let cardNine
        if (this.state.card.cards[8].value ===  "KING" || this.state.card.cards[8].value ===  "QUEEN" || this.state.card.cards[8].value ===  "JACK") {
          cardNine = 10
        } else if (this.state.card.cards[8].value === "ACE" && this.state.dealerCount <= 10) {
          cardNine = 11
        } else if (this.state.card.cards[8].value === "ACE" && this.state.dealerCount >= 10) {
          cardNine = 1
        } else if (this.state.card.cards[8].value !==  "KING" || this.state.card.cards[8].value !==  "QUEEN" || this.state.card.cards[8].value !== "JACK" || this.state.card.cards[8].value !== "ACE") {
          cardNine = this.state.card.cards[8].value
        } 
        setTimeout(() => {
          this.setState({
            dealerCardFour: true, 
            dealerCount: this.state.dealerCount + parseInt(cardNine)
          })
        }, 2000)
      }     
    }
    
    if (this.state.stay && this.state.dealerCount >= 16 && this.state.dealerCount === this.state.playerCount) {
      setTimeout(() => {
        alert('Tie')
        window.location.reload(); 
      }, 500)
    }

    if (this.state.dealerCount > this.state.playerCount && this.state.stay && this.state.dealerCount <= 21) {
      setTimeout(() => {
        alert('Dealer wins')
        window.location.reload(); 
      }, 500)
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
          {dealCards ? <DealerDraw cards={this.state.card} reveal={this.state.stay} dealerCount={this.state.dealerCount} dealerCardThree={dealerCardThree} dealerCardFour={dealerCardFour}/> : ''}
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
