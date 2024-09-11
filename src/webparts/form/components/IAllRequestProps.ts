import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";



export interface IAllRequestProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    sp: SPFI; // Pass the configured sp object
    context: WebPartContext; // Pass the WebPartContext
    listId:any;
    libraryId:any;
  }


  