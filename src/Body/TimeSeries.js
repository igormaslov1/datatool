import React, {useState} from 'react';


function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div>
            <p>Time Series Plots</p>
        </div>
    );
}
export default Content;