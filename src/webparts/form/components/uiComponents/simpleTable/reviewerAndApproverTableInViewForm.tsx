/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
// import { Button } from "@progress/kendo-react-buttons";


const ApproverAndReviewerTableInViewForm = (props: any) => {
    const {  type } = props;
    const gridData = props.data;

    // const remove = (dataItem: any) => {
    //     removeDataFromGrid(dataItem, type);
    // };

    console.log(gridData, `----${type} Of Grid-----------`);

    return (
        <div style={{ overflowX: 'auto' }}>
            <Grid
                style={{ minWidth: '800px' }}
                data={gridData}
                dataItemKey={"ProductID"}
            >
                <Column field="id" title="ID" width="60px" />
                <Column field="text" title={type} width="90px" />
                <Column field="srNo" title="SR No" width="90px" />
                <Column field="optionalText" title="Designation" />
                <Column field="Status" title="Status" />
                <Column
                    
                    title="Actions"
                />
            </Grid>
        </div>
    );
};

export default ApproverAndReviewerTableInViewForm;
