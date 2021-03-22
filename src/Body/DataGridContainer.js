import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import XLSX from 'xlsx';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './gridLayout.css';

function Content(props) {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ]);

    const [colData, setColData] = useState([
        { headername: "Make", field: "make", },
        { headername: "Model", field: "model" },
        { headername: "Price", field: "price" },
    ]);

    const columnDefs = { sortable: true, filter: true, floatingFilter: true, flex: 1 }

    React.useEffect(() => { updateContent() }, []);
    function updateContent() {
        fetch("/dftoanalyze").then(response =>
            response.json().then(data => {
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
        reader.onload = function (e) {
            var data = e.target.result;
            console.log("Parsing the data, are you?")
            // console.log(data); 
            var xlsx_data = XLSX.read(data, { type: 'binary' });
            // var xlsx_data = XLSX.read(data);
            console.log(xlsx_data)
            console.log('Stop me if you have heard this one before.')
            var first = xlsx_data['SheetNames'][0];
            console.log(xlsx_data['Sheets'][first]['A1'].v);
            console.log('🚨🚨🚨🚨🚨🚨')
            var colNames = xlsx_data['Strings'];
            var blankColData = []
            
            for (var col in colNames) { 
                if ((!colNames[col]['t']) || (colNames[col]['t'] === undefined)) { 
                    continue;
                }
                blankColData.push({headername: colNames[col]['t'], field: colNames[col]['t'] });
            }
            console.log(blankColData);
            var num_cols = blankColData.length;
            var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            
            console.log("And, here's what sheets looks like.")
            console.log(xlsx_data['Sheets'])
            console.log('🦜🦜🦜🦜🦜')

            var blankRowData = []

            for (var elem_idx in xlsx_data['Sheets']['Sheet1']) { 
                var cell_data = xlsx_data['Sheets']['Sheet1'][elem_idx];
                console.log(elem_idx);
                if (elem_idx === '!ref') { 
                    var num_rows = Number(cell_data.slice(-2));
                    for (var i_row = 0; i_row < num_rows-1; i_row++) { 
                        blankRowData.push({});
                    }
                    continue;
                }
                
                if (elem_idx.includes('!')) { 
                    continue;
                }

                var row_idx = Number(elem_idx.slice(1))-2;
                if (row_idx<0) { 
                    continue;
                } 
                var name_of_field = blankColData[alphabet.indexOf(elem_idx[0])]['field'];
                console.log('🤷‍♀️🤷‍♀️');
                console.log(blankRowData);
                blankRowData[row_idx][name_of_field] = cell_data.v;
                
            }

            console.log(blankRowData)
            console.log('🐧🐧🐧🐧🐧🐧🐧🐧')
            setRowData(blankRowData); 
            setColData(blankColData);


            // var wb = XLSX.parse_xlscfb(xlsx_data);
            // // Loop Over Each Sheet
            // wb.SheetNames.forEach(function (sheetName) {
            //     // Obtain The Current Row As CSV
            //     var sCSV = XLSX.utils.make_csv(wb.Sheets[sheetName]);
            //     var oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            //     console.log(oJS)
            // });
        };
        reader.readAsBinaryString(oFile);
    }        

    return (
        <div>
            <div id="data_buttons">
                {/* <button id="import-df">Import Dataframe</button> */}
                <label class="upload_button"> 
                    <input type="file" id="files" name="files" onChange={readExcel} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    Upload Data
                </label>
            </div>
            <div class="grid_container">
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact rowData={rowData} columnDefs={colData} defaultColDef={columnDefs} />
                </div>
            </div>
        </div>
    );
}
export default Content;