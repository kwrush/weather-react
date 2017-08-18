import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

export const SmallSkycon = (props) => {

    const {color, icon, autoplay} = props;

    return (
        <span 
            className="skycon-wrap"
            style={{
                display: 'inline-block',
                width: '32px',
                height: '32px'
            }}
        >
            <Skycons 
                icon={icon}
                color={`${color ? color : 'black'}`} 
                autoplay={autoplay}
                width={64}
                height={64}
            />
        </span>
    );
};

export const NormalSkycon = (props) => {
    const {color, icon, autoplay} = props;

    return (
        <span 
            className="skycon-wrap"
            style={{
                display: 'inline-block',
                width: '50px',
                height: '50px'
            }}
        >
            <Skycons 
                icon={icon}
                color={`${color ? color : 'black'}`} 
                autoplay={autoplay}
                width={84}
                height={84}
            />
        </span>
    );
};

SmallSkycon.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    autoplay: PropTypes.bool
};

NormalSkycon.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    autoplay: PropTypes.bool
};