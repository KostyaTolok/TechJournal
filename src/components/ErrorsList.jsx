import React from 'react';

function ErrorsList(props) {
    return (
        <div className={`errors-summary ${props.errors.length > 0 ? "errors-summary_enabled" : ""}`}>
            <ul>
                {props.errors.map((error, index) => {
                    return <li className="text-white pb-1" key={index}>{error}</li>
                })}
            </ul>
        </div>
    );
}

export default ErrorsList;