import React, {useState} from 'react';
import "./ToolContainers.css"

function Content(props){

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){

      }

    return (
        <div class="general_container"> 
            <div class="container_content">
                <h2 class="container_header">Time Series Plots</h2>
            </div>
        </div>
    );
}
export default Content;