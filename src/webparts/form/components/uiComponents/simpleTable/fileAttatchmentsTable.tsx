/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
// import { Button } from "@progress/kendo-react-buttons";



const FileAttatchmentTable = (props: any) => {
//    const {fieldData} = props
    
    const gridData = props.data;

    // Function to handle removing a data item from the grid
   

    return (
        <div style={{ overflow: 'auto' }}>
            <Grid
                style={{ minWidth: '800px' }} // Sets minimum width for scrolling
                data={gridData}
                dataItemKey={"ProductID"}
            >

               
                <Column field="id" title="Document link" width="60px" />
                <Column field='srNo' title="Attached By" width="90px" />
                <Column field="optionalText" title="Attached Date" />
               
            </Grid>
        </div>
    );
};

export default FileAttatchmentTable;
