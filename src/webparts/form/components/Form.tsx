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
import { PeoplePicker, PrincipalType,IPeoplePickerContext } from "@pnp/spfx-controls-react/lib/PeoplePicker";
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
interface IMainFormState {
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
  new: string;
  itemsFromSpList: any[];
  getAllDropDownOptions:any;
  natureOfNote:IDropdownOption[];
  natureOfApprovalSancation:IDropdownOption[];
  committename:IDropdownOption[];
  typeOfFinancialNote:IDropdownOption[];
  noteType:IDropdownOption[];
  isPuroposeVisable:boolean;
  isAmountVisable:boolean;
  isTypeOfFinacialNote:boolean;
  isNatureOfApprovalOrSanction:boolean;
  //generalSection
  committeeNameFeildValue:string;
  subjectFeildValue:string;
  natureOfNoteFeildValue:string;
  noteTypeFeildValue:string;
  natureOfApprovalOrSanctionFeildValue:string;
  typeOfFinancialNoteFeildValue:string;
  searchTextFeildValue:string;
  amountFeildValue:string;
  puroposeFeildValue:string;
  



}

export const FormContext = React.createContext<any>(null);




export default class Form extends React.Component<IFormProps, IMainFormState> {
private _peopplePicker:IPeoplePickerContext;
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
      natureOfApprovalSancation:[],
      typeOfFinancialNote:[],
      noteType:[],
      isPuroposeVisable:false,
      isAmountVisable:false,
      isTypeOfFinacialNote:false,
      isNatureOfApprovalOrSanction:false,
        //generalSection
        committeeNameFeildValue: "",
        subjectFeildValue: "",
        natureOfNoteFeildValue: "",
        noteTypeFeildValue: "",
        natureOfApprovalOrSanctionFeildValue:"",
        typeOfFinancialNoteFeildValue: "",
        searchTextFeildValue: "",
        amountFeildValue: "",
        puroposeFeildValue: ""


      

    };
     // general section --------handling---------start
    this.handleCommittename = this.handleCommittename.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleNatureOfNote =this.handleNatureOfNote.bind(this)
    this.handleNoteType = this.handleNoteType.bind(this);
    this.handleNatureOfApprovalOrSanction = this.handleNatureOfApprovalOrSanction.bind(this);
    this.handleTypeOfFinanicalNote = this.handleTypeOfFinanicalNote.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
     this.handleAmount = this.handleAmount.bind(this);
     this.handlePurpose = this.handlePurpose.bind(this);
     // general section --------handling---------end
    this.handleSubmit = this.handleSubmit.bind(this);

    this._peopplePicker={
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      // msGraphClientFactory:this.props.context.msGraphClientFactory
      // msGraphClientFactory: this.props.context.msGraphClientFactory,
      // spHttpClient: this.props.context.spHttpClient
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getfield();
  }
