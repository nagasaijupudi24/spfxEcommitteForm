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
  data: any;
  // undefindedData:any;
}



const MyDialog: React.FC<MyDialogProps> = ({
  hidden,
  data,
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

  const undefinedData = Object.keys(data).filter((each: string) => {
    // console.log(each)

    if (data[each] === "") {
      // console.log(each)
      return each;
    }else if (data[each].length === 0){
      return each
    }
  });
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
    <ul>
      {undefinedData.map((each) =>{
        console.log(each)
        if (each!== "supportingDocumentfiles") {
          return (
        
            <li key={each}>{each}</li>
          )

        }
        
      } )}
    </ul>
    <DialogFooter>
      <PrimaryButton text="OK" onClick={handleDialogBox} styles={buttonStyles}/>
      {/* <DefaultButton  text="Cancel" /> */}
    </DialogFooter>
  </Dialog>
   
  );
};

export default MyDialog;
