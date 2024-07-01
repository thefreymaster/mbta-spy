import React from 'react';

const Zindex = ({zIndex, children}: {zIndex: number, children: React.ReactNode}) => (
    <div style={{zIndex}}>{children}</div>
)

export default Zindex;