// 
private getfield = async () => {
  try {
    const fieldDetails = await this.props.sp.web.lists.getByTitle("eCommittee").fields.filter("Hidden eq false and ReadOnlyField eq false")();
    const filtering = fieldDetails.map(_x=>{
      if(_x.TypeDisplayName ==="Choice"){
        console.log(_x.InternalName,":" ,_x.Choices)
        
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
      // console.log(each)
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
            const typeOfNatureOfApprovalSancation = each[1].map((item,index) => {
              return {key:index+1,text:item}
            });

            this.setState({natureOfApprovalSancation:typeOfNatureOfApprovalSancation})
            
          }
          else if (each[0] === "TypeOfFinancialNote") {
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


  // private handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
  //   console.log(typeof item);
  //   console.log(this.state.natureOfNote)
  //   // console.log(this.state.itemsFromSpList)
  //   // const {text} = item 
  //   // console.log(text)
  //   this.setState({ noteTypeValue: item }); // Update state with selected item
  // };


  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }





  // general section --------handling
  // general section --------handling
  // general section --------handling
  private handleCommittename(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    // console.log(item.text);
    // this.setState({ noteTypeValue: item });
    const value = item.text
    this.setState({committeeNameFeildValue:value})
  }

  private handleSubject(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    console.log(newValue)
    const value = newValue || ''; // Ensure value is a string
    this.setState({ subjectFeildValue: value });
  }


  private handleNatureOfNote(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.text);
    
    if (item.text === "Sanction" || item.text === "Approval"){
      this.setState({ natureOfNoteFeildValue: item.text ,isNatureOfApprovalOrSanction:true,isPuroposeVisable:true});

    }else{
      this.setState({ natureOfNoteFeildValue: item.text,isNatureOfApprovalOrSanction:false,isPuroposeVisable:false });
    }

   
  }

  private handleNatureOfApprovalOrSanction(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.text);
    this.setState({ natureOfNoteFeildValue: item.text });

  
  }

  private handleNoteType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.text);
    if (item.text === "Finanical" ){
      this.setState({ natureOfNoteFeildValue: item.text ,isTypeOfFinacialNote:true,isAmountVisable:true});

    }else{
      this.setState({ natureOfNoteFeildValue: item.text,isTypeOfFinacialNote:false,isAmountVisable:false });
    }
  }

  private handleTypeOfFinanicalNote(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.text);
    this.setState({ typeOfFinancialNoteFeildValue: item.text });
  }

  private handleSearchText(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    console.log(newValue)
    const value = newValue || ''; // Ensure value is a string
    this.setState({ searchTextFeildValue: value });
  }

  private handleAmount(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    console.log(newValue)
    const value = newValue || ''; // Ensure value is a string
    this.setState({ amountFeildValue: value });
  }

  private handlePurpose(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    console.log(newValue)
    const value = newValue || ''; // Ensure value is a string
    this.setState({ puroposeFeildValue: value });
  }

  
  // general section --------handling---------end
  // general section --------handling---------end
  // general section --------handling---------end






  // private async handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
  //   event.preventDefault();
  //   console.log("Event Triggered");
  //   console.log("this in handleSubmit:", this); // Add this line to log 'this'
  //   console.log("this.props in handleSubmit:", this.props); // Add this line to log 'this.props'
  
  //   try {
  //     await this.props.sp.web.lists.getByTitle("eCommittee").items.add({
  //       Title: "New Item",
  //     });
  //     console.log("Item added successfully");
  //   } catch (error) {
  //     console.error("Error adding item: ", error);
  //   }
  // }

  // private async handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
  //   event.preventDefault();
  //   console.log(event);
  //   console.log("Event Triggered");
  //   try {
  //     await this.props.sp.web.lists.getByTitle("eCommittee").items.add({
  //       Title: "New Item2222",
  //     });
  //     console.log("Item added successfully");
  //   } catch (error) {
  //     console.error("Error adding item: ", error);
  //   }
  // }


// private async handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>):  Promise<void> {
//     event.preventDefault();
//     console.log(event);
//     console.log("Event Triggered");
//     await this.props.sp.web.lists.getByTitle("eCommittee").items.add({
//       Title: "Title",
      
//     });
//   }


