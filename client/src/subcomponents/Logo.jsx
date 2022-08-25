import React from 'react'
import { Link } from 'react-router-dom';

function Logo({link}) {
  return (
    <div>
    <Link to={link}>
      <span className="self-center text-xl font-semibold whitespace-nowrap">
        Onetouchmatrimony
      </span>
    </Link>
    </div>
  );
}

export default Logo