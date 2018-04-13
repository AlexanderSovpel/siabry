import React from 'react';
import { Translate } from 'react-localize-redux';

import '../../sass/Footer.scss';

const Footer = function(props) {
  return (
    <footer className="footer">
      <p className="text footer__copyright">
        <Translate id="footer.copyright"></Translate>
      </p>
    </footer>
  );
}

export default Footer;