import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const FadeOut = ({ children, id }) => (
    <CSSTransition
        key={id}
        classNames="fadeout"
        timeout={0}
    >
        {children}
    </CSSTransition>
)

FadeOut.propTypes = {
    children: PropTypes.element
}

export default FadeOut