import React from 'react';
import CreatableSelect from 'react-select/creatable';

const createOption = option => ({ value: option, label: option });

const options = [
    createOption('Соль'),
    createOption('Сахар'),
    createOption('Вода'),
    createOption('Рис'),
    createOption('Греча'),
];

const IngredientSelector = () => (
    <CreatableSelect
        isMulti
        onChange={() => {}}
        options={options}
        placeholder="Выберите ингредиенты"
        formatCreateLabel={value => `Добавить новый ингредиент "${value}"`}
    />
);

export default IngredientSelector;