/* eslint-disable @typescript-eslint/no-unused-vars */
// MyDialog.tsx
import * as React from "react";
import {
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  Stack,
  
  // IStackItemStyles, 
  IStackStyles,
  Icon 
} from "@fluentui/react";

interface MyDialogProps {
  hidden: boolean;
  handleDialogBox: () => void;
  
  // undefindedData:any;
}



const ApproverOrReviewerDialog: React.FC<MyDialogProps> = ({
  hidden,
 
  handleDialogBox,
}) => {
  // console.log(data);
  // const [undefinedData, setUndefinedData] = React.useState<string[]>([]);

  const stackStyles: IStackStyles = {
    root: {
      display: 'flex',
      flexDirection: 'row', // or 'column' for vertical stacking
      // background: '#f3f2f1',
      padding: 10,
      borderBottom: '1px solid #ddd',
      justifyContent: 'space-between', // Adjust as needed
      alignItems: 'center', // Adjust as needed
    },
  };

  const buttonStyles: IStackStyles = {
    root:{
      background:'red'
    }
  }

  
  // console.log(emptyArray)
  // console.log(undefinedData);

  return (
    <Dialog
    hidden={hidden}
    //   onDismiss={onClose}
    dialogContentProps={{
      type: DialogType.largeHeader,
      // title: "Sample Dialog",
      // subText: "This is a sample dialog using Fluent UI.",
    }}
    modalProps={{
      isBlocking: true,
    }}
  >
     <Stack>
      <Stack styles={stackStyles}>
        <p>Alert!</p>
  
        <Icon iconName="Cancel" onClick={handleDialogBox}/>
        
      </Stack>
     
    </Stack>
    <h1>Data already Exist in Reviewer Table or Approver Table</h1>
    <DialogFooter>
      <PrimaryButton text="OK" onClick={handleDialogBox} styles={buttonStyles}/>
      {/* <DefaultButton  text="Cancel" /> */}
    </DialogFooter>
  </Dialog>
   
  );
};

export default ApproverOrReviewerDialog;
