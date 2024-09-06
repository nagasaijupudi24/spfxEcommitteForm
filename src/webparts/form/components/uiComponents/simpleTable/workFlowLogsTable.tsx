/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { format } from 'date-fns';
// import { Button } from "@progress/kendo-react-buttons";



const WorkFlowLogsTable = (props: any) => {
//    const {fieldData} = props
    
    const gridData = props.data;

    // Function to handle removing a data item from the grid
    console.log(gridData)

   

   

    return (
        <div style={{ overflow: 'auto' }}>
            <Grid
                style={{ minWidth: '800px' }} // Sets minimum width for scrolling
                data={gridData}
                dataItemKey={"ProductID"}
            >

               
                <Column field='ActionTaken'  title="Action" width="120px" />
                <Column field='Actioner' title="Action By" width="120px" />
                <Column 
                cell={(props)=>{
                    console.log(props)
                    

                    const formatDateTime = (date: string | number | Date) => {
                        const formattedDate = format(new Date(date), 'dd-MMM-yyyy');
                        const formattedTime = format(new Date(), 'hh:mm a');
                        return `${formattedDate} ${formattedTime}`;
                      };
                      
                      const result = formatDateTime(props.dataItem.ActionTakenOn);
                    return <td>
                        {result}
                    </td>

                }}
                
                 title="Action Date" width="120px" />
               
            </Grid>
        </div>
    );
};

export default WorkFlowLogsTable;
