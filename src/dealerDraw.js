import React from "react";

function DealerDraw(props) {

    return (
        <div className="dealerCards">
            <div id="dealer-card-one">
                <img src={props.cards.cards[2].image} alt="" />
            </div>
            <div id="dealer-card-two">
                {
                props.reveal ? <img src={props.cards.cards[3].image} alt="" />:    
                <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="" />
                }
                
            </div>
        </div>
    )
}

export default DealerDraw;