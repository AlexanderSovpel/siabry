import React from 'react';

import '../../sass/Preloader.scss';

function Preloader(props) {
  return (
    <div className={`preloader ${props.color}`}></div>
  );
}

export default Preloader;
