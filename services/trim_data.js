import React from 'react';
import PropTypes from 'prop-types';    

propTypes: {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string
    })
}