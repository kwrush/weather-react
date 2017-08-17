import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const Fade = ({ children }) => {
    <CSSTransitionGroup
        transitionName='fadeout'
        transitionLeaveTimeout={300}
        transitionLeave
    >
        {children}
    </CSSTransitionGroup>
}

Fade.propTypes = {
    children: PropTypes.element
}

export default Fade