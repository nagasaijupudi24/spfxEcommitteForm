import { DetailsList } from '@fluentui/react';
import * as React from 'react';
// import { IFormProps } from '../IFormProps';

import { IAllRequestProps } from '../IAllRequestProps';


export interface IAllRequestStateProps{
    listItems:any
}


export class AllRequest extends React.Component<IAllRequestProps,IAllRequestStateProps>{
    constructor(props:IAllRequestProps){
        console.log("Constructor called")
        super(props);
        this.state={
            listItems:''
        }
    }


    public render():any{
        return <div>
            <div>All Request Form</div>
            <DetailsList items={[]}/>

        </div> 

    }

}