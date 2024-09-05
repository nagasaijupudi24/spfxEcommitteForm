/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { DragAndDrop } from '@progress/kendo-react-common';
import { Button } from "@progress/kendo-react-buttons";

// import { DraggableRow } from './draggable-row';
import { DraggableRow } from './draggable-row';

// import { DragHandleCell } from './drag-handle-cell';
import { DragHandleCell } from './drag-handle-cell';
// @ts-expect-error
// import products from './shared-gd-products.json'; //dist error facing
import products from './shared-gd-sample-products.json'
// @ts-expect-error
import { Product } from './shared-gd-interfaces.tsx';

// Context to share reordering functions across components
// - `direction`: Places the dragged item before or after `dataItem`. If `null`, no action is taken.
type ContextProps = {
    reorder: (dataItem: Product, direction: 'before' | 'after' | null) => void;
    dragStart: (dataItem: Product) => void;
};

export const ReorderContext = React.createContext<ContextProps>({
    reorder: () => {},
    dragStart: () => {},
});



const DraggableTable = (props:any) => {
    // console.log(props.data)
    const {reOrderData, removeDataFromGrid,type} = props
    
    const gridData = props.data
    // State to hold the grid's data and the item currently being dragged
    // const [gridData, setGridData] = React.useState<any[]>(props.data);
    // setGridData(props.data)
    const [activeItem, setActiveItem] = React.useState<any | null>(null);

    const reorder = (dataItem: any, direction: 'before' | 'after' | null) => {
        if (activeItem === dataItem || direction === null) return; // No change if dropping in the same spot

        const reorderedData = [...gridData]; // Create a copy of the data array

        // Locate the index of the item currently being dragged
        const prevIndex = reorderedData.findIndex((p) => p === activeItem);
        if (prevIndex === -1) return; // Exit if the active item isn't found

        // Determine the index where the active item should be placed
        let nextIndex =
      reorderedData.findIndex((p) => p === dataItem) +
      (direction === 'before' ? -1 : 0);

        if (prevIndex > nextIndex) nextIndex++;

        // Move the active item to the new position
        reorderedData.splice(prevIndex, 1); // Remove from the old position
        reorderedData.splice(nextIndex, 0, activeItem); // Insert at the new position

        reOrderData(reorderedData)
        // setGridData(reorderedData); // Update the grid data state
        setActiveItem(null); // Clear the active item after drop
    };

    // Sets the item being dragged as the active item
    const dragStart = (dataItem: any) => {
        setActiveItem(dataItem);
    };

    const remove = (dataItem:any) => {
        removeDataFromGrid(dataItem,type)
        
      };

    console.log(gridData,`----${type} Of Grid-----------`)

    return (
      <ReorderContext.Provider value={{ reorder, dragStart }}>
            <div style={{ overflowX: 'auto' }}>
                <DragAndDrop>
                    <Grid
                        style={{ minWidth: '800px' }} // Sets minimum width for scrolling
                        data={gridData}
                        dataItemKey={"ProductID"}
                        rowRender={(row, rowProps) => (
                            <DraggableRow elementProps={row.props} {...rowProps} />
                        )}
                    >
                        <Column title="" width="50px" cell={DragHandleCell} />
                        <Column field="id" title="ID" width="60px" />
                        <Column field="text" title={type} width="90px" />
                        <Column field='srNo' title="SR No" width="90px" />
                        <Column field="optionalText" title="Designation" />
                        <Column
                            cell={(props) => (
                                <td>
                                    <Button
                                        onClick={() => remove(props.dataItem)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            )}
                            title="Actions"
                        />
                    </Grid>
                </DragAndDrop>
            </div>
        </ReorderContext.Provider>
    );
};

export default DraggableTable;