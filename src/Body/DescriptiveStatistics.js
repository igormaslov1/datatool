import React, {useState} from 'react';


function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div>
            <p>Descriptive Statistics</p>
        </div>
    );
}
export default Content;