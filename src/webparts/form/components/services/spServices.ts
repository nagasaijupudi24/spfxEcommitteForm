// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { spfi, SPFx } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import "@pnp/sp/fields";
// import "@pnp/sp/views";
// import "@pnp/sp/items/get-all";
// import "@pnp/sp/files";
// import "@pnp/sp/folders";



// export default class spService {
//     private _sp;
//     constructor(private context: WebPartContext) {
//         this._sp = spfi().using(SPFx(this.context))
//     }

//     public getfieldDetails = async (listName: string): Promise<{ key?: string; text?: string; dataType: string, option?: string[]; internalName: string }[]> => {
//         const temp: { key: string; text: string; dataType: string, option?: any[]; internalName: string;DefaultValue?:any;FillInChoice?:boolean }[] = []
//         await this._sp.web.lists.getByTitle(listName).fields.filter(" Hidden eq false and ReadOnlyField eq false")().then(field =>{
//             console.log(field,"fileds")
            
//         });
//         // console.log(temp)
//         return temp
//     }

  
// }