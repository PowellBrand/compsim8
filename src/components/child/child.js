import React from 'react';

const child = (props) => {
return (
    <div>
        {/* 36E */}
        <button onClick = {props.doSomethingCool}>{props.title}</button>
    </div>
)


}

export default child;