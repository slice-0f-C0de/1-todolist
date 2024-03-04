import React from 'react';

type ButtonType = {
    title: string
}

export const Button = (props: ButtonType) => {
    return <div>
        {props.title}
        </div>
};
