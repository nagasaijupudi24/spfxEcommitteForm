// import * as React from 'react';

// import spService from './spServices';

// import { spfi, SPFx } from '@pnp/sp';
// import "@pnp/sp/webs";
// import "@pnp/sp/items";
// import "@pnp/sp/folders";
// import "@pnp/sp/lists";
// import "@pnp/sp/site-groups/web";
// import "@pnp/sp/files";
// import "@pnp/sp/profiles";
// import "@pnp/sp/site-groups";

// // import { escape } from '@microsoft/sp-lodash-subset';



// export interface IFormState {
//     items: any[];
//   }

// export default class CreateForm extends React.Component<IFormState> {
//     private _spService: spService = null;
    

//     constructor(props: IFormState) {
//         super(props);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any


//         this.state = {
//             fieldCollection: [],
//             Data: {},
//             YesOrNo: {},
//             approverFields: [],
//             approversEmail: {},
//             configApprover: [],
//             attachfiles: [],
//             checkboxItems: [],
//             Approver1: [],
//             Approver2: [],
//             Approver3: [],
//             Approver4: [],
//             Approver5: [],
//             Approver6: [],
//             Approver7: [],
//             Approver8: [],
//             Approver9: [],
//             FullName: "",
//             userDepartment: "",
//             pictureUrl: "",
//             firstName: "",
//             lastName: "",
//             reqRole: "",
//             imageinitials: "",
//             hideDialog: true,
//             AlertMsg: [],
//             isDIBIssuer: false,
//             ApprGrpUsr: [],
//             isSpecifySelected: {},
//             SpecifyOwnvalues: {}
//             // BoardAppr: []
//         }

//         this._sp = spfi().using(SPFx(this.props.context))
//         this._spService = new spService(this.props.context);
       

  
  
//     public formInput = async (): Promise<void> => {
//          await this._spService.getfieldDetails(this.props.listName)
//     }

   

//     public render(): React.ReactElement<IFormState> {
//         return <div>
//             List Visablity
//         </div>
//     }
// }
