/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import styles from "../Form.module.scss";
// import { SPFI } from "@pnp/sp";
import { IFormProps } from "../IFormProps";
import { TextField } from "@fluentui/react";
import { IDropdownOption } from "office-ui-fabric-react";
// import {  InputChangeEvent } from '@progress/kendo-react-inputs';
import { TextBox, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import TableComponent from "./tableSwap";
import UploadFileComponent from "./uploadFile";
import Header from "./Header/header";
import Title from "./titleSectionComponent/title";
import SpanComponent from "./spanComponent/spanComponent";
// import GetForm from '../spListGet/spListGet';
import PeoplePicker from "./peoplePickerInKenod/peoplePickerInKendo";
// import AlertComponent from "./alter/alter";
import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/files";
import "@pnp/sp/profiles";
import "@pnp/sp/site-groups";
// import { Upload, UploadOnAddEvent, UploadFileInfo } from '@progress/kendo-react-upload';
// import { ConsoleListener } from "@pnp/logging";
// import { PeoplePicker, PrincipalType,IPeoplePickerContext } from "@pnp/spfx-controls-react/lib/PeoplePicker";
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

interface INoteObject {
  Department: string;
  CommitteeName: string;
  Subject: string;
  natureOfNote: string;
  NatuerOfApprovalSanction: string;
  NoteType: string;
  TypeOfFinancialNote: string;
  Amount: string | number | readonly string[];
  Search_x0020_Keyword: string | number | readonly string[];
  Purpose: string | number | readonly string[];
}

interface IMainFormState {
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
  new: string;
  itemsFromSpList: any[];
  getAllDropDownOptions: any;
  natureOfNote: string[];
  natureOfApprovalSancation: string[];
  committename: string[];
  typeOfFinancialNote: string[];
  noteType: string[];
  isPuroposeVisable: boolean;
  isAmountVisable: boolean;
  isTypeOfFinacialNote: boolean;
  isNatureOfApprovalOrSanction: boolean;
  //generalSection
  committeeNameFeildValue: string;
  subjectFeildValue: string;

  natureOfNoteFeildValue: string;
  noteTypeFeildValue: string;
  natureOfApprovalOrSanctionFeildValue: string;
  typeOfFinancialNoteFeildValue: string;
  searchTextFeildValue: string | number | readonly string[];
  amountFeildValue: string | number | readonly string[];
  puroposeFeildValue: string | number | readonly string[];
  // eslint-disable-next-line @rushstack/no-new-null
  notePdfFile: File | null;
  // eslint-disable-next-line @rushstack/no-new-null
  supportingFile: File | null;
  isWarning: boolean;
  isWarningAmountField: boolean;
  isWarningSearchText: boolean;
  isWarningTypeOfFinancialNote: boolean;
  eCommitteData: any;
  noteTofiles: File[];
  supportingDocumentfiles:File[];
}

export const FormContext = React.createContext<any>(null);

// const committeeOptions = [
//    'committeeA' ,
//    'committeeB',
//    'committeeC'
// ];

export default class Form extends React.Component<IFormProps, IMainFormState> {
  // private _peopplePicker:IPeoplePickerContext;
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isNoteType: false,
      noteTypeValue: undefined,
      new: "",
      itemsFromSpList: [],
      getAllDropDownOptions: {},
      natureOfNote: [],
      committename: [],
      natureOfApprovalSancation: [],
      typeOfFinancialNote: [],
      noteType: [],
      isPuroposeVisable: false,
      isAmountVisable: false,
      isTypeOfFinacialNote: false,
      isNatureOfApprovalOrSanction: false,
      //generalSection
      committeeNameFeildValue: "",
      subjectFeildValue: "",
      natureOfNoteFeildValue: "",
      noteTypeFeildValue: "",
      natureOfApprovalOrSanctionFeildValue: "",
      typeOfFinancialNoteFeildValue: "",
      searchTextFeildValue: "",
      amountFeildValue: 0,
      puroposeFeildValue: "",
      notePdfFile: null,
      supportingFile: null,
      isWarning: false,
      isWarningAmountField: false,
      isWarningSearchText: false,
      isWarningTypeOfFinancialNote: false,
      eCommitteData: {},
      noteTofiles: [],
      supportingDocumentfiles:[]

    };
    // general section --------handling---------start
    this.handleCommittename = this.handleCommittename.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleNatureOfNote = this.handleNatureOfNote.bind(this);
    this.handleNoteType = this.handleNoteType.bind(this);
    this.handleNatureOfApprovalOrSanction =
      this.handleNatureOfApprovalOrSanction.bind(this);
    this.handleTypeOfFinanicalNote = this.handleTypeOfFinanicalNote.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handlePurpose = this.handlePurpose.bind(this);
    // general section --------handling---------end
    this.handleSubmit = this.handleSubmit.bind(this);

    // this._peopplePicker={
    //   absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
    //   // msGraphClientFactory:this.props.context.msGraphClientFactory
    //   // msGraphClientFactory: this.props.context.msGraphClientFactory,
    //   // spHttpClient: this.props.context.spHttpClient
    // }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getfield();
    // eslint-disable-next-line no-void
    // void this.createFolder();
  }
  //

  // private handleAdd = (event: UploadOnAddEvent) => {
  //   const newFiles = event.newState
  //     .filter((file: UploadFileInfo) => file.getRawFile !== undefined)
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     .map((file: UploadFileInfo) => file.getRawFile!());

  //     console.log(newFiles)

  //   // this.setState({ files: newFiles });
  //   // this.setState(prev=>({files:[...prev.files,newFiles]}))
  // };

  private getfield = async () => {
    try {
      const fieldDetails = await this.props.sp.web.lists
        .getByTitle("eCommittee")
        .fields.filter("Hidden eq false and ReadOnlyField eq false")();
      // console.log(fieldDetails)

      // fieldDetails.map(each=>console.log(each.StaticName))
      const filtering = fieldDetails.map((_x) => {
        if (_x.TypeDisplayName === "Choice") {
          console.log(_x.InternalName, ":", _x.Choices);

          return [_x.InternalName, _x.Choices];
        }
      });
      const finalList = filtering?.filter((each) => {
        if (typeof each !== "undefined") {
          // console.log(each);
          return each;
        }
      });

      finalList?.map((each) => {
        // console.log(each)
        if (
          each !== undefined &&
          Array.isArray(each) &&
          each.length > 1 &&
          Array.isArray(each[1])
        ) {
          if (each[0] === "natureOfNote") {
            // console.log(each[1]);
            const natureOfNoteArray = each[1].map((item, index) => {
              return item;
            });

            this.setState({ natureOfNote: natureOfNoteArray });
          } else if (each[0] === "NoteType") {
            // console.log(each[1]);
            const noteTypeArray = each[1].map((item, index) => {
              return item;
            });

            console.log(noteTypeArray);

            this.setState({ noteType: noteTypeArray });
          } else if (each[0] === "NatuerOfApprovalSanction") {
            // console.log(each[1]);
            const typeOfNatureOfApprovalSancation = each[1].map(
              (item, index) => {
                return item;
              }
            );

            this.setState({
              natureOfApprovalSancation: typeOfNatureOfApprovalSancation,
            });
          } else if (each[0] === "TypeOfFinancialNote") {
            // console.log(each[1]);
            const typeOfFinancialNoteArray = each[1].map((item, index) => {
              return item;
            });

            this.setState({ typeOfFinancialNote: typeOfFinancialNoteArray });
          } else if (each[0] === "CommitteeName") {
            // console.log(each[1]);
            const committenameArray = each[1].map((item, index) => {
              return item;
            });

            this.setState({ committename: committenameArray });
          }
          // each[1].map(item => console.log(item));
        }
      });

      // const filterDataFieldData = fieldDetails.map(each=>({"each":each.choices})})

      // Assuming fieldDetails is an array of items you want to add
      this.setState((prevState) => ({
        itemsFromSpList: [...prevState.itemsFromSpList, ...finalList],
      }));
    } catch (error) {
      console.error("Error fetching field details: ", error);
    }
  };

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
      const items: any[] = await this.props.sp.web.lists
        .getByTitle("eCommittee")
        .items.select("Title", "Id")();
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

  // private _getPeoplePickerItems(items: any[]) {
  //   console.log('Items:', items);
  // }

  // general section --------handling
  // general section --------handling
  // general section --------handling
  // private handleCommittename(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  //   // console.log(item.text);
  //   // this.setState({ noteTypeValue: item });
  //   const value = item.text
  //   this.setState({committeeNameFeildValue:value})
  // }

  private handleCommittename(event: any): void {
    const value = event.value;
    console.log(value);
    this.setState({ committeeNameFeildValue: value });
  }

  private handleCommittenameRedBorder = (event: any): void => {
    // Handle click event
    console.log("Dropdown clicked");
    const value = event.value;
    console.log(value);
    this.setState({ isWarning: false, committeeNameFeildValue: value });
  };

  // private handleSubject(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
  //   // console.log(newValue)
  //   const value = newValue || ''; // Ensure value is a string
  //   this.setState({ subjectFeildValue: value });
  // }

  // private handleSubject = (event: InputChangeEvent): void => {
  //   const value = event.target.value ?? ''; // Handle undefined values
  //   console.log(value);
  //   this.setState({ subjectFeildValue: value });
  // };

  private handleSubject = (event: any) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const { value, id } = event.target;
    console.log(value, id, "-----------handleSubject");
    this.setState({ subjectFeildValue: value });
  };

  private handleNatureOfNote(event: any): void {
    const item = event.value;
    console.log(item);
    if (item === "Sanction" || item === "Approval") {
      this.setState({
        natureOfNoteFeildValue: item,
        isNatureOfApprovalOrSanction: true,
        isPuroposeVisable: true,
      });
    } else {
      this.setState({
        natureOfNoteFeildValue: item,
        isNatureOfApprovalOrSanction: false,
        isPuroposeVisable: false,
      });
    }
  }

  private handleNatureOfApprovalOrSanction(event: any): void {
    const value = event.value;
    console.log(value);
    this.setState({ natureOfApprovalOrSanctionFeildValue: value });
  }

  private handleNoteType = (event: any): void => {
    const item = event.value; // Kendo UI passes the selected value directly
    console.log(item);
    this.setState({ noteTypeFeildValue: item });
    // if (item === "Finanical") {
    //   console.log(item);
    //   this.setState({
    //     noteTypeFeildValue: item,
    //     isTypeOfFinacialNote: true,
    //     isAmountVisable: true,
    //   });
    // } else {
    //   this.setState({
    //     noteTypeFeildValue: item,
    //     isTypeOfFinacialNote: false,
    //     isAmountVisable: false,
    //   });
    // }
  };

  // private handleNoteType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  //   // console.log(item.text);

  //   if (item.text === "Finanical" ){
  //     console.log(item.text);
  //     this.setState({ noteTypeFeildValue: item.text ,isTypeOfFinacialNote:true,isAmountVisable:true});

  //   }else{
  //     this.setState({ noteTypeFeildValue: item.text,isTypeOfFinacialNote:false,isAmountVisable:false });
  //   }
  // }
  public handletextBoxChange = (e: any, fieldName: string) => {
    const { value } = e.target;
    console.log(this.state.eCommitteData, "eCommitteData");
    this.setState((prev) => ({
      eCommitteData: {
        ...prev.eCommitteData,
        [fieldName]: value,
      },
    }));
  };
  private handleTypeOfFinanicalNote(event: any): void {
    const value = event.value;
    console.log(value);
    this.setState({ typeOfFinancialNoteFeildValue: value });
  }

  private handleTypeOfFinanicalNoteRed(event: any): void {
    const value = event.value;
    console.log(value);
    this.setState({
      isWarningTypeOfFinancialNote: false,
      typeOfFinancialNoteFeildValue: value,
    });
  }

  private handleSearchText = (event: TextBoxChangeEvent) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const value: string | number | readonly string[] = event.target.value ?? "";
    console.log(value, "----------handleSearchText");
    this.setState({ searchTextFeildValue: value });
  };

  private handleSearchTextRed = (event: TextBoxChangeEvent) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const value: string | number | readonly string[] = event.target.value ?? "";
    console.log(value, "----------handleSearchText");
    this.setState({ isWarningSearchText: false, searchTextFeildValue: value });
  };

  private handleAmount = (event: TextBoxChangeEvent) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const value: string | number | readonly string[] = event.target.value ?? "";
    console.log(value, "---------handleAmount");
    this.setState({ amountFeildValue: value });
  };

  private handleAmountRed = (event: TextBoxChangeEvent) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const value: string | number | readonly string[] = event.target.value ?? "";
    console.log(value, "---------handleAmount");
    this.setState({ isWarningAmountField: false, amountFeildValue: value });
  };

  private handlePurpose = (event: TextBoxChangeEvent) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const value: string | number | readonly string[] = event.target.value ?? "";
    console.log(value, "-----------handle Purpose");
    this.setState({ puroposeFeildValue: value });
  };

  // general section --------handling---------end
  // general section --------handling---------end
  // general section --------handling---------end

  private createSubFolder = async (parentFolderPath:string): Promise<void> => {
    console.log(parentFolderPath)
   
    try {
      // const url = "/sites/uco/Shared Documents/MyFolder"

      
      const siteUrl = `${parentFolderPath}/Pdf`;
      console.log(siteUrl);
      const filesData = this.state.noteTofiles;
      await this.props.sp.web.rootFolder.folders
        .addUsingPath(siteUrl)
        .then(async (res) => {
          for (let i = 0; i < filesData.length; i++) {
            const file = filesData[i];
            const arrayBuffer = await file.arrayBuffer();
            // Upload a file to the SharePoint Library
            await this.props.sp.web
              .getFolderByServerRelativePath(siteUrl)
              .files.addUsingPath(file.name, arrayBuffer, { Overwrite: true });
          }
        });

      const siteUrlforSupportingDocument = `${parentFolderPath}/SupportingDocument`;
      console.log(siteUrlforSupportingDocument);
      const filesDataSupportingDocument = this.state.supportingDocumentfiles;
      await this.props.sp.web.rootFolder.folders
        .addUsingPath(siteUrlforSupportingDocument)
        .then(async (res) => {
          for (let i = 0; i < filesDataSupportingDocument.length; i++) {
            const file = filesDataSupportingDocument[i];
            const arrayBuffer = await file.arrayBuffer();
            // Upload a file to the SharePoint Library
            await this.props.sp.web
              .getFolderByServerRelativePath(siteUrlforSupportingDocument)
              .files.addUsingPath(file.name, arrayBuffer, { Overwrite: true });
          }
        });

      // creates a new folder for web with specified server relative url
      // const folderAddResult = await this.props.sp.web.folders.addUsingPath(url);

      console.log(`Folder -----PDF---- created successfully in list `);
      
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  };

  private createFolder = async (req: string): Promise<void> => {
    const folderName = req.replace(/\//g, "-");
    try {
      // const url = "/sites/uco/Shared Documents/MyFolder"
      console.log(this.props.context.pageContext.web.serverRelativeUrl);
      const absUrl = this.props.context.pageContext.web.serverRelativeUrl;
      const siteUrl = `${absUrl}/ECommitteeDocuments/${folderName}`;
      console.log(siteUrl);
      // const filesData = this.state.files;
      // const folderId = 
      await this.props.sp.web.rootFolder.folders
        .addUsingPath(siteUrl)
      //   .then(async (res) => {
      //     for (let i = 0; i < filesData.length; i++) {
      //       const file = filesData[i];
      //       const arrayBuffer = await file.arrayBuffer();
      //       // Upload a file to the SharePoint Library
      //       await this.props.sp.web
      //         .getFolderByServerRelativePath(siteUrl)
      //         .files.addUsingPath(file.name, arrayBuffer, { Overwrite: true });
      //     }
      //   }
      // );

      // creates a new folder for web with specified server relative url
      // const folderAddResult = await this.props.sp.web.folders.addUsingPath(url);

      console.log(`Folder '${folderName}' created successfully in list `);
      // eslint-disable-next-line no-void
      void this.createSubFolder(siteUrl)
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  };

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

  private createNoteObject = (): INoteObject => ({
    Department: "development",
    CommitteeName: this.state.eCommitteData.committeeNameFeildValue,
    Subject: this.state.eCommitteData.subjectFeildValue,
    natureOfNote: this.state.eCommitteData.natureOfNoteFeildValue,
    NatuerOfApprovalSanction: this.state.eCommitteData.natureOfApprovalOrSanctionFeildValue,
    NoteType: this.state.eCommitteData.noteTypeFeildValue,
    TypeOfFinancialNote: this.state.eCommitteData.typeOfFinancialNoteFeildValue,
    Amount: this.state.eCommitteData.amountFeildValue,
    Search_x0020_Keyword: this.state.eCommitteData.searchTextFeildValue,
    Purpose: this.state.eCommitteData.puroposeFeildValue,
  });

  // private isNatureOfApprovalOrSanction=()=>{
  //   let isValid=true;
  //   if((this.state.natureOfNoteFeildValue === "Sanction" || this.state.natureOfNoteFeildValue ==="Approval") && this.state.natureOfApprovalOrSanctionFeildValue ===""){
  //     isValid =false;
  //   }
  //   return isValid;
  // }

  private async handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    console.log(event);
    console.log("Event Triggered");
    const {
      committeeNameFeildValue,
      subjectFeildValue,
      natureOfNoteFeildValue,
      noteTypeFeildValue,
      natureOfApprovalOrSanctionFeildValue,
      typeOfFinancialNoteFeildValue,
      searchTextFeildValue,
      amountFeildValue,
      puroposeFeildValue,
    } = this.state;
    console.log(committeeNameFeildValue, "-----------committeeNameFeildValue");
    console.log(subjectFeildValue, "-----------subjectFeildValue");
    console.log(natureOfNoteFeildValue, "-----------natureOfNoteFeildValue");
    console.log(
      natureOfApprovalOrSanctionFeildValue,
      "--------------natureOfApprovalOrSanctionFeildValue"
    );
    console.log(noteTypeFeildValue, "-----------noteTypeFeildValue");
    console.log(
      typeOfFinancialNoteFeildValue,
      "-----------typeOfFinancialNoteFeildValue"
    );
    console.log(searchTextFeildValue, "-----------searchTextFeildValue");
    console.log(amountFeildValue, "-----------amountFeildValue");
    console.log(puroposeFeildValue, "-----------puroposeFeildValue");
    console.log(this.state.noteTypeFeildValue ==='Finanical' && this.state.natureOfNoteFeildValue === 'Information'||'Ratification' ,"check..........................")
    try {
      // eslint-disable-next-line no-constant-condition
      if(this.state.noteTypeFeildValue ==='Finanical' && this.state.natureOfNoteFeildValue === 'Information'||'Ratification' ){
        console.log('financial')
        if (
          this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            
            this.state.noteTypeFeildValue &&
            this.state.typeOfFinancialNoteFeildValue &&
            this.state.amountFeildValue &&
            this.state.searchTextFeildValue 
            
            // this.isNatureOfApprovalOrSanction()
         
        ) {
          const id = await this.props.sp.web.lists
            .getByTitle("eCommittee")
            .items.add(this.createNoteObject());
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
  
          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningAmountField: false,
            isWarningSearchText: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
          });
        }
      }
      else if(this.state.natureOfNoteFeildValue ==='Sanction'||'Approval' && this.state.noteTypeFeildValue==='NonFinancial'){
        console.log('else entered','sanction,approval','nonFinancial')
        if (
          this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.natureOfApprovalOrSanctionFeildValue &&
            this.state.noteTypeFeildValue &&
            
            this.state.searchTextFeildValue &&
            this.state.puroposeFeildValue 
         
        ) {
          const id = await this.props.sp.web.lists
            .getByTitle("eCommittee")
            .items.add(this.createNoteObject());
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
  
          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningAmountField: false,
            isWarningSearchText: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
          });
        }
      }

      
      else if(this.state.natureOfNoteFeildValue ==='Sanction' || this.state.natureOfNoteFeildValue ==='Approval' &&this.state.noteTypeFeildValue ==='Finanical' ){
        console.log('else entered','sanction,approval','financial')
        if (
          this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.natureOfApprovalOrSanctionFeildValue &&
            this.state.noteTypeFeildValue &&
            this.state.typeOfFinancialNoteFeildValue &&
            this.state.amountFeildValue &&
            this.state.searchTextFeildValue &&
            this.state.puroposeFeildValue 
         
        ) {
          const id = await this.props.sp.web.lists
            .getByTitle("eCommittee")
            .items.add(this.createNoteObject());
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
  
          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningAmountField: false,
            isWarningSearchText: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
          });
        }
      }
      else{
        if (
          this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
          
            this.state.noteTypeFeildValue &&
         
            
            this.state.searchTextFeildValue 
           
         
        ) {
          console.log('else entered')
          const id = await this.props.sp.web.lists
            .getByTitle("eCommittee")
            .items.add(this.createNoteObject());
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
  
          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningAmountField: false,
            isWarningSearchText: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
          });

      }
      }
      
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  }

  // Generate Request Number
  private _generateRequsterNumber = async (id: number) => {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `AD1/${currentyear}-${nextYear}/C${id}`;
    // const requesterNo=`AD1/${currentyear}-${nextYear}/C${id}`
    await this.props.sp.web.lists
      .getByTitle("eCommittee")
      .items.getById(id)
      .update({
        Title: requesterNo,
      })
      .then((data) => console.log(data, "data"));
    console.log(requesterNo);
    // eslint-disable-next-line no-void
    void this.createFolder(requesterNo);
  };

  private handleNoteToFileChange = (files: FileList | null, typeOfDoc: string) => {
    console.log(typeOfDoc);
    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      this.setState((prev) => ({ noteTofiles: [...prev.noteTofiles, ...filesArray] }));
    }
  };

  private handleSupportingFileChange = (files: FileList | null, typeOfDoc: string) => {
    console.log(typeOfDoc);
    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      this.setState((prev) => ({ supportingDocumentfiles: [...prev.supportingDocumentfiles, ...filesArray] }));
    }
  };

  public render(): React.ReactElement<IFormProps> {
    // console.log(this.state.files);

    return (
      <div className={styles.form}>
        <Header />
        <Title />

        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: "center", fontSize: "16px" }}>
            General Section
          </h1>
        </div>
        <div className={`${styles.generalSection}`}>
          {/* <div className={`${styles.generalSectionContainer1}`}> */}
          <div className={styles.halfWidth}>
            Department<span className={styles.warning}>*</span>
            <h4 style={{ marginLeft: "20px" }}>Development</h4>
          </div>
          <div
            className={styles.halfWidth}
            style={{ margin: "4px", marginTop: "18px" }}
          >
            <label>
              Committee Name
              <SpanComponent />
            </label>

            {this.state.isWarning ? (
              <DropDownList
                // data={committename}
                style={{
                  // border: '2px solid #4CAF50',
                  border: "2px solid red",
                  borderRadius: "5px", // Rounded corners
                }}
                data={this.state.committename}
                onChange={this.handleCommittenameRedBorder}
              />
            ) : (
              <DropDownList
                // data={committename}
                style={{
                  borderRadius: "5px", // Rounded corners
                }}
                data={this.state.committename}
                onChange={this.handleCommittename}
              />
            )}
          </div>

          <div
            className={styles.halfWidth}
            style={{ margin: "4px", marginTop: "18px" }}
          >
            <label style={{ fontWeight: "600" }}>
              Subject <SpanComponent />
            </label>
            {/* <TextField onChange={this.handleSubject} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} /> */}
            {/* {this.state.isWarning? */}
            <TextBox
              id="Subject"
              // eslint-disable-next-line dot-notation
              // value={this.state.eCommitteData["Subject"] ||""}
              value={this.state.subjectFeildValue}
              onChange={this.handleSubject}
              // onChange={(e)=>this.handletextBoxChange(e,"Subject")}
              style={{
                // border: '2px solid #4CAF50',
                // border: "2px solid red",
                
                borderRadius: "5px", // Rounded corners
              }}
            />
            {/* :
          <TextBox
              value={this.state.subjectFeildValue}
              onChange={this.handleSubject}
            />} */}
          </div>

          <div
            className={styles.halfWidth}
            style={{ margin: "4px", marginTop: "18px" }}
          >
            <label>
              Nature of Note
              <SpanComponent />
            </label>
            {this.state.isWarning ? (
              <DropDownList
                // data={committename}
                data={this.state.natureOfNote}
                onChange={this.handleNatureOfNote}
                style={{
                  // border: '2px solid #4CAF50',
                  border: "2px solid red",
                  borderRadius: "5px", // Rounded corners
                }}
              />
            ) : (
              <DropDownList
                // data={committename}
                data={this.state.natureOfNote}
                onChange={this.handleNatureOfNote}
              />
            )}
          </div>
          {this.state.isNatureOfApprovalOrSanction ? (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label>
                Nature of Approval/Sanction
                <SpanComponent />
              </label>
              {this.state.isWarning ? (
                <DropDownList
                  data={this.state.natureOfApprovalSancation} // This should be an array of objects with `text` and `value` properties
                  // textField="text"  // The field from data items to display in the dropdown
                  // dataItemKey="value"  // The field from data items to use as the key
                  onChange={this.handleNatureOfApprovalOrSanction}
                  // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                  style={{
                    border: "1px solid red",
                    borderRadius: "8px",
                  }} // Inline styles
                />
              ) : (
                <DropDownList
                  data={this.state.natureOfApprovalSancation} // This should be an array of objects with `text` and `value` properties
                  // textField="text"  // The field from data items to display in the dropdown
                  // dataItemKey="value"  // The field from data items to use as the key
                  onChange={this.handleNatureOfApprovalOrSanction}
                  // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                  style={{
                    border: "1px solid rgb(211, 211, 211)",
                    borderRadius: "8px",
                  }} // Inline styles
                />
              )}
            </div>
          ) : (
            ""
          )}
          <div
            className={styles.halfWidth}
            style={{ margin: "4px", marginTop: "18px" }}
          >
            <label>
              Note Type
              <SpanComponent />
            </label>
            {this.state.isWarning ? (
              <DropDownList
                data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                // textField="text"  // The field from data items to display in the dropdown
                // dataItemKey="value"  // The field from data items to use as the key
                onChange={this.handleNoteType}
                // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                style={{
                  border: "1px solid red",
                  borderRadius: "8px",
                }} // Inline styles
              />
            ) : (
              <DropDownList
                data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                // textField="text"  // The field from data items to display in the dropdown
                // dataItemKey="value"  // The field from data items to use as the key
                onChange={this.handleNoteType}
                // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                style={{
                  border: "1px solid rgb(211, 211, 211)",
                  borderRadius: "8px",
                }} // Inline styles
              />
            )}
          </div>
          {this.state.noteTypeFeildValue === "Finanical" && (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label>
                Type of Financial Note
                <SpanComponent />
              </label>
              {this.state.isWarningTypeOfFinancialNote ? (
                <DropDownList
                  data={this.state.typeOfFinancialNote} // This should be an array of objects with `text` and `value` properties
                  // textField="text"  // The field from data items to display in the dropdown
                  // dataItemKey="value"  // The field from data items to use as the key
                  onChange={this.handleTypeOfFinanicalNoteRed}
                  // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                  style={{
                    border: "1px solid red",
                    borderRadius: "8px",
                  }} // Inline styles
                />
              ) : (
                <DropDownList
                  data={this.state.typeOfFinancialNote} // This should be an array of objects with `text` and `value` properties
                  // textField="text"  // The field from data items to display in the dropdown
                  // dataItemKey="value"  // The field from data items to use as the key
                  onChange={this.handleTypeOfFinanicalNote}
                  // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                  style={{
                    border: "1px solid rgb(211, 211, 211)",
                    borderRadius: "8px",
                  }} // Inline styles
                />
              )}
            </div>
          )}
          {/* {this.state.isTypeOfFinacialNote? 
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Type of Financial Note<SpanComponent />
              </label>
              <DropDownList
                     data={this.state.typeOfFinancialNote} // This should be an array of objects with `text` and `value` properties
                // textField="text"  // The field from data items to display in the dropdown
                // dataItemKey="value"  // The field from data items to use as the key
                onChange={this.handleTypeOfFinanicalNote}
                // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                style={{ border: '1px solid rgb(211, 211, 211)', borderRadius: '8px' }}  // Inline styles
              />
               {this.state.isWarning?<AlertComponent/>:''}
            </div>:""} */}

          <div
            className={styles.halfWidth}
            style={{ margin: "4px", marginTop: "18px" }}
          >
            <label style={{ fontWeight: "600" }}>
              Search Text
              <SpanComponent />
            </label>
            {/* <TextField onChange={this.handleSearchText} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} /> */}
            {this.state.isWarningSearchText ? (
              <TextBox
                onChange={this.handleSearchTextRed}
                style={{
                  border: "1px solid red",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <TextBox
                onChange={this.handleSearchText}
                style={{
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
          {this.state.noteTypeFeildValue === "Finanical" && (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label style={{ fontWeight: "600" }}>
                Amount
                <SpanComponent />
              </label>
              {this.state.isWarningAmountField ? (
                <TextBox
                  onChange={this.handleAmountRed}
                  style={{
                    border: "1px solid red",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <TextBox
                  onChange={this.handleAmount}
                  style={{
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          )}
          {/* {this.state.isAmountVisable ? (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label style={{ fontWeight: "600" }}>
                Amount
                <SpanComponent />
              </label>

              <TextBox onChange={this.handleAmount} />
              
            </div>
          ) : (
            ""
          )} */}
          {this.state.isPuroposeVisable ? (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label style={{ fontWeight: "600" }}>
                Purpose
                <SpanComponent />
              </label>

              <TextBox onChange={this.handlePurpose} />
            </div>
          ) : (
            ""
          )}

          {/* </div> */}
        </div>
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: "center", fontSize: "16px" }}>
            Approver Details
          </h1>
        </div>
        <div className={`${styles.generalSectionApproverDetails}`}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                {/* <PeoplePicker
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
                resolveDelay={1000} /> */}
                <PeoplePicker />
                <button
                  type="button"
                  className={`${styles.commonBtn2} ${styles.addBtn}`}
                >
                  <span>+</span>Add
                </button>
              </div>
              <span style={{ color: "blue" }}>
                (Please enter minimum 4 character to search)
              </span>
            </div>
          </div>
          <div className={`${styles.tableContainer}`}>
            <TableComponent />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                <TextField placeholder="Add Reviewers" />
                <button
                  type="button"
                  className={`${styles.commonBtn2} ${styles.addBtn}`}
                >
                  <span>+</span>Add
                </button>
              </div>
              <span style={{ color: "blue" }}>
                (Please enter minimum 4 character to search)
              </span>
            </div>
          </div>
          <div className={`${styles.tableContainer}`}>
            <TableComponent />
          </div>
        </div>
        <div className={`${styles.generalSectionMainContainer}`}>
          <h1 style={{ textAlign: "center", fontSize: "16px" }}>
            File Attachments
          </h1>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className={`${styles.generalSectionApproverDetails}`}
        >
          <div>
            <p className={styles.label}>
              Note PDF<span className={styles.warning}>*</span>
            </p>
            <UploadFileComponent
              typeOfDoc="notePdF"
              onChange={this.handleNoteToFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <p className={styles.message}>
              Allowed only one PDF. Up to 10MB max.
            </p>
          </div>

          <div>
            <p className={styles.label}>Supporting Documents</p>
            {/* <Upload
                autoUpload={false}
                onAdd={this.handleAdd}
              /> */}
            <UploadFileComponent
              typeOfDoc="supportingDocument"
              onChange={this.handleSupportingFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <p className={styles.message}>
              Allowed Formats (pdf,doc,docx,xlsx only) Upto 25MB max.
            </p>
          </div>
        </div>
        <div></div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            className={`${styles.commonBtn1} ${styles.commonBtn}`}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className={`${styles.commonBtn1} ${styles.commonBtn}`}
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className={`${styles.commonBtn2} ${styles.commonBtn}`}
          >
            Exit
          </button>
        </div>
        {/* <ul>
            {this.state.files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul> */}
      </div>
    );
  }
}
