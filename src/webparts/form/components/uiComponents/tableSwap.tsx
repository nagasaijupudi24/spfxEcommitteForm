import * as React from 'react';
import { useState } from 'react';
import { DetailsList, IColumn, IDetailsRowProps, DetailsRow, IDetailsRowStyles } from '@fluentui/react/lib/DetailsList';
import { DragDropContext, Draggable, Droppable, DropResult, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

interface IItem {
  key: number;
  Reviewers: string;
  srno: number;
  Designation: string;
  actions: string;
}

const TableComponent: React.FC = () => {
  const initialItems: IItem[] = [
    { key: 1, Reviewers: 'Reviewer 1', srno: 1, Designation: 'Designation 1', actions: 'Action 1' },
    { key: 2, Reviewers: 'Reviewer 2', srno: 2, Designation: 'Designation 2', actions: 'Action 2' },
    { key: 3, Reviewers: 'Reviewer 3', srno: 3, Designation: 'Designation 3', actions: 'Action 3' },
  ];

  const [items, setItems] = useState<IItem[]>(initialItems);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  const columns: IColumn[] = [
    { key: 'column1', name: 'S.No', fieldName: 'srno', minWidth: 40, isResizable: true },
    {
      key: 'column2',
      name: 'Reviewers',
      fieldName: 'Reviewers',
      minWidth: 50,
      isResizable: true,
    },
    {
      key: 'column3',
      name: 'SR NO',
      fieldName: 'srno',
      minWidth: 80,
      isResizable: true,
    },
    {
      key: 'column4',
      name: 'Designation',
      fieldName: 'Designation',
      minWidth: 80,
      isResizable: true,
    },
    {
      key: 'column5',
      name: 'Actions',
      fieldName: 'actions',
      minWidth: 80,
      isResizable: true,
    },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <DetailsList
              items={items}
              columns={columns}
              setKey="set"
              layoutMode={0}
              selectionPreservedOnEmptyClick={true}
              onRenderRow={(props: IDetailsRowProps) => {
                if (!props) {
                  return null;
                }

                const index = props.itemIndex;
                const rowStyles: Partial<IDetailsRowStyles> = {
                  root: {
                    height: 50, // Set your desired row height here
                  },
                };

                return (
                  <Draggable draggableId={String(props.item.key)} index={index} key={props.item.key}>
                    {(provided: DraggableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: 'none',
                          padding: '16px',
                          margin: '0 0 8px 0',
                          background: 'white',
                          border: '1px solid lightgrey',
                        }}
                      >
                        <DetailsRow {...props} styles={rowStyles} />
                      </div>
                    )}
                  </Draggable>
                );
              }}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableComponent;
