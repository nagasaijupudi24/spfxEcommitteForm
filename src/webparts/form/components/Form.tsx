/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import styles from './Form.module.scss';
// import { SPFI } from "@pnp/sp";
import { IFormProps } from './IFormProps';
import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react'; 
import TableComponent from './uiComponents/tableSwap';
import UploadFileComponent from './uiComponents/uploadFile';
import Header from './uiComponents/Header/header';
import Title from './uiComponents/titleSectionComponent/title';
import SpanComponent from './uiComponents/spanComponent/spanComponent';
import GetForm from './spListGet/spListGet';
import "@pnp/sp/fields";

interface IMainFormState {
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
  new: string;
  itemsFromSpList: any[];
  getAllDropDownOptions:any;
  natureOfNote:IDropdownOption[];
  committename:IDropdownOption[];
  typeOfFinancialNote:IDropdownOption[];
  noteType:IDropdownOption[];
}

export const FormContext = React.createContext<any>(null);

export default class Form extends React.Component<IFormProps, IMainFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isNoteType: false,
      noteTypeValue: undefined,
      new: "",
      itemsFromSpList: [],
      getAllDropDownOptions:{},
      natureOfNote:[],
      committename:[],
      typeOfFinancialNote:[],
      noteType:[],
      

    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getfield();
  }
