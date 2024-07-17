import * as React from 'react';
import { IFormProps } from '../IFormProps';

export interface IFormState {
  items: any[];
}

export default class GetForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    this.fetchListItems()
      .then(() => {
        console.log("List items fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching list items: ", error);
      });
  }

  private async fetchListItems(): Promise<void> {
    try {
      const items: any[] = await this.props.sp.web.lists.getByTitle("UserDetails").items.select("Title", "Id")();
      console.log(items);
      this.setState({ items });
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  }

  public render(): React.ReactElement<IFormProps> {
    return (
      <div>
        <h2>List Items</h2>
        <ul>
          {this.state.items.map(item => (
            <li key={item.Id}>
            {item.Title} {item.Id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
