import React from 'react';

type ButtonType = {
    title: string
    onClick?: () => void
}

export const Button = (props: ButtonType) => {
    return <button>{props.title}</button>

};
