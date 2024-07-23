// components/PeoplePicker.tsx
import * as React from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';

interface IPerson {
  id: number;
  name: string;
}

interface IPeoplePickerState {
  selectedPeople: IPerson[];
}

const people: IPerson[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  { id: 4, name: 'Emily Davis' },
  // Add more people as needed
];

class PeoplePicker extends React.Component<{}, IPeoplePickerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedPeople: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any): void {
    this.setState({
      selectedPeople: event.target.value
    });
  }

  render(): JSX.Element {
    return (
      <div>
        {/* <h3>People Picker</h3> */}
        <MultiSelect
          data={people}
          textField="name"
          dataItemKey="id"
          value={this.state.selectedPeople}
          onChange={this.handleChange}
          placeholder="Select people..."
        />
      </div>
    );
  }
}

export default PeoplePicker;
