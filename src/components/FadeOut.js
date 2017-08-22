import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const FadeOut = props => (
    <CSSTransition
        {...props}
        classNames="fadeout"
        timeout={300}
    />
)

export default FadeOut