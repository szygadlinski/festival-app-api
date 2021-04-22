import React from 'react';

import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    {concerts.map(con => <Concert key={con.id} {...con} />)}
  </section>
)

export default Concerts;