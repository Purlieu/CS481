import React from 'react';
import {Button} from 'reactstrap';

export default ({recipe, back}) => (
    <div>
        <div>Name: {recipe.name}</div>
        <div>ID: {recipe.recipe_id}</div>
        <div>Category: {recipe.category}</div>
        <div>Ingredient One: {recipe.ingredient1}</div>
        <div>Ingredient Two: {recipe.ingredient2}</div>
       <Button onClick={back} color="primary">Back</Button>
    </div>
);
