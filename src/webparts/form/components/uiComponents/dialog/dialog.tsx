// MyDialog.tsx
import * as React from 'react';
import { Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react';

interface MyDialogProps {
  hidden: boolean;
  handleDialogBox: () => void;
  data:any;
  // undefindedData:any;
}

const MyDialog: React.FC<MyDialogProps> = ({ hidden,data,handleDialogBox }) => {

  console.log(data)
  // const [undefinedData, setUndefinedData] = React.useState<string[]>([]);


  

   const undefinedData = Object.keys(data).filter((each:string)=>{
    // console.log(each)
    if (data[each]===""){
      // console.log(each)
      return each
      

    }
  })
  // console.log(emptyArray)
  console.log(undefinedData)

  return (
    <Dialog
      hidden={hidden}
    //   onDismiss={onClose}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: 'Sample Dialog',
        subText: 'This is a sample dialog using Fluent UI.',
      }}
      modalProps={{
        isBlocking: true,
      }}
    >
      <ul>
        {undefinedData.map(each=><li key={each}>{each}</li>)}
      </ul>
      <DialogFooter>

        
        <PrimaryButton  text="OK" onClick={handleDialogBox}/>
        {/* <DefaultButton  text="Cancel" /> */}
      </DialogFooter>
    </Dialog>
  );
};

export default MyDialog;
