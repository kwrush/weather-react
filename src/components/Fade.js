import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Fade = ({ children }) => (
    <CSSTransition
        classNames="fadeout"
        timeout={300}
    >
        {children}
    </CSSTransition>
)

Fade.propTypes = {
    children: PropTypes.element
}

export default Fade