// 
private getfield = async () => {
  try {
    const fieldDetails = await this.props.sp.web.lists.getByTitle("eCommittee").fields.filter("Hidden eq false and ReadOnlyField eq false")();
    const filtering = fieldDetails.map(_x=>{
      if(_x.TypeDisplayName ==="Choice"){
        // console.log(_x.InternalName,":" ,_x.Choices)
        
        return [_x.InternalName,_x.Choices]
      }
    })
    const finalList =filtering?.filter(each => {
      if (typeof each !== 'undefined' ) {
        // console.log(each);
        return each
      }
    });

    finalList?.map(each => {
      console.log(each)
      if (each !== undefined && Array.isArray(each) && each.length > 1 && Array.isArray(each[1])) {
        if (each[0] === "natureOfNote") {
            // console.log(each[1]);
            const natureOfNoteArray = each[1].map((item,index) => {
              return {key:index+1,text:item}
            });

            this.setState({natureOfNote:natureOfNoteArray})
            
          }
          else if (each[0] === "NoteType") {
            // console.log(each[1]);
            const noteTypeArray = each[1].map((item,index) => {
              return {key:index+1,text:item}
            });

            this.setState({noteType:noteTypeArray})
            
          }
          else if (each[0] === "NatuerOfApprovalSanction") {
            // console.log(each[1]);
            const typeOfFinancialNoteArray = each[1].map((item,index) => {
              return {key:index+1,text:item}
            });

            this.setState({typeOfFinancialNote:typeOfFinancialNoteArray})
            
          }
          else if (each[0] === "CommitteeName") {
            // console.log(each[1]);
            const committenameArray = each[1].map((item,index) => {
              return {key:index+1,text:item}
            });

            this.setState({committename:committenameArray})
            
          }
        // each[1].map(item => console.log(item));
      }
    });




  
    // const filterDataFieldData = fieldDetails.map(each=>({"each":each.choices})})

    // Assuming fieldDetails is an array of items you want to add
    this.setState(prevState => ({
      itemsFromSpList: [...prevState.itemsFromSpList, ...finalList],
      
    }));
  } catch (error) {
    console.error("Error fetching field details: ", error);
  }
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items: any[] = await this.props.sp.web.lists.getByTitle("eCommittee").items.select("Title", "Id")();
      console.log(items);
      // this.setState({ itemsFromSpList:items });
      // this.setState(prevState => ({
      //   itemsFromSpList: [...prevState.itemsFromSpList, ...items]
      // }));
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  }


  private handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
    console.log(typeof item);
    console.log(this.state.natureOfNote)
    // console.log(this.state.itemsFromSpList)
    // const {text} = item 
    // console.log(text)
    this.setState({ noteTypeValue: item }); // Update state with selected item
  };

  handleNatureOfNote(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.text);
    // this.setState({ noteTypeValue: item });
  }


  
  public render(): React.ReactElement<IFormProps> {

    const {natureOfNote,committename,typeOfFinancialNote,noteType} = this.state
    // const options = [
    //   { key: '1', text: 'Financial' },
    //   { key: '2', text: 'Non Financial' },
    //   // Add more options as needed
    // ];

    // const noteTypeOptions = [
    //   { key: '1', text: 'Financial' },
    //   { key: '2', text: 'Non Financial' },
    //   // Add more options as needed
    // ];

    const handleFileChange = (files: FileList | null) => {
      // Handle file change logic here
      if (files) {
        console.log('Selected files:', files);
        // Example: You can perform additional logic here, such as uploading files to a server
      }
    };

    return (
      <div className={styles.form}>
        <Header />
        <Title />
        <GetForm
          description={this.props.description}
          isDarkTheme={this.props.isDarkTheme}
          environmentMessage={this.props.environmentMessage}
          hasTeamsContext={this.props.hasTeamsContext}
          userDisplayName={this.props.userDisplayName}
          sp={this.props.sp}
          context={this.props.context} // Make sure to pass the context prop
        />
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: 'center', fontSize: '16px' }}>General Section</h1>
        </div>
        <div className={`${styles.generalSection}`}>
          <div className={`${styles.generalSectionContainer1}`}>
            <div>
              Department<span className={styles.warning}>*</span>
            </div>
            <div>
              <h4 style={{ marginLeft: '20px' }}>Development</h4>
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Subject<SpanComponent />
              </label>
              <TextField styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Note Type<SpanComponent />
              </label>
              <Dropdown

                placeholder="Select an option"
                onChange={this.handleDropdownChange}
                // options={noteTypeOptions}
                options={noteType}
                // options={this.dropDownAssign("NoteType")}
                selectedKey={this.state.noteTypeValue ? this.state.noteTypeValue.key : undefined}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
          </div>
          <div className={`${styles.generalSectionContainer1}`}>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Committee Name<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                options={committename}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Nature of Note<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                // options={options}
                options={natureOfNote}
                onChange={this.handleNatureOfNote}

                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Type of Financial Note<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                options={typeOfFinancialNote}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Search Text<SpanComponent />
              </label>
              <TextField styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>
          </div>
        </div>
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: 'center', fontSize: '16px' }}>Approver Details</h1>
        </div>
        <div className={`${styles.generalSectionApproverDetails}`}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex' }}>
                <TextField placeholder="Add Reviewers" />
                <button type="button" className={`${styles.commonBtn2} ${styles.addBtn}`}>
                  <span>+</span>Add
                </button>
              </div>
              <span style={{ color: 'blue' }}>
                (Please enter minimum 4 character to search)
              </span>
            </div>
          </div>
          <div className={`${styles.tableContainer}`}>
            <TableComponent />
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex' }}>
                <TextField placeholder="Add Reviewers" />
                <button type="button" className={`${styles.commonBtn2} ${styles.addBtn}`}>
                  <span>+</span>Add
                </button>
              </div>
              <span style={{ color: 'blue' }}>
                (Please enter minimum 4 character to search)
              </span>
            </div>
          </div>
          <div className={`${styles.tableContainer}`}>
            <TableComponent />
          </div>
        </div>
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: 'center', fontSize: '16px' }}>File Attachments</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className={`${styles.generalSectionApproverDetails}`}>
          <div>
            <p className={styles.label}>
              Note PDF<span className={styles.warning}>*</span>
            </p>
            <UploadFileComponent onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
            <p className={styles.message}>Allowed only one PDF. Up to 10MB max.</p>
          </div>
          <div>
            <p className={styles.label}>
              Supporting Documents
            </p>
            <UploadFileComponent onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
            <p className={styles.message}>Allowed Formats (pdf,doc,docx,xlsx only) Upto 25MB max.</p>
          </div>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          <button type="button" className={`${styles.commonBtn1} ${styles.commonBtn}`}>Save as Draft</button>
          <button type="button" className={`${styles.commonBtn1} ${styles.commonBtn}`}>Submit</button>
          <button type="button" className={`${styles.commonBtn2} ${styles.commonBtn}`}>Exit</button>
        </div>
      </div>
    );
  }
}