private async handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    console.log(event);
    console.log("Event Triggered");
    try {
      await this.props.sp.web.lists.getByTitle("eCommittee").items.add({
        Title: "New Item3321",
       
      });
      console.log("Item added successfully");
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  }


  
  public render(): React.ReactElement<IFormProps> {

    const {natureOfNote,committename,typeOfFinancialNote,noteType,committeeNameFeildValue,subjectFeildValue,natureOfNoteFeildValue,noteTypeFeildValue,natureOfApprovalOrSanctionFeildValue,typeOfFinancialNoteFeildValue,searchTextFeildValue,amountFeildValue,puroposeFeildValue} = this.state
      console.log(committeeNameFeildValue,"-----------committeeNameFeildValue")
      console.log(subjectFeildValue,"-----------subjectFeildValue")
      console.log(natureOfNoteFeildValue,"-----------natureOfNoteFeildValue")
      console.log(natureOfApprovalOrSanctionFeildValue,"--------------natureOfApprovalOrSanctionFeildValue")
      console.log(noteTypeFeildValue,"-----------noteTypeFeildValue")
      console.log(typeOfFinancialNoteFeildValue,"-----------typeOfFinancialNoteFeildValue")
      console.log(searchTextFeildValue,"-----------searchTextFeildValue")
      console.log(amountFeildValue,"-----------amountFeildValue")
      console.log(puroposeFeildValue,"-----------puroposeFeildValue")
    // const peoplePickerContext: IPeoplePickerContext = {
    //   absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
    //   msGraphClientFactory: this.props.context.msGraphClientFactory,
    //   spHttpClient: this.props.context.spHttpClient
    // };
   
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
          {/* <div className={`${styles.generalSectionContainer1}`}> */}
            <div className={styles.halfWidth}>
              Department<span className={styles.warning}>*</span>
              <h4 style={{ marginLeft: '20px' }}>Development</h4>
            </div>
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Committee Name<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                options={committename}
                onChange={this.handleCommittename}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' ,borderRadius:'8px'} }}
              />
            </div>
            
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Subject<SpanComponent />
              </label>
              <TextField onChange={this.handleSubject} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>
           

            
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Nature of Note<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                // options={options}
                options={natureOfNote}
                onChange={this.handleNatureOfNote}

                styles={{ title: { border: '1px solid rgb(211, 211, 211)',borderRadius:'8px' } }}
              />
            </div>
            {this.state.isNatureOfApprovalOrSanction? <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Nature of Approval/Sanction<SpanComponent />
              </label>
              <Dropdown
                onChange={this.handleNatureOfApprovalOrSanction}
                placeholder="Select an option"
                options={this.state.natureOfApprovalSancation}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)',borderRadius:'8px' } }}
              />
            </div>:""}
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Note Type<SpanComponent />
              </label>
              <Dropdown

                placeholder="Select an option"
                onChange={this.handleNoteType}
                // options={noteTypeOptions}
                options={noteType}
                // options={this.dropDownAssign("NoteType")}
                selectedKey={this.state.noteTypeValue ? this.state.noteTypeValue.key : undefined}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)',borderRadius:'8px' } }}
              />
            </div>
            {this.state.isTypeOfFinacialNote? <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Type of Financial Note<SpanComponent />
              </label>
              <Dropdown
                onChange={this.handleTypeOfFinanicalNote}
                placeholder="Select an option"
                options={typeOfFinancialNote}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)',borderRadius:'8px' } }}
              />
            </div>:""}
           
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Search Text<SpanComponent />
              </label>
              <TextField onChange={this.handleSearchText} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>
            { 
              this.state.isAmountVisable? <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Amount<SpanComponent />
              </label>
              <TextField onChange={this.handleAmount} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>:""
            }
            {
              this.state.isPuroposeVisable?  <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label style={{ fontWeight: '600' }}>
                Purpose<SpanComponent />
              </label>
              <TextField onChange={this.handlePurpose} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} />
            </div>:""
            }
           
           
          
          {/* </div> */}
         
        </div>
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: 'center', fontSize: '16px' }}>Approver Details</h1>
        </div>
        <div className={`${styles.generalSectionApproverDetails}`}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex' }}>
              <PeoplePicker
                context={this._peopplePicker}
                titleText="People Picker"
                personSelectionLimit={3}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                
                disabled={false}
                ensureUser={true}
                onChange={this._getPeoplePickerItems}
                // showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />
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
          <button type="button" className={`${styles.commonBtn1} ${styles.commonBtn}`} onClick={this.handleSubmit}>Submit</button>
          <button type="button" className={`${styles.commonBtn2} ${styles.commonBtn}`}>Exit</button>
        </div>
      </div>
    );
  }
}