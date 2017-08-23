import React from 'react';
import { CSSTransition } from 'react-transition-group';

const FadeOut = props => (
    <CSSTransition
        {...props}
        classNames="fadeout"
        timeout={300}
    />
)

export default FadeOut