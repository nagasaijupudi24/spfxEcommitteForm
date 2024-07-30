// MyDialog.tsx
import * as React from 'react';
import { Dialog, DialogFooter, DialogType, PrimaryButton, DefaultButton } from '@fluentui/react';

interface MyDialogProps {
  hidden: boolean;
//   onClose: () => void;
}

const MyDialog: React.FC<MyDialogProps> = ({ hidden }) => {
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
      <DialogFooter>
        <PrimaryButton  text="OK" />
        <DefaultButton  text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default MyDialog;
