import * as React from 'react';
import { MultiColumnComboBox } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

interface IState {
  items: any[];
  selectedItem: any;
  columns: any[];
}

export default class MultiColumnComboBoxComponent extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: [
        { id: 1, name: 'Item 1', category: 'Category 1' },
        { id: 2, name: 'Item 2', category: 'Category 2' },
        // Add more items as needed
      ],
      selectedItem: null,
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'name', title: 'Name' },
        { field: 'category', title: 'Category' },
      ],
    };
  }

  handleChange = (event: any) => {
    this.setState({ selectedItem: event.target.value });
  };

  handleAddItem = () => {
    const newItem = { id: this.state.items.length + 1, name: `Item ${this.state.items.length + 1}`, category: `Category ${this.state.items.length + 1}` };
    this.setState({ items: [...this.state.items, newItem] });
  };

  handleRemoveItem = (id: number) => {
    this.setState({ items: this.state.items.filter(item => item.id !== id) });
  };

  render() {
    return (
      <div>
        <MultiColumnComboBox
          data={this.state.items}
          columns={this.state.columns}
          textField="name"
          dataItemKey="id"
          value={this.state.selectedItem}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleAddItem}>Add Item</Button>
        <Grid data={this.state.items}>
          <GridColumn field="id" title="ID" />
          <GridColumn field="name" title="Name" />
          <GridColumn field="category" title="Category" />
          <GridColumn cell={(props) => (
            <td>
              <Button onClick={() => this.handleRemoveItem(props.dataItem.id)}>Remove</Button>
            </td>
          )} />
        </Grid>
      </div>
    );
  }
}
