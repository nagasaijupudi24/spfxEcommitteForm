/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
import * as React from "react";
import { IViewFormProps } from "../IViewFormProps"; // Ensure this file exists
import { IDropdownOption } from "office-ui-fabric-react";
import { Stack, IconButton, Text } from "@fluentui/react";
import styles from "../Form.module.scss";

export interface IFileDetails {
  name?: string;
  content?: File;
  index?: number;
  fileUrl?: string;
  ServerRelativeUrl?: string;
  isExists?: boolean;
  Modified?: string;
  isSelected?: boolean;
}

export interface IViewFormState {
  expandSections: { [key: string]: boolean };
  pdfLink: string;
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
  noteTofiles: any[];
  isWarningNoteToFiles: boolean;

  wordDocumentfiles: any[];
  isWarningWordDocumentFiles: boolean;

  supportingDocumentfiles: any[];
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
  filesClear: any;
}

const getIdFromUrl = (): any => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("id");
  // console.log(Id);
  return Id;
};

const getFromType = (): any => {
  const params = new URLSearchParams(window.location.search);
  const formType = params.get("type");
  // console.log(Id);
  return formType;
};

export default class ViewForm extends React.Component<
  IViewFormProps,
  IViewFormState
> {
  private _itemId: number = Number(getIdFromUrl());
  private _formType: string = getFromType();
  private _absUrl: any = this.props.context.pageContext.web.serverRelativeUrl;
  private _folderName: string = `${this._absUrl}/${
    this.props.libraryId
  }/${this._folderNameGenerate(this._itemId)}`;

  constructor(props: IViewFormProps) {
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
      eCommitteData: [],
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
      filesClear: [],
      expandSections: {}, // Keeps track of expanded sections
      pdfLink:
        "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
    };
    console.log(this._itemId);
    console.log(this._formType);
    this._getItemData(this._itemId, this._folderName);
    this._getItemDocumentsData();
  }

  public _folderNameGenerate(id: any): any {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `AD1/${currentyear}-${nextYear}/C${id}`;
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }

  private _getJsonifyReviewer = (item: any, type: string): any[] => {
    console.log(item);
    console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === 1) {
        console.log(each, "Reviewer data.................parsed item");
        return each;

        // this.setState(prev =>(
        //   {peoplePickerData:[...prev.peoplePickerData,{
        //     text:each.approverEmailName,
        //     srNo:each.approverEmailName,
        //     designation:each.designation,

        //   }]}
        // ))
      }
    });
    console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName,
      optionalText: each.designation,
      id: each.id,
      approverType: 1,
    }));
    console.log(approverData);
    // this.setState(()=>{
    //   console.log("State updated")
    //   return {peoplePickerApproverData:approverData}
    // })
    // if ()
    return approverData;
  };

  private _getJsonifyApprover = (item: any, type: string): any[] => {
    console.log(item);
    console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === 2) {
        console.log(each, "Approver data.................parsed item");
        return each;

        // this.setState(prev =>(
        //   {peoplePickerData:[...prev.peoplePickerData,{
        //     text:each.approverEmailName,
        //     srNo:each.approverEmailName,
        //     designation:each.designation,

        //   }]}
        // ))
      }
    });
    console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName,
      designation: each.designation,
      id: each.id,
      approverType: 2,
    }));
    console.log(approverData);
    // this.setState(()=>{
    //   console.log("State updated")
    //   return {peoplePickerApproverData:approverData}
    // })
    // if ()
    return approverData;
  };

  private _extractValueFromHtml = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const extractedValue = doc.querySelector("div")?.textContent || "";
    console.log(extractedValue);
    return extractedValue;
  };

  private _getItemData = async (id: any, folderPath: any) => {
    const item: any = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(id)();
    console.log(`${id} ------Details`, item);
    console.log(folderPath);
    // const folderItem =  await this.props.sp.web.getFolderByServerRelativePath(`${folderPath}/Pdf`)
    // .files().then(res => res);
    // console.log(folderItem)
    console.log(this._getJsonifyReviewer(item.ApproverDetails, "Reviewer"));
    console.log(this._getJsonifyApprover(item.ApproverDetails, "Approver"));

    this.setState({
        eCommitteData:[
            {
                tableData:[
                    item.CommitteeName !== null && {column1 : "CommitteeName",column2:`${item.CommitteeName}`},
                    item.Subject !== null && {column1 : "Subject",column2:`${item.Subject}`},
                    item.natureOfNote !== null && {column1 : "NatureOfNote",column2:`${item.natureOfNote}`},
                    item.NoteType !== null && {column1 : "NoteType",column2:`${item.NoteType}`},
                    item.NatuerOfApprovalSanction !== null && {column1 : "NatuerOfApprovalSanction",column2:`${item.NatuerOfApprovalSanction}`},


                    item.TypeOfFinancialNote !== null && {column1 : "TypeOfFinancialNote",column2:`${item.TypeOfFinancialNote}`},
                    item.Search_x0020_Keyword !== null && {column1 : "Search Keyword",column2:`${this._extractValueFromHtml(item.Search_x0020_Keyword)}`},
                    item.Amount !== null && {column1 : "Amount",column2:`${item.Amount}`},
                    item.Purpose !== null && {column1 : "Purpose",column2:`${item.Purpose}`},
                    

                ]
            }
        ]
    })


    this.setState({
      committeeNameFeildValue:
        item.CommitteeName !== null ? item.CommitteeName : "",
      subjectFeildValue: item.Subject !== null ? item.Subject : "",
      natureOfNoteFeildValue:
        item.natureOfNote !== null ? item.natureOfNote : "",
      noteTypeFeildValue: item.NoteType !== null ? item.NoteType : "",
      natureOfApprovalOrSanctionFeildValue:
        item.NatuerOfApprovalSanction !== null
          ? item.NatuerOfApprovalSanction
          : "",
      typeOfFinancialNoteFeildValue:
        item.TypeOfFinancialNote !== null ? item.TypeOfFinancialNote : "",
      searchTextFeildValue:
        item.Search_x0020_Keyword !== null
          ? this._extractValueFromHtml(item.Search_x0020_Keyword)
          : "",
      amountFeildValue: item.Amount !== null ? item.Amount : "",
      puroposeFeildValue: item.Purpose !== null ? item.Purpose : "",
      // peoplePickerData:this._getUserDetailsById(item.ReviewerId,"Reviewer"),
      peoplePickerData: this._getJsonifyReviewer(
        item.ApproverDetails,
        "Reviewer"
      ),
      peoplePickerApproverData: this._getJsonifyApprover(
        item.ApproverDetails,
        "Approver"
      ),
    });
  };

  private _getFileObj = (data: any): any => {
    const tenantUrl = window.location.protocol + "//" + window.location.host;
    console.log(tenantUrl);

    const filesObj = {
      name: data.Name,
      content: data,
      index: 0,
      fileUrl: tenantUrl + data.ServerRelativeUrl,
      ServerRelativeUrl: "",
      isExists: true,
      Modified: "",
      isSelected: false,
      size: parseInt(data.Length),
      type: `application/${data.Name.split(".")[1]}`,
    };
    return filesObj;
  };

  private _getItemDocumentsData = async () => {
    try {
      console.log("------------------Pdf-----------------------------------");

      console.log(`${this._folderName}/Pdf`);
      const folderItemsPdf = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/Pdf`)
        .files()
        .then((res) => res);
      console.log(folderItemsPdf);
      console.log(folderItemsPdf[0]);
      // this.setState({noteTofiles:[folderItem]})

      const tempFilesPdf: IFileDetails[] = [];
      folderItemsPdf.forEach((values) => {
        tempFilesPdf.push(this._getFileObj(values));
      });
      console.log(tempFilesPdf);
      this.setState({ noteTofiles: tempFilesPdf });

      //Word Documents
      console.log(
        "------------------Word Document-----------------------------------"
      );
      console.log(`${this._folderName}/WordDocument`);
      const folderItemsWordDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/WordDocument`)
        .files()
        .then((res) => res);
      console.log(folderItemsWordDocument);
      console.log(folderItemsWordDocument[0]);

      const tempFilesWordDocument: IFileDetails[] = [];
      folderItemsWordDocument.forEach((values) => {
        tempFilesWordDocument.push(this._getFileObj(values));
      });
      console.log(tempFilesWordDocument);
      this.setState({ wordDocumentfiles: tempFilesWordDocument });

      //supporting documents
      console.log(
        "------------------Supporting Document-----------------------------------"
      );

      console.log(`${this._folderName}/SupportingDocument`);
      const SupportingDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/SupportingDocument`)
        .files()
        .then((res) => res);
      console.log(SupportingDocument);
      console.log(SupportingDocument[0]);

      const tempFilesSupportingDocument: IFileDetails[] = [];
      SupportingDocument.forEach((values) => {
        tempFilesSupportingDocument.push(this._getFileObj(values));
      });
      console.log(tempFilesSupportingDocument);
      this.setState({ supportingDocumentfiles: tempFilesSupportingDocument });
    } catch {
      console.log("failed to fetch");
    }
  };

  private _onToggleSection = (section: string): void => {
    this.setState((prevState) => ({
      expandSections: {
        ...prevState.expandSections,
        [section]: !prevState.expandSections[section],
      },
    }));
  };

  private _renderTable = (tableData: any[]): JSX.Element => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) =>{
            console.log("-------------------------")
            console.log(row.column1)
            console.log(row.column2 !== null )
            console.log("-------------------------")
            return (
                row.column2 !==  undefined && <tr key={index}>
                  <td><strong>{row.column1}</strong></td>
                  <td>{row.column2}</td>
                </tr>
              )
          } )}
        </tbody>
      </table>
    );
  };

  private _renderPDFView = (): JSX.Element => {
    const { pdfLink } = this.state;
    return (
      <div className={styles.pdfViewer}>
        <iframe
          src={pdfLink}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        />
      </div>
    );
  };

  public render(): React.ReactElement<IViewFormProps> {
    console.log(this.state);
    const { expandSections } = this.state;
    // const data = [
    //   {
    //     tableData: [
    //       { column1: "Row 1, Cell 1", column2: "Row 1, Cell 2" },
    //       { column1: "Row 2, Cell 1", column2: "Row 2, Cell 2" },
    //     ],
    //     pdfLink:
    //       "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
    //   },
    //   {
    //     tableData: [
    //       { column1: "Row 1, Cell 1", column2: "Row 1, Cell 2" },
    //       { column1: "Row 2, Cell 1", column2: "Row 2, Cell 2" },
    //     ],
    //     pdfLink:
    //       "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
    //   },
    // ];

    return (
      <Stack tokens={{ childrenGap: 10 }} className={styles.viewForm}>
        <h2>View Form</h2>
        <div style={{ display: "flex",justifyContent:'flex-start',alignItems:'center',gap:'10px',height:'100%',border:'1px solid yellow' }}>
          
          <div style={{width:'40%',height:'100%',border:'1px solid red'}}>
            {this.state.eCommitteData?.map((item:any, index:any) => {
              console.log(item);
              return (
                <div key={index} className={styles.sectionContainer}>
                  <div
                    className={styles.header}
                    onClick={() => this._onToggleSection(`section${index}`)}
                  >
                    <Text className={styles.sectionText}>{`Section ${
                      index + 1
                    }`}</Text>
                    <IconButton
                      iconProps={{
                        iconName: expandSections[`section${index}`]
                          ? "ChevronUp"
                          : "ChevronDown",
                      }}
                      title="Expand/Collapse"
                      ariaLabel="Expand/Collapse"
                      className={styles.chevronIcon}
                    />
                    
                  </div>
                  {expandSections[`section${index}`] && (
                    <>
                      {this._renderTable(item.tableData)}
                     
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{height:'100%',width:'60%',border:'1px solid blue'}}>{this.state.pdfLink && this._renderPDFView()}</div>
        </div>
      </Stack>
    );
  }
}
