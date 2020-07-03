import React from 'react';
import CreatableSelect from 'react-select/creatable';

const createOption = option => ({ value: option, label: option });

const options = [
    createOption('гр'),
    createOption('кг'),
    createOption('мл'),
    createOption('л'),
];

const PortionUnitSelector = () => (
    <CreatableSelect
        onChange={() => {}}
        options={options}
        placeholder="Выберите единицу измерения"
        formatCreateLabel={value => `Добавить новую единицу измерения "${value}"`}
    />
);

export default PortionUnitSelector;
