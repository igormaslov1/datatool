import React, {useState} from 'react';


function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div>
            <p>Scatterplots</p>
        </div>
    );
}
export default Content;