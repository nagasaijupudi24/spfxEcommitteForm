/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import styles from "../Form.module.scss";
// import { SPFI } from "@pnp/sp";
import { IFormProps } from "../IFormProps";
import { DefaultButton } from "@fluentui/react";
import { IDropdownOption } from "office-ui-fabric-react";
// import {  InputChangeEvent } from '@progress/kendo-react-inputs';
import { TextBox, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

//spinner related

import { Spinner } from "@fluentui/react/lib/Spinner";
// import { IStackTokens } from "@fluentui/react/lib/Stack";
// import { Label } from "@fluentui/react/lib/Label";
// import TableComponent from "./tableSwap";
import UploadFileComponent from "./uploadFile";
// import Header from "./Header/header";
import Title from "./titleSectionComponent/title";
import SpanComponent from "./spanComponent/spanComponent";

import MyDialog from "./dialog/dialog";
import ApproverOrReviewerDialog from "./ApproverOrReviewerDialog/approverOrReviewerDialog";
// import GetForm from '../spListGet/spListGet';
// import PeoplePicker from "./peoplePickerInKenod/peoplePickerInKendo";
// import MultiComboBoxTable from "./comboBoxTable/comboBoxTable";
// import AlertComponent from "./alter/alter";
import DraggableTable from "./draggableGridKendo/draggableGridKendo";
import "@progress/kendo-theme-default/dist/all.css";

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
import {
  PeoplePicker,
  PrincipalType,
  IPeoplePickerContext,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
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
  ApproverDetails: any;
  Status: string;
  statusNumber: any;
  AuditTrail: any;
  ReviewerId:any;
  ApproverId:any
}

interface IMainFormState {
  isLoading: boolean;
  department: string;
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
  isWarningCommittteeName: boolean;
  isWarningSubject: boolean;
  isWarningNatureOfNote: boolean;
  isWarningNatureOfApporvalOrSanction: boolean;
  isWarningNoteType: boolean;
  isWarningTypeOfFinancialNote: boolean;

  isWarningSearchText: boolean;

  isWarningAmountField: boolean;
  isWarningPurposeField: boolean;
  eCommitteData: any;
  noteTofiles: File[];
  isWarningNoteToFiles: boolean;

  wordDocumentfiles: File[];
  isWarningWordDocumentFiles: boolean;

  supportingDocumentfiles: File[];
  isWarningSupportingDocumentFiles: boolean;

  isWarningPeoplePicker: boolean;
  isDialogHidden: boolean;
  isApproverOrReviewerDialogHandel: boolean;

  peoplePickerData: any;
  peoplePickerApproverData: any;
  approverInfo: any;
  reviewerInfo: any;

  status: string;
  statusNumber: any;
}

// let fetchedData:any[];

//spinner
// const stackTokens: IStackTokens = {
//   childrenGap: 20,
//   maxWidth: 250,
// };

export const FormContext = React.createContext<any>(null);

// const committeeOptions = [
//    'committeeA' ,
//    'committeeB',
//    'committeeC'
// ];

export default class Form extends React.Component<IFormProps, IMainFormState> {
  private _peopplePicker: IPeoplePickerContext;
  private _userName: string;
  private _role: string;
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isLoading: true,
      department: "",
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
      isWarningCommittteeName: false,
      isWarningSubject: false,
      isWarningNatureOfNote: false,
      isWarningNatureOfApporvalOrSanction: false,
      isWarningNoteType: false,
      isWarningTypeOfFinancialNote: false,
      isWarningSearchText: false,
      isWarningAmountField: false,
      isWarningPurposeField: false,
      isWarningPeoplePicker: false,
      eCommitteData: {},
      noteTofiles: [],
      isWarningNoteToFiles: false,

      wordDocumentfiles: [],
      isWarningWordDocumentFiles: false,

      supportingDocumentfiles: [],
      isWarningSupportingDocumentFiles: false,
      isDialogHidden: true,
      isApproverOrReviewerDialogHandel: true,
      peoplePickerData: [],
      peoplePickerApproverData: [],
      approverInfo: [],
      reviewerInfo: [],
      status: "",
      statusNumber: null,
    };

    this._peopplePicker = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      // msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient,
    };
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

  private _getUserProperties = async (loginName: any): Promise<any> => {
    let designation = "NA";
    let email = "NA";
    // const loginName = this.state.peoplePickerData[0]
    const profile = await this.props.sp.profiles.getPropertiesFor(loginName);
    // console.log(profile.DisplayName);
    // console.log(profile.Email);
    // console.log(profile.Title);
    // console.log(profile.UserProfileProperties.length);
    designation = profile.Title;
    email = profile.Email;
    // Properties are stored in inconvenient Key/Value pairs,
    // so parse into an object called userProperties
    const props: any = {};
    profile.UserProfileProperties.forEach(
      (prop: { Key: string | number; Value: any }) => {
        props[prop.Key] = prop.Value;
      }
    );

    profile.userProperties = props;
    // console.log("Account Name: " + profile.userProperties.AccountName);
    return [designation, email];
  };

  private getfield = async () => {
    try {
      const fieldDetails = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .fields.filter("Hidden eq false and ReadOnlyField eq false")();
      // console.log(fieldDetails)

      const profile = await this.props.sp.profiles.myProperties();
      console.log(profile);
      this._userName = profile.DisplayName;
      this._role = profile.Title;

      profile.UserProfileProperties.filter((element: any) => {
        // console.log(element)
        if (element.Key === "Department" && element.Value === "Development") {
          // console.log(element)
          //
          this.setState({ department: element.Value });
        }
      });

      // fieldDetails.map(each=>console.log(each.StaticName))
      const filtering = fieldDetails.map((_x) => {
        if (_x.TypeDisplayName === "Choice") {
          // console.log(_x.InternalName, ":", _x.Choices);

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

            // console.log(noteTypeArray);

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
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching field details: ", error);
    }
  };

  public componentDidMount = (): void => {
    this._fetchApproverDetails()
      .then(() => {
        console.log("List items fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching list items: ", error);
      });
  };

  private _fetchApproverDetails = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items: any[] = await (
        await this.props.sp.web.lists
          .getByTitle("ApprovalConfiguration")
          .items.select("*", "Approvers/Title", "Approvers/EMail")
          .expand("Approvers")()
      )
        .map((each: any) => {
          // console.log(each)

          const newObj = {
            text: each.Approvers.Title,
            email: each.Approvers.EMail,
            ApproversId: each.ApproversId,
            approverType: each.approverType,
            approversOrder: each.approversOrder,
            Title: each.Title,
            id:each.ApproversId
          };
          return newObj;
        })
        .filter((each: any) => each.Title === "Development");
      // console.log(items)

      items.map((e: any) => {
        if (e.approverType === 1) {
          this.setState({ peoplePickerData: [e] });
        } else {
          this.setState({ peoplePickerApproverData: [e] });
        }
      });

      // this.setState({ itemsFromSpList:items });
      // this.setState(prevState => ({
      //   itemsFromSpList: [...prevState.itemsFromSpList, ...items]
      // }));
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  };

  // private handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
  //   console.log(typeof item);
  //   console.log(this.state.natureOfNote)
  //   // console.log(this.state.itemsFromSpList)
  //   // const {text} = item
  //   // console.log(text)
  //   this.setState({ noteTypeValue: item }); // Update state with selected item
  // };

  private _getPeoplePickerItems = async (items: any[]) => {
    console.log("Items:", items);
    // fetchedData = items
    console.log(items[0].loginName);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    console.log(items, "this._getUserProperties(items[0].loginName)");

    // this.setState({approverInfo:items})

    const dataRec = await this._getUserProperties(items[0].loginName);
    // const finalData = await dataRec.json()
    // dataRec.then((x: any)=>{
    //   console.log(x)
    //   designation=x
    // });
    // console.log(typeof dataRec?.toString());

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map((obj: { loginName: any }) => {
        return { ...obj, optionalText: "N/A", approverType: 1 };
      });
      console.log(newItemsDataNA);
      this.setState({ reviewerInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map((obj: { loginName: any }) => {
        return {
          ...obj,
          optionalText: dataRec[0],
          approverType: 1,
          email: dataRec[1],
        };
      });
      // console.log(newItemsData)
      this.setState({ reviewerInfo: newItemsData });
    }
  };

  private _getPeoplePickerItemsApporvers = async (items: any[]) => {
    console.log("Items:", items);
    // fetchedData = items
    // console.log(items[0].loginName);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // console.log(items, "this._getUserProperties(items[0].loginName)");

    // this.setState({approverInfo:items})

    const dataRec = await this._getUserProperties(items[0].loginName);
    // const finalData = await dataRec.json()
    // dataRec.then((x: any)=>{
    //   console.log(x)
    //   designation=x
    // });
    // console.log(typeof dataRec?.toString());

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map((obj: { loginName: any }) => {
        return { ...obj, optionalText: "N/A", approverType: 2 };
      });
      console.log(newItemsDataNA);
      this.setState({ approverInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map((obj: { loginName: any }) => {
        return {
          ...obj,
          optionalText: dataRec[0],
          approverType: 2,
          email: dataRec[1],
        };
      });
      // console.log(newItemsData)
      this.setState({ approverInfo: newItemsData });
    }
  };

  public reOrderData = (reOrderData: any[]): void => {
    this.setState({ peoplePickerData: reOrderData });
  };

  public removeDataFromGrid = (dataItem: any, typeOfTable: string): void => {
    if (typeOfTable === "Reviewer") {
      console.log("Remove triggered from Reviewer Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerData: filterData });
    } else {
      console.log("Remove triggered Approver Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerApproverData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerApproverData: filterData });
    }
  };

  private checkReviewer = () => {
    const approverTitles = this.state.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    console.log(approverTitles);

    const reveiwerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );
    console.log(reveiwerTitles);

    const returnBoolean =
      reveiwerTitles.includes(this.state.reviewerInfo[0].text) ||
      approverTitles.includes(this.state.reviewerInfo[0].text);
    return returnBoolean;
  };

  private checkApprover = () => {
    const approverTitles = this.state.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    console.log(approverTitles);

    const reveiwerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );
    console.log(reveiwerTitles);

    const returnBoolean =
      reveiwerTitles.includes(this.state.approverInfo[0].text) ||
      approverTitles.includes(this.state.approverInfo[0].text);
    return returnBoolean;
  };

  private handleOnAdd = async (event: any, type: string): Promise<void> => {
    if (type === "reveiwer") {
      // console.log(this.checkReviewer());
      // this.checkReviewer()

      // console.log(event)
      // let designation=""
      // eslint-disable-next-line no-return-assign

      // console.log(this._getUserProperties(this.state.approverInfo[0].loginName).then(x),"title")

      // console.log(type,newItemsData,"test",designation)
      if (this.checkReviewer()) {
        console.log("Data already Exist in Reviewer Table or Approver Table");
        this.setState({ isApproverOrReviewerDialogHandel: false });
      } else {
        console.log(this.state.reviewerInfo, "Reviewer Info");
        this.setState((prev) => ({
          peoplePickerData: [
            ...prev.peoplePickerData,
            ...this.state.reviewerInfo,
          ],
        }));
      }

      // console.log(fetchedData)
      // this._getPeoplePickerItems()
      console.log(this.state.reviewerInfo, "handle On Add-reveiwer section");
    } else {
      // console.log(event)
      // let designation=""
      // eslint-disable-next-line no-return-assign

      // console.log(this._getUserProperties(this.state.approverInfo[0].loginName).then(x),"title")

      // console.log(type,newItemsData,"test",designation)
      if (this.checkApprover()) {
        console.log("Data already Exist in Reviewer Table or Approver Table");
        this.setState({ isApproverOrReviewerDialogHandel: false });
      } else {
        console.log(this.state.approverInfo, "Approver Info");
        this.setState((prev) => ({
          peoplePickerApproverData: [
            ...prev.peoplePickerApproverData,
            ...this.state.approverInfo,
          ],
        }));
      }

      // console.log(fetchedData)
      // this._getPeoplePickerItems()
      console.log(this.state.approverInfo, "handle On Add-Approver section");
    }
  };

  // private handleCommittenameRedBorder = (event: any): void => {
  //   // Handle click event
  //   console.log("Dropdown clicked");
  //   const value = event.value;
  //   console.log(value);
  //   this.setState({ isWarningCommittteeName: false, committeeNameFeildValue: value });
  // };

  // general section --------handling
  // general section --------handling
  // general section --------handling
  // private handleCommittename(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  //   // console.log(item.text);
  //   // this.setState({ noteTypeValue: item });
  //   const value = item.text
  //   this.setState({committeeNameFeildValue:value})
  // }

  private handleCommittename = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({ committeeNameFeildValue: value });
  };

  private handleCommittenameRedBorder = (event: any): void => {
    // Handle click event
    console.log("Dropdown clicked");
    const value = event.value;
    console.log(value);
    this.setState({
      isWarningCommittteeName: false,
      committeeNameFeildValue: value,
    });
  };

  // private closeDialog = (): void => {
  //   this.setState({isDialogHidden:true})
  // };

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
    const { value } = event.target;
    // console.log(value, id, "-----------handleSubject");
    this.setState({ subjectFeildValue: value });
  };

  private handleSubjectRed = (event: any) => {
    // const value = event.target.value ?? ''; // Handle undefined values
    // console.log(value);
    // this.setState({ subjectFeildValue: value });
    const { value } = event.target;
    // console.log(value, id, "-----------handleSubject");
    this.setState({ subjectFeildValue: value, isWarningSubject: false });
  };

  private handleNatureOfNote = (event: any): void => {
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
  };

  private handleNatureOfNoteRed = (event: any): void => {
    const item = event.value;
    console.log(item);
    console.log(item === "Sanction" || item === "Approval");
    if (item === "Sanction" || item === "Approval") {
      this.setState({
        natureOfNoteFeildValue: item,
        isNatureOfApprovalOrSanction: true,
        isPuroposeVisable: true,
        isWarningNatureOfNote: false,
      });
    } else {
      this.setState({
        natureOfNoteFeildValue: item,
        isNatureOfApprovalOrSanction: false,
        isPuroposeVisable: false,
        isWarningNatureOfNote: false,
      });
    }
  };

  private handleNatureOfApprovalOrSanction = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({ natureOfApprovalOrSanctionFeildValue: value });
  };

  private handleNatureOfApprovalOrSanctionRed = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({
      natureOfApprovalOrSanctionFeildValue: value,
      isWarningNatureOfApporvalOrSanction: false,
    });
  };

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

  private handleNoteTypeRed = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({
      isWarningNoteType: false,
      noteTypeFeildValue: value,
    });
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
  private handleTypeOfFinanicalNote = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({ typeOfFinancialNoteFeildValue: value });
  };

  private handleTypeOfFinanicalNoteRed = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({
      isWarningTypeOfFinancialNote: false,
      typeOfFinancialNoteFeildValue: value,
    });
  };

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

  private handlePurposeRed = (event: any): void => {
    const value = event.value;
    console.log(value);
    this.setState({
      isWarningAmountField: false,
      puroposeFeildValue: value,
    });
  };

  // general section --------handling---------end
  // general section --------handling---------end
  // general section --------handling---------end

  private createSubFolder = async (parentFolderPath: string): Promise<void> => {
    console.log(parentFolderPath);

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

      console.log(`Folder -----PDF---- created successfully in list `);

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

      console.log(
        `Folder -----Supporting Document---- created successfully in list `
      );

      const siteUrlWordDocument = `${parentFolderPath}/WordDocument`;
      console.log(siteUrl);
      const filesDataWordDocument = this.state.wordDocumentfiles;
      await this.props.sp.web.rootFolder.folders
        .addUsingPath(siteUrlWordDocument)
        .then(async (res) => {
          for (let i = 0; i < filesDataWordDocument.length; i++) {
            const file = filesDataWordDocument[i];
            const arrayBuffer = await file.arrayBuffer();
            // Upload a file to the SharePoint Library
            await this.props.sp.web
              .getFolderByServerRelativePath(siteUrlWordDocument)
              .files.addUsingPath(file.name, arrayBuffer, { Overwrite: true });
          }
        });

      console.log(
        `Folder -----Word Document---- created successfully in list `
      );
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
      const siteUrl = `${absUrl}/${this.props.libraryId}/${folderName}`;
      console.log(siteUrl);
      // const filesData = this.state.files;
      // const folderId =
      await this.props.sp.web.rootFolder.folders.addUsingPath(siteUrl);
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
      void this.createSubFolder(siteUrl);
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
  //     await this.props.sp.web.lists.getByTitle(this.props.listId).items.add({
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
  //     await this.props.sp.web.lists.getByTitle(this.props.listId).items.add({
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
  //     await this.props.sp.web.lists.getByTitle(this.props.listId).items.add({
  //       Title: "Title",

  //     });
  //   }

  private _getApproverDetails = (reveiwerData: any, apporverData: any): any => {
    const dataOfReveiwerAndApprover = [...reveiwerData, ...apporverData];
    const finalData = dataOfReveiwerAndApprover.map(
      (each: any, index: number) => {
        console.log(each);
        return {
          approverType: each.approverType,
          approverEmail: each.email,
          approverOrder: index + 1,
          approverStatus: 1,

          srNo: "selectedReveiwer.srNo",
          designation: each.optionalText,
          approverEmailName: each.text,
        };
      }
    );

    return JSON.stringify(finalData);
  };


  private _getAuditTrail = (status:any): any => {
    console.log(this._userName,this._role)
    const auditLog = [
      {
        Actioner: this._userName,
        ActionTaken: status,
        Role: this._role,
        ActionTakenOn:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        Comments: "No Comments",
      },
    ]

    return JSON.stringify(auditLog)
  };

  private _getReviewerId = ()=>{
    const arr = this.state.peoplePickerData.map((each:any)=>{
      if( each.id !== 'undefined'){
        return each.id
      }

    }
      
      )
      
      const nw = arr.filter((each:any)=>{
        if (each !== undefined){
          return `${each}`
        }
      })
    console.log(nw)
    return nw
  }

  private _getApproverId = ()=>{
    const arr = this.state.peoplePickerApproverData.map((each:any)=>{
      if( each.id !== 'undefined'){
        return each.id
      }

    }
      
      )
      
      const nw = arr.filter((each:any)=>{
        if (each !== undefined){
          return `${each}`
        }
      })
    console.log(nw)
    return nw
  }

  private createEcommitteeObject = (
    status: string,
    statusNumber: any
  ): INoteObject => {
    console.log({
      Department: this.state.department,
      CommitteeName: this.state.committeeNameFeildValue,
      Subject: this.state.subjectFeildValue,
      natureOfNote: this.state.natureOfNoteFeildValue,
      NatuerOfApprovalSanction: this.state.natureOfApprovalOrSanctionFeildValue,
      NoteType: this.state.noteTypeFeildValue,
      TypeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
      Amount: this.state.amountFeildValue,
      Search_x0020_Keyword: this.state.searchTextFeildValue,
      Purpose: this.state.puroposeFeildValue,
      ApproverDetails: this._getApproverDetails(
        this.state.peoplePickerData,
        this.state.peoplePickerApproverData
      ),
      Status: status,
      statusNumber: statusNumber,
      AuditTrail: this._getAuditTrail(status),
      // Reviewer:{result:this._getReviewerId()}
      ReviewerId:this._getReviewerId(),
      ApproverId:this._getApproverId()

    });
    return {
      Department: this.state.department,
      CommitteeName: this.state.committeeNameFeildValue,
      Subject: this.state.subjectFeildValue,
      natureOfNote: this.state.natureOfNoteFeildValue,
      NatuerOfApprovalSanction: this.state.natureOfApprovalOrSanctionFeildValue,
      NoteType: this.state.noteTypeFeildValue,
      TypeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
      Amount: this.state.amountFeildValue,
      Search_x0020_Keyword: this.state.searchTextFeildValue,
      Purpose: this.state.puroposeFeildValue,
      ApproverDetails: this._getApproverDetails(
        this.state.peoplePickerData,
        this.state.peoplePickerApproverData
      ),
      Status: status,
      statusNumber: statusNumber,
      AuditTrail: this._getAuditTrail(status),
      ReviewerId:this._getReviewerId(),
      ApproverId:this._getApproverId()
    };
  };

  // private isNatureOfApprovalOrSanction=()=>{
  //   let isValid=true;
  //   if((this.state.natureOfNoteFeildValue === "Sanction" || this.state.natureOfNoteFeildValue ==="Approval") && this.state.natureOfApprovalOrSanctionFeildValue ===""){
  //     isValid =false;
  //   }
  //   return isValid;
  // }

  private handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
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
    console.log(
      this.state.noteTypeFeildValue === "Finanical" &&
        (this.state.natureOfNoteFeildValue === "Information" || "Ratification"),
      ",check.........................."
    );
    try {
      // eslint-disable-next-line no-constant-condition
      if (
        this.state.noteTypeFeildValue === "Finanical" &&
        (this.state.natureOfNoteFeildValue === "Information" || "Ratification")
      ) {
        console.log("financial");
        if (
          this.state.committeeNameFeildValue &&
          this.state.subjectFeildValue &&
          this.state.natureOfNoteFeildValue &&
          this.state.noteTypeFeildValue &&
          this.state.typeOfFinancialNoteFeildValue &&
          this.state.amountFeildValue &&
          this.state.searchTextFeildValue &&
          this.state.noteTofiles.length > 0 &&
          this.state.supportingDocumentfiles.length > 0 &&
          this.state.peoplePickerData.length > 0

          // this.isNatureOfApprovalOrSanction()
        ) {
          this.setState({ status: "Submitted", statusNumber: "1000" });
          const id = await this.props.sp.web.lists
            .getByTitle(this.props.listId)
            .items.add(this.createEcommitteeObject("Submitted", 1000));
          console.log(id.Id, "id");
          this.state.peoplePickerData.map(async (each: any) => {
            console.log(each);
            // const listItem = await this.props.sp.web.lists
            //   .getByTitle(this.props.listId)
            //   .items.add({
            //     Title: `${each.id}`,
            //     // Approvers:each.text
            //   });
            // console.log(listItem);
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);

          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningCommittteeName: false,
            isWarningSubject: false,
            isWarningNatureOfNote: false,
            isWarningNoteType: false,
            isWarningTypeOfFinancialNote: false,

            // isWarningS
            isWarningAmountField: false,
            isWarningSearchText: false,
            isWarningNoteToFiles: false,
            isWarningSupportingDocumentFiles: false,
            isWarningPeoplePicker: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningCommittteeName: true,
            isWarningSubject: true,
            isWarningNatureOfNote: true,
            isWarningNoteType: true,
            isWarningTypeOfFinancialNote: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
            isWarningNoteToFiles: true,
            isWarningSupportingDocumentFiles: true,
            isWarningPeoplePicker: true,
            isDialogHidden: false,
          });

          this.setState({
            eCommitteData: {
              committeeNameFeildValue: this.state.committeeNameFeildValue,
              subjectFeildValue: this.state.subjectFeildValue,
              natureOfNoteFeildValue: this.state.natureOfNoteFeildValue,
              noteTypeFeildValue: this.state.noteTypeFeildValue,
              typeOfFinancialNoteFeildValue:
                this.state.typeOfFinancialNoteFeildValue,
              amountFeildValue: this.state.amountFeildValue,
              searchTextFeildValue: this.state.searchTextFeildValue,
              noteTofiles: this.state.noteTofiles,
              supportingDocumentfiles: this.state.supportingDocumentfiles,
              peoplePickerData: this.state.peoplePickerData,
            },
          });
        }
      } else if (
        (this.state.natureOfNoteFeildValue === "Sanction" ||
          this.state.natureOfNoteFeildValue === "Approval") &&
        this.state.noteTypeFeildValue === "NonFinancial"
      ) {
        console.log("else entered", "sanction,approval", "nonFinancial");
        if (
          this.state.committeeNameFeildValue &&
          this.state.subjectFeildValue &&
          this.state.natureOfNoteFeildValue &&
          this.state.natureOfApprovalOrSanctionFeildValue &&
          this.state.noteTypeFeildValue &&
          this.state.searchTextFeildValue &&
          this.state.puroposeFeildValue &&
          this.state.noteTofiles.length > 0 &&
          this.state.supportingDocumentfiles.length > 0 &&
          this.state.peoplePickerData.length > 0
        ) {
          this.setState({ status: "Submitted", statusNumber: "1000" });
          const id = await this.props.sp.web.lists
            .getByTitle(this.props.listId)
            .items.add(this.createEcommitteeObject("Submitted", "1000"));
          console.log(id.Id, "id");
          this.state.peoplePickerData.map(async (each: any) => {
            console.log(each);
            // const listItem = await this.props.sp.web.lists
            //   .getByTitle(this.props.listId)
            //   .items.add({
            //     Title: `${each.id}`,
            //     // Approvers:each.text
            //   });
            // console.log(listItem);
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);

          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            committeeNameFeildValue:'',
            subjectFeildValue:'',
            natureOfNoteFeildValue:'',
            natureOfApprovalOrSanctionFeildValue:'',
            noteTypeFeildValue:'',
            searchTextFeildValue:'',
            puroposeFeildValue:'',
            noteTofiles:[],
            supportingDocumentfiles:[],
            wordDocumentfiles:[],
            peoplePickerApproverData:[],
            peoplePickerData:[]
          })
          this.setState({
            isWarning: false,
            isWarningCommittteeName: false,
            isWarningSubject: false,
            isWarningNatureOfNote: false,
            isWarningNatureOfApporvalOrSanction: false,
            isWarningNoteType: false,
            isWarningSearchText: false,
            isWarningPurposeField: false,
            isWarningNoteToFiles: false,
            isWarningSupportingDocumentFiles: false,
            isWarningPeoplePicker: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningCommittteeName: true,
            isWarningSubject: true,
            isWarningNatureOfNote: true,
            isWarningNatureOfApporvalOrSanction: true,
            isWarningNoteType: true,
            isWarningSearchText: true,
            isWarningPurposeField: true,
            isWarningNoteToFiles: true,
            isWarningSupportingDocumentFiles: true,
            isWarningPeoplePicker: true,
            isDialogHidden: false,
          });

          this.setState({
            eCommitteData: {
              committeeNameFeildValue: this.state.committeeNameFeildValue,
              subjectFeildValue: this.state.subjectFeildValue,
              natureOfNoteFeildValue: this.state.natureOfNoteFeildValue,
              natureOfApprovalOrSanctionFeildValue:
                this.state.natureOfApprovalOrSanctionFeildValue,
              noteTypeFeildValue: this.state.noteTypeFeildValue,
              searchTextFeildValue: this.state.searchTextFeildValue,
              puroposeFeildValue: this.state.puroposeFeildValue,
              noteTofiles: this.state.noteTofiles,
              supportingDocumentfiles: this.state.supportingDocumentfiles,
              peoplePickerData: this.state.peoplePickerData,
            },
          });
        }
      } else if (
        (this.state.natureOfNoteFeildValue === "Sanction" ||
          this.state.natureOfNoteFeildValue === "Approval") &&
        this.state.noteTypeFeildValue === "Finanical"
      ) {
        console.log("else entered", "sanction,approval", "financial");
        if (
          this.state.committeeNameFeildValue &&
          this.state.subjectFeildValue &&
          this.state.natureOfNoteFeildValue &&
          this.state.natureOfApprovalOrSanctionFeildValue &&
          this.state.noteTypeFeildValue &&
          this.state.typeOfFinancialNoteFeildValue &&
          this.state.amountFeildValue &&
          this.state.searchTextFeildValue &&
          this.state.puroposeFeildValue &&
          this.state.noteTofiles.length > 0 &&
          this.state.supportingDocumentfiles.length > 0 &&
          this.state.peoplePickerData.length > 0
        ) {
          this.setState({ status: "Submitted", statusNumber: "1000" });
          const id = await this.props.sp.web.lists
            .getByTitle(this.props.listId)
            .items.add(this.createEcommitteeObject("Submitted", "1000"));
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
          this.state.peoplePickerData.map(async (each: any) => {
            console.log(each);
            // const listItem = await this.props.sp.web.lists
            //   .getByTitle(this.props.listId)
            //   .items.add({
            //     Title: `${each.id}`,
            //     // Approvers:each.text
            //   });
            // console.log(listItem);
          });

          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            committeeNameFeildValue:'',
            subjectFeildValue:'',
            natureOfNoteFeildValue:'',
            natureOfApprovalOrSanctionFeildValue:'',
            noteTypeFeildValue:'',
            typeOfFinancialNoteFeildValue:'',
            amountFeildValue:0,
            searchTextFeildValue:'',
            puroposeFeildValue:'',
            noteTofiles:[],
            supportingDocumentfiles:[],
            wordDocumentfiles:[],
            peoplePickerApproverData:[],
            peoplePickerData:[]
          })
          this.setState({
            isWarning: false,
            isWarningCommittteeName: false,
            isWarningSubject: false,
            isWarningNatureOfNote: false,
            isWarningNatureOfApporvalOrSanction: false,
            isWarningNoteType: false,
            isWarningTypeOfFinancialNote: false,
            isWarningAmountField: false,
            isWarningSearchText: false,
            isWarningPurposeField: false,
            isWarningNoteToFiles: false,
            isWarningSupportingDocumentFiles: false,
            isWarningPeoplePicker: false,
          });
        } else {
          this.setState({
            isWarning: true,
            isWarningCommittteeName: true,
            isWarningSubject: true,
            isWarningNatureOfNote: true,
            isWarningNatureOfApporvalOrSanction: true,
            isWarningNoteType: true,
            isWarningTypeOfFinancialNote: true,
            isWarningAmountField: true,
            isWarningSearchText: true,
            isWarningPurposeField: true,
            isWarningNoteToFiles: true,
            isWarningSupportingDocumentFiles: true,
            isWarningPeoplePicker: true,
            isDialogHidden: false,
          });
          this.setState({
            eCommitteData: {
              committeeNameFeildValue: this.state.committeeNameFeildValue,
              subjectFeildValue: this.state.subjectFeildValue,
              natureOfNoteFeildValue: this.state.natureOfNoteFeildValue,
              natureOfApprovalOrSanctionFeildValue:
                this.state.natureOfApprovalOrSanctionFeildValue,
              noteTypeFeildValue: this.state.noteTypeFeildValue,
              typeOfFinancialNoteFeildValue:
                this.state.typeOfFinancialNoteFeildValue,
              amountFeildValue: this.state.amountFeildValue,
              searchTextFeildValue: this.state.searchTextFeildValue,
              puroposeFeildValue: this.state.puroposeFeildValue,
              noteTofiles: this.state.noteTofiles,
              supportingDocumentfiles: this.state.supportingDocumentfiles,
              peoplePickerData: this.state.peoplePickerData,
            },
          });
        }
      } else {
        console.log("final else");
        this.setState({ status: "Submitted", statusNumber: "1000" });
        // eslint-disable-next-line no-constant-condition
        if (this.state.natureOfNoteFeildValue === "Approval" || "Sanction") {
          this.setState({
            isWarningNatureOfApporvalOrSanction: true,
            isWarningPurposeField: true,
          });
        }
        if (
          this.state.committeeNameFeildValue &&
          this.state.subjectFeildValue &&
          this.state.natureOfNoteFeildValue &&
          this.state.noteTypeFeildValue &&
          this.state.searchTextFeildValue &&
          this.state.noteTofiles.length > 0 &&
          this.state.supportingDocumentfiles.length > 0 &&
          this.state.peoplePickerData.length > 0
        ) {
          console.log("else entered");
          const id = await this.props.sp.web.lists
            .getByTitle(this.props.listId)
            .items.add(this.createEcommitteeObject("Submitted", "1000"));
          console.log(id.Id, "id");
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._generateRequsterNumber(id.Id);
          this.state.peoplePickerData.map(async (each: any) => {
            console.log(each);
            // const listItem = await this.props.sp.web.lists
            //   .getByTitle(this.props.listId)
            //   .items.add({
            //     Title: `${each.id}`,
            //     // // Approvers:each.text
            //   });
            // console.log(listItem);
          });

          this.setState({committeeNameFeildValue:'',
            subjectFeildValue:'',
            natureOfNoteFeildValue:'',
            noteTypeFeildValue:'',
            searchTextFeildValue:'',
            noteTofiles:[],
            supportingDocumentfiles:[],
            wordDocumentfiles:[],
            peoplePickerApproverData:[],
            peoplePickerData:[]
          })

          // console.log(id)
          console.log("Item added successfully");
          this.setState({
            isWarning: false,
            isWarningCommittteeName: false,
            isWarningSubject: false,
            isWarningNatureOfNote: false,

            isWarningNoteType: false,

            isWarningSearchText: false,
            isWarningNoteToFiles: false,
            isWarningSupportingDocumentFiles: false,
            isWarningPeoplePicker: false,
          });
        } else {
          // alert("Required Fields")

          this.setState({
            isWarning: true,
            isWarningCommittteeName: true,
            isWarningSubject: true,
            isWarningNatureOfNote: true,

            isWarningNoteType: true,

            isWarningSearchText: true,
            isDialogHidden: false,
            isWarningNoteToFiles: true,
            isWarningSupportingDocumentFiles: true,
            isWarningPeoplePicker: true,
          });
          this.setState({
            eCommitteData: {
              committeeNameFeildValue: this.state.committeeNameFeildValue,
              subjectFeildValue: this.state.subjectFeildValue,
              natureOfNoteFeildValue: this.state.natureOfNoteFeildValue,

              noteTypeFeildValue: this.state.noteTypeFeildValue,

              searchTextFeildValue: this.state.searchTextFeildValue,

              noteTofiles: this.state.noteTofiles,
              supportingDocumentfiles: this.state.supportingDocumentfiles,
              peoplePickerData: this.state.peoplePickerData,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  // Generate Request Number
  private _generateRequsterNumber = async (id: number) => {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `AD1/${currentyear}-${nextYear}/C${id}`;
    // const requesterNo=`AD1/${currentyear}-${nextYear}/C${id}`
    await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(id)
      .update({
        Title: requesterNo,
      })
      .then((data) => console.log(data, "data"));
    console.log(requesterNo);
    // eslint-disable-next-line no-void
    void this.createFolder(requesterNo);
  };

  private handleNoteToFileChange = (
    files: FileList | null,
    typeOfDoc: string
  ) => {
    console.log(typeOfDoc);

    if (this.state.isWarningNoteToFiles) {
      this.setState({ isWarningNoteToFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   noteTofiles: [...prev.noteTofiles, ...filesArray],
      // }));
      this.setState({ noteTofiles: [...filesArray] });
    }
  };

  private handleSupportingFileChange = (
    files: FileList | null,
    typeOfDoc: string
  ) => {
    console.log(typeOfDoc);

    if (this.state.isWarningSupportingDocumentFiles) {
      this.setState({ isWarningSupportingDocumentFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   supportingDocumentfiles: [
      //     ...prev.supportingDocumentfiles,
      //     ...filesArray,
      //   ],
      // }));
      this.setState({ supportingDocumentfiles: [...filesArray] });
    }
  };

  private handleWordDocumentFileChange = (
    files: FileList | null,
    typeOfDoc: string
  ) => {
    console.log(typeOfDoc);

    if (this.state.isWarningWordDocumentFiles) {
      this.setState({ isWarningWordDocumentFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   wordDocumentfiles: [...prev.wordDocumentfiles, ...filesArray],
      // }));
      this.setState({ wordDocumentfiles: [...filesArray] });
    }
  };

  public handleDialogBox = (): void => {
    console.log("Dialog handling");
    this.setState({ isDialogHidden: true });
  };

  public handleApproverOrReviewerDialogBox = (): void => {
    console.log("Dialog handling");
    this.setState({ isApproverOrReviewerDialogHandel: true });
  };

  public checkUserIsIBTes2 = (
    peoplePickerData: any,
    peoplePickerApproverData: any
  ): boolean => {
    // console.log(peoplePickerData)
    const allData = [...peoplePickerData, ...peoplePickerApproverData];
    const booleanCheck = allData?.some((each: any) => {
      if (each.text === "IB Test2") {
        return true;
      }
    });
    // console.log(booleanCheck)
    return booleanCheck;
  };

  public render(): React.ReactElement<IFormProps> {
    // console.log(this.state.peoplePickerData, "Data..........PeoplePicker");
    // console.log(this.checkUserIsIBTes2(this.state.peoplePickerData))

    // console.log(
    //   this.state.peoplePickerData,
    //   "Data..........Reviewer PeoplePicker"
    // );
    // console.log(
    //   this.state.peoplePickerApproverData,
    //   "Data..........Approver PeoplePicker"
    // );

    return (
      <div>
        {this.state.isLoading ? (
          // <Stack
          //   tokens={stackTokens}
          //   style={{ height: "100vh", width: "100", border: "1px solid red" }}
          //   horizontalAlign="center"
          //   verticalAlign="center"
          // >
            <div
              // tokens={stackTokens}
              style={{
                height: "100vh",
                width:'100vw',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                label="Wait, wait..."
                ariaLive="assertive"
                // labelPosition="right"
              />
            </div>
          // </Stack>
        ) : (
          <div className={styles.form}>
            {/* <Header /> */}
            <Title />
            {/* {this.state.isDialogHidden&&<MyDialog  />} */}
            <MyDialog
              hidden={this.state.isDialogHidden}
              data={this.state.eCommitteData}
              handleDialogBox={this.handleDialogBox}
            />
            <ApproverOrReviewerDialog
              hidden={this.state.isApproverOrReviewerDialogHandel}
              handleDialogBox={this.handleApproverOrReviewerDialogBox}
            />

            <div className={`${styles.generalSectionMainContainer}`}>
              <h1 style={{ textAlign: "center", fontSize: "16px" }}>
                General Section
              </h1>
            </div>
            <div className={`${styles.generalSection}`}>
              {/* <div className={`${styles.generalSectionContainer1}`}> */}
              <div className={styles.halfWidth}>
                Department<span className={styles.warning}>*</span>
                <h4 style={{ marginLeft: "20px" }}>{this.state.department}</h4>
              </div>
              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                <label>
                  Committee Name
                  <SpanComponent />
                </label>

                {this.state.isWarningCommittteeName ? (
                  this.state.committeeNameFeildValue !== "" ? (
                    <DropDownList
                      // data={committename}
                      style={{
                        borderRadius: "5px", // Rounded corners
                      }}
                      data={this.state.committename}
                      onChange={this.handleCommittename}
                    />
                  ) : (
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
                  )
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
                {this.state.isWarningSubject ? (
                  this.state.subjectFeildValue ? (
                    <TextBox
                      value={this.state.subjectFeildValue}
                      onChange={this.handleSubject}
                    />
                  ) : (
                    <TextBox
                      // id="Subject"
                      // eslint-disable-next-line dot-notation
                      // value={this.state.eCommitteData["Subject"] ||""}
                      value={this.state.subjectFeildValue}
                      onChange={this.handleSubjectRed}
                      // onChange={(e)=>this.handletextBoxChange(e,"Subject")}
                      style={{
                        // border: '2px solid #4CAF50',
                        border: "2px solid red",

                        borderRadius: "5px", // Rounded corners
                      }}
                    />
                  )
                ) : (
                  <TextBox
                    value={this.state.subjectFeildValue}
                    onChange={this.handleSubject}
                  />
                )}
              </div>

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                <label>
                  Nature of Note
                  <SpanComponent />
                </label>
                {this.state.isWarningNatureOfNote ? (
                  this.state.natureOfNoteFeildValue !== "" ? (
                    <DropDownList
                      // data={committename}
                      data={this.state.natureOfNote}
                      onChange={this.handleNatureOfNote}
                    />
                  ) : (
                    <DropDownList
                      // data={committename}
                      data={this.state.natureOfNote}
                      onChange={this.handleNatureOfNoteRed}
                      style={{
                        // border: '2px solid #4CAF50',
                        border: "2px solid red",
                        borderRadius: "5px", // Rounded corners
                      }}
                    />
                  )
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
                  {this.state.isWarningNatureOfApporvalOrSanction ? (
                    this.state.natureOfApprovalOrSanctionFeildValue !== "" ? (
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
                    ) : (
                      <DropDownList
                        data={this.state.natureOfApprovalSancation} // This should be an array of objects with `text` and `value` properties
                        // textField="text"  // The field from data items to display in the dropdown
                        // dataItemKey="value"  // The field from data items to use as the key
                        onChange={this.handleNatureOfApprovalOrSanctionRed}
                        // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                        style={{
                          border: "1px solid red",
                          borderRadius: "8px",
                        }} // Inline styles
                      />
                    )
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
                {this.state.isWarningNoteType ? (
                  this.state.noteTypeFeildValue ? (
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
                  ) : (
                    <DropDownList
                      data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                      // textField="text"  // The field from data items to display in the dropdown
                      // dataItemKey="value"  // The field from data items to use as the key
                      onChange={this.handleNoteTypeRed}
                      // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                      style={{
                        border: "1px solid red",
                        borderRadius: "8px",
                      }} // Inline styles
                    />
                  )
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
                    this.state.typeOfFinancialNoteFeildValue !== "" ? (
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
                    ) : (
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
                    )
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
                  this.state.searchTextFeildValue !== "" ? (
                    <TextBox
                      onChange={this.handleSearchText}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <TextBox
                      onChange={this.handleSearchTextRed}
                      style={{
                        border: "1px solid red",
                        borderRadius: "8px",
                      }}
                    />
                  )
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
                    this.state.amountFeildValue !== 0 ? (
                      <TextBox
                        onChange={this.handleAmount}
                        style={{
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <TextBox
                        onChange={this.handleAmountRed}
                        style={{
                          border: "1px solid red",
                          borderRadius: "8px",
                        }}
                      />
                    )
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
                // (this.state.natureOfNoteFeildValue === 'Approval' || 'Information'?
                //   <div
                //   className={styles.halfWidth}
                //   style={{ margin: "4px", marginTop: "18px" }}
                // >
                //   <label>
                //     Note Type
                //     <SpanComponent />
                //   </label>
                //   {this.state.isWarningNoteType ? (
                //     this.state.noteTypeFeildValue ? (
                //       <DropDownList
                //         data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                //         // textField="text"  // The field from data items to display in the dropdown
                //         // dataItemKey="value"  // The field from data items to use as the key
                //         onChange={this.handleNoteType}
                //         // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                //         style={{
                //           border: "1px solid rgb(211, 211, 211)",
                //           borderRadius: "8px",
                //         }} // Inline styles
                //       />
                //     ) : (
                //       <DropDownList
                //         data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                //         // textField="text"  // The field from data items to display in the dropdown
                //         // dataItemKey="value"  // The field from data items to use as the key
                //         onChange={this.handleNoteTypeRed}
                //         // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                //         style={{
                //           border: "1px solid red",
                //           borderRadius: "8px",
                //         }} // Inline styles
                //       />
                //     )
                //   ) : (
                //     <DropDownList
                //       data={this.state.noteType} // This should be an array of objects with `text` and `value` properties
                //       // textField="text"  // The field from data items to display in the dropdown
                //       // dataItemKey="value"  // The field from data items to use as the key
                //       onChange={this.handleNoteType}
                //       // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                //       style={{
                //         border: "1px solid rgb(211, 211, 211)",
                //         borderRadius: "8px",
                //       }} // Inline styles
                //     />
                //   )}
                // </div>:

                // )
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  <label style={{ fontWeight: "600" }}>
                    Purpose
                    <SpanComponent />
                  </label>
                  {this.state.isWarningPurposeField ? (
                    this.state.puroposeFeildValue !== "" ? (
                      <TextBox
                        onChange={this.handlePurpose}
                        style={{
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <TextBox
                        onChange={this.handlePurposeRed}
                        style={{
                          border: "1px solid red",
                          borderRadius: "8px",
                        }}
                      />
                    )
                  ) : (
                    <TextBox
                      onChange={this.handlePurpose}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  )}
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
                    <PeoplePicker
                      placeholder="Reviewer Details"
                      context={this._peopplePicker}
                      // titleText="People Picker"
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      defaultSelectedUsers={[""]}
                      disabled={false}
                      ensureUser={true}
                      onChange={this._getPeoplePickerItems}
                      // showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
                    />
                    {/* <PeoplePicker /> */}
                    <DefaultButton
                      type="button"
                      className={`${styles.commonBtn2} ${styles.addBtn}`}
                      onClick={(e) => this.handleOnAdd(e, "reveiwer")}
                      iconProps={{ iconName: "Add" }}
                    >
                      Add
                    </DefaultButton>
                  </div>
                  <span style={{ color: "blue" }}>
                    (Please enter minimum character to search)
                  </span>
                </div>
              </div>
              <div className={`${styles.tableContainer}`}>
                {/* <TableComponent /> */}
                {this.state.isWarningPeoplePicker ? (
                  this.state.peoplePickerData.length === 0 ? (
                    <div style={{ border: "1px solid red" }}>
                      <DraggableTable
                        data={this.state.peoplePickerData}
                        reOrderData={this.reOrderData}
                        removeDataFromGrid={this.removeDataFromGrid}
                        type="Reviewer"
                      />
                    </div>
                  ) : (
                    <div>
                      <DraggableTable
                        data={this.state.peoplePickerData}
                        reOrderData={this.reOrderData}
                        removeDataFromGrid={this.removeDataFromGrid}
                        type="Reviewer"
                      />
                    </div>
                  )
                ) : (
                  <div>
                    <DraggableTable
                      data={this.state.peoplePickerData}
                      reOrderData={this.reOrderData}
                      removeDataFromGrid={this.removeDataFromGrid}
                      type="Reviewer"
                    />
                  </div>
                )}

                {/* <MultiComboBoxTable/>/ */}
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
                    <PeoplePicker
                      placeholder="Approver Details"
                      context={this._peopplePicker}
                      // titleText="People Picker"
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      defaultSelectedUsers={[""]}
                      disabled={false}
                      ensureUser={true}
                      onChange={this._getPeoplePickerItemsApporvers}
                      // showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
                    />
                    {/* <PeoplePicker /> */}
                    <DefaultButton
                      type="button"
                      className={`${styles.commonBtn2} ${styles.addBtn}`}
                      onClick={(e) => this.handleOnAdd(e, "approver")}
                      iconProps={{ iconName: "Add" }}
                    >
                      Add
                    </DefaultButton>
                  </div>
                  <span style={{ color: "blue" }}>
                    (Please enter minimum character to search)
                  </span>
                </div>
              </div>
              <div className={`${styles.tableContainer}`}>
                <div className={`${styles.tableContainer}`}>
                  {/* <TableComponent /> */}
                  {this.state.isWarningPeoplePicker ? (
                    this.state.peoplePickerData.length === 0 ? (
                      <div style={{ border: "1px solid red" }}>
                        <DraggableTable
                          data={this.state.peoplePickerApproverData}
                          reOrderData={this.reOrderData}
                          removeDataFromGrid={this.removeDataFromGrid}
                          type="Approver"
                        />
                      </div>
                    ) : (
                      <div>
                        <DraggableTable
                          data={this.state.peoplePickerApproverData}
                          reOrderData={this.reOrderData}
                          removeDataFromGrid={this.removeDataFromGrid}
                          type="Approver"
                        />
                      </div>
                    )
                  ) : (
                    <div>
                      <DraggableTable
                        data={this.state.peoplePickerApproverData}
                        reOrderData={this.reOrderData}
                        removeDataFromGrid={this.removeDataFromGrid}
                        type="Approver"
                      />
                    </div>
                  )}

                  {/* <MultiComboBoxTable/>/ */}
                </div>
              </div>
            </div>
            <div className={`${styles.generalSectionMainContainer}`}>
              <h1 style={{ textAlign: "center", fontSize: "16px" }}>
                File Attachments
              </h1>
            </div>
            <div
              style={{
                display: "flex",

                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
              className={`${styles.generalSectionApproverDetails}`}
            >
              <div className={`${styles.fileInputContainers}`}>
                <p className={styles.label} style={{ margin: "0px" }}>
                  Note PDF<span className={styles.warning}>*</span>
                </p>
                {this.state.isWarningNoteToFiles ? (
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid red",
                      margin: "0px",
                    }}
                  >
                    <UploadFileComponent
                      typeOfDoc="notePdF"
                      onChange={this.handleNoteToFileChange}
                      accept=".pdf"
                      multiple={false}
                      maxFileSizeMB={10}
                      maxTotalSizeMB={10}
                    />
                  </div>
                ) : (
                  <div style={{ width: "100%", margin: "0px" }}>
                    <UploadFileComponent
                      typeOfDoc="notePdF"
                      onChange={this.handleNoteToFileChange}
                      accept=".pdf"
                      multiple={false}
                      maxFileSizeMB={10}
                      maxTotalSizeMB={10}
                    />
                  </div>
                )}

                <p
                  className={styles.message}
                  style={{ textAlign: "right", margin: "0px" }}
                >
                  Allowed only one PDF. Up to 10MB max.
                </p>
              </div>

              {this.checkUserIsIBTes2(
                this.state.peoplePickerData,
                this.state.peoplePickerApproverData
              ) ? (
                <div className={`${styles.fileInputContainers}`}>
                  <p className={styles.label} style={{ margin: "0px" }}>
                    Word Document <span className={styles.warning}>*</span>
                  </p>
                  {this.state.isWarningWordDocumentFiles ? (
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid red",
                        margin: "0px",
                      }}
                    >
                      <UploadFileComponent
                        typeOfDoc="supportingDocument"
                        onChange={this.handleWordDocumentFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple={false}
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                      />
                    </div>
                  ) : (
                    <div style={{ width: "100%", margin: "0px" }}>
                      <UploadFileComponent
                        typeOfDoc="supportingDocument"
                        onChange={this.handleWordDocumentFileChange}
                        accept=".doc,.docx"
                        multiple={false}
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                      />
                    </div>
                  )}

                  <p className={styles.message} style={{ margin: "0px" }}>
                    Allowed Formats (doc,docx only) Upto 10MB max.
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className={`${styles.fileInputContainers}`}>
                <p className={styles.label} style={{ margin: "0px" }}>
                  Supporting Documents
                </p>
                {this.state.isWarningSupportingDocumentFiles ? (
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid red",
                      margin: "0px",
                    }}
                  >
                    <UploadFileComponent
                      typeOfDoc="supportingDocument"
                      onChange={this.handleSupportingFileChange}
                      accept=".xlsx,.pdf,.doc,.docx"
                      multiple={true}
                      maxFileSizeMB={25}
                      maxTotalSizeMB={25}
                    />
                  </div>
                ) : (
                  <div style={{ width: "100%", margin: "0px" }}>
                    <UploadFileComponent
                      typeOfDoc="supportingDocument"
                      onChange={this.handleSupportingFileChange}
                      accept=".xlsx,.pdf,.doc,.docx"
                      multiple={true}
                      maxFileSizeMB={25}
                      maxTotalSizeMB={25}
                    />
                  </div>
                )}

                <p className={styles.message} style={{ margin: "0px" }}>
                  Allowed Formats (pdf,doc,docx,xlsx only) Upto 25MB max.
                </p>
              </div>
            </div>

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
        )}
      </div>
    );
  }
}
