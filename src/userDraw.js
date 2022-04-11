import React from "react";

function UserDraw(props) {

    return (
        <div className="firstCards">
            <div id="cardOne">
                <img src={props.cards.cards[0].image} alt="" />
            </div>
            <div id="cardTwo">
                <img src={props.cards.cards[1].image} alt="" />
            </div>
            {props.anotherCard > 0 ? 
            <div id="cardThree">
                <img src={props.cards.cards[4].image} alt="" />
            </div>: ''}
            {props.anotherCard > 1 ? 
            <div id="cardFour">
                <img src={props.cards.cards[5].image} alt="" />
            </div>: ''}
            {props.anotherCard > 2 ? 
            <div id="cardFive">
                <img src={props.cards.cards[6].image} alt="" />
            </div>: ''}
            {props.anotherCard > 3 ? 
            <div id="cardSix">
                <img src={props.cards.cards[9].image} alt="" />
            </div>: ''}
        </div>
        
    )
}

export default UserDraw;