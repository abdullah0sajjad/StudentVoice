import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useMutation } from 'react-query';
import axios from 'axios';
import { queryClient } from '../../reactQuery';
import { useSelector } from 'react-redux';

export default function MarkAsAllReadBtn() {
  const [showDelDialog, setShowDelDialog] = useState(false);
  const {user, token} = useSelector((state)=> state.AuthReducers);

  const mutation = useMutation(
    async ({userId}) => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      } 
      const response = await axios.post(`/mark-as-all-read-notification/${userId}`, {userId}, config);
      return response.data;
    },
    {
      onSuccess: ()=>{
        queryClient.invalidateQueries('allUserNotification');
        queryClient.invalidateQueries('UserNotification');
      },
      onError: (error)=>{
        console.log(error)
      }
    }
  ); 

  const accept = async () => {
    mutation.mutate({userId:user._id});
  }

  const reject = () => {
    setShowDelDialog(false);
  }
  return (
    <div>
        <ConfirmDialog 
          message= 'Would you like to mark all notifications as read?' 
          header= 'Confirmation'
          icon= 'pi pi-info-circle'
          acceptClassName= 'p-button-danger px-5'
          accept= {accept}
          reject= {reject}
          acceptLabel= 'Yes'
          visible={showDelDialog} onHide={() => setShowDelDialog(false)}
        />
        <Button label='Mark As All Read' className='w-12rem md:w-13rem lg:w-14rem xl:w-15rem border-none text-xs lg:text-sm xl:text-sm px-4' style={{backgroundColor: '#222d82'}} onClick={()=> setShowDelDialog(true)}/>
    </div>
  )
}
