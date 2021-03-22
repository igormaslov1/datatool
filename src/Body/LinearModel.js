import React, {useState} from 'react';
import "./ToolContainers.css"

function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div class="general_container">
            <h2 class="container_header">Linear Model</h2>
        </div>
    );
}
export default Content;