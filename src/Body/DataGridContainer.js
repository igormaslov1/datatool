import React, {useState} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './gridLayout.css';

function Content(props){
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ]);

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){
        fetch("/dftoanalyze").then(response =>
          response.json().then(data=> {
            console.log(data)
          }))
      }

    return (
        <div>
            <div id="data_buttons">
              <button id="import-df">Import Dataframe</button>
            </div>
            <br/>
            <br/>
            <div class="grid_container">
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%'}}>
                <AgGridReact rowData={rowData}>
                    <AgGridColumn field="make"></AgGridColumn>
                    <AgGridColumn field="model"></AgGridColumn>
                    <AgGridColumn field="price"></AgGridColumn>
                </AgGridReact>
                </div>
            </div>
        </div>
    );
}
export default Content;