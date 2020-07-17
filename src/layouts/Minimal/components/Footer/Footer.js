import React from 'react';
import PropTypes from 'prop-types';

import './index.css';


const Footer = () => {

  return (
    <div className="footer">
    <p>© 2020 Copyright NTD</p>
  </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
