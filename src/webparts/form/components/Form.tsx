import * as React from 'react';
import styles from './Form.module.scss';
import { SPFI } from "@pnp/sp";
import { IFormProps } from './IFormProps';
import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react'; 
import TableComponent from './uiComponents/tableSwap';
import UploadFileComponent from './uiComponents/uploadFile';
import Header from './uiComponents/Header/header';
import Title from './uiComponents/titleSectionComponent/title';
import SpanComponent from './uiComponents/spanComponent/spanComponent';
import GetForm from './spListGet/spListGet';

interface IMainFormState {
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
}

export default class Form extends React.Component<IFormProps, IMainFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isNoteType: false,
      noteTypeValue: undefined,
    };
  }

  private handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
    console.log(typeof item);
    // const {text} = item 
    // console.log(text)
    this.setState({ noteTypeValue: item }); // Update state with selected item
  };

  public render(): React.ReactElement<IFormProps> {
    const options = [
      { key: '1', text: 'Financial' },
      { key: '2', text: 'Non Financial' },
      // Add more options as needed
    ];

    const noteTypeOptions = [
      { key: '1', text: 'Financial' },
      { key: '2', text: 'Non Financial' },
      // Add more options as needed
    ];

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
        <GetForm description={''} isDarkTheme={false} environmentMessage={''} hasTeamsContext={false} userDisplayName={''} sp={new SPFI}/>
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
                options={noteTypeOptions}
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
                options={options}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Nature of Note<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                options={options}
                styles={{ title: { border: '1px solid rgb(211, 211, 211)' } }}
              />
            </div>
            <div style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Type of Financial Note<SpanComponent />
              </label>
              <Dropdown
                placeholder="Select an option"
                options={options}
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
