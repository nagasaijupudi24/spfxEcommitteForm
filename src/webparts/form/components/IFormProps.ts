// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { WebPartContext } from "@microsoft/sp-webpart-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { SPFI } from "@pnp/sp";

export interface IFormProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  // context:WebPartContext;
  // sp: SPFI; // Pass the configured sp object
}
