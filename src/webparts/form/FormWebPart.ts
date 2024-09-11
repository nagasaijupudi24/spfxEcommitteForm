/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FormWebPartStrings';
import Form from './components/uiComponents/Form';
import ViewForm from './components/uiComponents/view';
import { IFormProps } from './components/IFormProps';
import { IViewFormProps } from './components/IViewFormProps';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs"; // Import webs functionality
import "@pnp/sp/lists"; // Import lists functionality
import "@pnp/sp/items"; // Import items functionality
import { AllRequest } from './components/uiComponents/allRequest';

export interface IFormWebPartProps {
  FormType: string;
  description: string;
  listId:any;
  libraryId:any;
}

export {};
declare global {
  interface Window {
      AdobeDC: any;
  }
}


export default class FormWebPart extends BaseClientSideWebPart<IFormWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private sp: ReturnType<typeof spfi>;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.sp = spfi().using(SPFx(this.context));

    this._environmentMessage = await this._getEnvironmentMessage();
  }

  public render(): void {
    let element: React.ReactElement<IFormProps> | React.ReactElement<IViewFormProps> | null = null;

    if (this.properties.FormType === "New") {
      element = React.createElement(
        Form,
        {
          description: this.properties.description,
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName,
          sp: this.sp, // Pass the configured sp object
          context: this.context, // Pass the WebPartContext
          listId:this.properties.listId,
          libraryId:this.properties.libraryId
        }
      );
     
    }
    else if (this.properties.FormType === "View") {
      element = React.createElement(
        ViewForm,
        {
          description: this.properties.description,
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName,
          sp: this.sp, // Pass the configured sp object
          context: this.context, // Pass the WebPartContext
          listId:this.properties.listId,
          libraryId:this.properties.libraryId
        }
      );
     
    }
    else if (this.properties.FormType === "allRequest") {
      element = React.createElement(
        AllRequest,
        {
          description: this.properties.description,
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName,
          sp: this.sp, // Pass the configured sp object
          context: this.context, // Pass the WebPartContext
          listId:this.properties.listId,
          libraryId:this.properties.libraryId
        }
      );
     
    }
      

    if (element !== null) {
      ReactDom.render(element, this.domElement);
    }
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged = async (propertyPath: string, oldValue: any, newValue: any): Promise<void> => {
    console.log(newValue,"---New Value, ",propertyPath,"---Propery path")
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === "listId" && newValue) {
      console.log(`"Entered into ${newValue.title}"`)
      // this._listId = newValue;
      this.properties.listId = newValue.title
      // this.properties.customOptions = await this._spService.getcolumnInfo(this._listId.title);
      
      this.render();
      console.log("render is triggered")
      // this.context.propertyPane.refresh();
      // console.log("refresh is triggered")
    } 
    else if (propertyPath === "libraryId" && newValue) {
      console.log(`"Entered into ${newValue.title}"`)
      // this._listId = newValue;
      this.properties.libraryId = newValue.title
      // this.properties.customOptions = await this._spService.getcolumnInfo(this._listId.title);
      
      this.render();
      console.log("render is triggered")
      // this.context.propertyPane.refresh();
      // console.log("refresh is triggered")
    }
    else if (propertyPath === "FormType" && newValue) {
      console.log(`"Entered into ${newValue}"`)
      // this._listId = newValue;
      this.properties.libraryId = newValue
      // this.properties.customOptions = await this._spService.getcolumnInfo(this._listId.title);
      
      this.render();
      console.log("render is triggered")
      // this.context.propertyPane.refresh();
      // console.log("refresh is triggered")
    } 
    
    this.context.propertyPane.refresh();
  }
  

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('FormType', {
                  label: "FormType",
                  selectedKey: 'New',
                  options: [
                    { key: 'New', text: 'New' },
                    { key: 'View', text: 'View' },
                    { key: 'Edit', text: 'Edit' },
                    { key: 'allRequest', text: 'All Request' }

                  ]
                }),
                PropertyFieldListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
                  includeHidden: true,
                  includeListTitleAndUrl: true,
                  orderBy: PropertyFieldListPickerOrderBy.Id,
                  disabled: false,
                  baseTemplate: 100,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  // onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  multiSelect: false,
                }),
                PropertyFieldListPicker('libraryId', {
                  label: 'Select a Library',
                  selectedList: this.properties.listId,
                  includeHidden: true,
                  includeListTitleAndUrl: true,
                  orderBy: PropertyFieldListPickerOrderBy.Id,
                  disabled: false,
                  baseTemplate: 101,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  // onGetErrorMessage: null,/
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  multiSelect: false,
                }),
              ]
            },
            
          ]
        }
      ]
    };
  }
}