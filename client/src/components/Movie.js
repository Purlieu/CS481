import React from 'react';

export default ({recipe, click}) => (
    <button id={recipe.recipe_id} onClick={click}
            style={{
                background: "Transparent no-repeat", border: "none", outline: "none", position: "relative", zIndex: "1"
            }}>
        <img src={recipe.image} alt={recipe.title} width="150" style={{position: "relative", zIndex: "-1"}}/>
        <span style={{position: "relative", zIndex: "-1"}}>{recipe.title}</span>
    </button>
)
