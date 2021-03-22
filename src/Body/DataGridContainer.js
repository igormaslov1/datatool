import React, {useState} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import XLSX from 'xlsx';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';

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

    const [colData, setColData] = useState([
        { headername:"Make", field:"make", },
        { headername:"Model", field:"model" },
        { headername:"Price", field:"price" },
    ]);

    const columnDefs = {sortable:true, filter:true, floatingFilter:true, flex:1}

    React.useEffect(() => {updateContent()}, []);
    function updateContent(){
        fetch("/dftoanalyze").then(response =>
          response.json().then(data=> {
            console.log(data)
          }))
      }

      function readExcel(oevent) {
        //Get the files from Upload control
        var oFile = oevent.target.files[0];
        //Loop through files
        var sFilename = oevent.name;
        console.log(sFilename)
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            var cfb = XLSX.CFB.read(data, {type: 'binary'});
            console.log(cfb)
            var wb = XLSX.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function(sheetName) {
                // Obtain The Current Row As CSV
                var sCSV = XLSX.utils.make_csv(wb.Sheets[sheetName]);   
                var oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   
    
                console.log(oJS)
            });
        };
        reader.readAsBinaryString(oFile);
    }
        

    return (
        <div>
            <div id="data_buttons">
              <button id="import-df">Import Dataframe</button>
              <input type="file" id="files" name="files" onChange={readExcel} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            </div>
            <br/>
            <br/>
            <div class="grid_container">
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%'}}>
                <AgGridReact rowData={rowData} columnDefs={colData} defaultColDef={columnDefs}/>
                </div>
            </div>
        </div>
    );
}
export default Content;