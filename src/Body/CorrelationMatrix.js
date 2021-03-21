import React, {useState} from 'react';


function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div>
            <p>Correlation Matrix</p>
        </div>
    );
}
export default Content;