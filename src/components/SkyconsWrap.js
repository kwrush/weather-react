import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

const sizeOptions = {
    's': {
        containerSize: { width: 20, height: 20 },
        skyconsSize: { width: 40, height: 40 }
    },

    'm': {
        containerSize: { width: 32, height: 32 },
        skyconsSize: { width: 64, height: 64 }
    },

    'l': {
        containerSize: { width: 45, height: 45 },
        skyconsSize: { width: 80, height: 80 }
    }
};

const SkyconsWrap = (props) => {
    const {color, icon, autoplay, size} = props;
    const opt = sizeOptions[size];

    return (
        <span 
            className="skycon-wrap"
            style={{
                display: 'inline-block',
                width: `${opt.containerSize.width}px`,
                height: `${opt.containerSize.height}px`
            }}
        >
            <Skycons 
                icon={icon}
                color={`${color ? color : 'black'}`} 
                autoplay={autoplay}
                width={opt.skyconsSize.width}
                height={opt.skyconsSize.height}
            />
        </span>
    );
}

SkyconsWrap.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    autoplay: PropTypes.bool,
    size: PropTypes.oneOf(['s', 'm', 'l'])
}

export default SkyconsWrap;