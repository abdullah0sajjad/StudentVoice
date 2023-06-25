import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Loader from '../OtherComponent/Loader';
import { Menu } from 'primereact/menu';
import { queryClient } from '../../reactQuery';

export default function NotificationBar() {

  const [notificationUsers , setNotificationUser] = useState([]);
  const [notifyId , setNotifyId] = useState('');
  const [users , setUsers] = useState([]);
  const {user, token} = useSelector((state)=> state.AuthReducers);

  const {isLoading, data} = useQuery('allUserNotification', async ()=>{
    await axios.get(`/all-user-notification/${user._id}`)
    .then(response => {
        setNotificationUser(response.data.response);
    })
    .catch(error => {
        console.error(error);
    });
  });
  
  const {isLoading: loadingComment, data: allusers} = useQuery('allUsers', async ()=>{
    await axios.get('/all-users', { cache: 'default' })
    .then(response => {
       setUsers(response.data.response)
       return response.data.response
     })
     .catch(error => {
       console.error(error);
     });
   });

   const mutationMarkAsRead = useMutation(
    async ({userId}) => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      } 
      const response = await axios.post(`/mark-as-read-notification/${userId}`, {notifyId}, config);
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

  const mutationRemove = useMutation(
    async ({userId}) => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      } 
      const response = await axios.post(`/remove-notification/${userId}`, {notifyId}, config);
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

   const menu = useRef(null);
    

  return (
    <>
      {!isLoading && !loadingComment ? Object.keys(notificationUsers).length !== 0 && Object.keys(users).length !== 0 ?
        notificationUsers.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)).map(notify =>{
           // Find the user data for the current notification
           const matchedUser = users.find((user) => user._id === notify.notificationUser);

           const items =
        [
        {
            label: 'Mark as Read',
            command: () => {
              mutationMarkAsRead.mutate({userId:user._id});
            }
        },
        {
            label: 'Remove Notification',
            command: () =>{
              mutationRemove.mutate({userId:user._id});
            }
        } ];

          return (
            <>
            {Object.keys(matchedUser).length !== 0 ?
              <Card key={notify._id} className={notify.isRead ? `w-12 p-2 pb-1 mb-2` : 'w-12 p-2 pb-1 mb-2 bg-blue-100'}>
              <div className='grid'>
                <div className='col-1'>
                  <img src={`profile/${matchedUser.profileImg}`} className='w-3rem' />
                </div>
                <div className='col-7 sm:col-8 md:col-8 lg:col-8 xl:col-8 my-auto pl-5 sm:pl-4 md:pl-3 xl:pl-3'>
                  <span className=' text-base xl:text-lg lg:text-lg'>
                    <b>{matchedUser._id === user._id ? 'You' : matchedUser.name}</b> {notify.notification}.
                  </span>
                </div>
                <div className='col-4 sm:col-3 md:col-3 lg:col-3 xl:col-3 p-0'>
                 <div className='grid px-2 pt-1'>
                  <div className='col-12 flex justify-content-end '>
                    <Menu model={items} popup ref={menu} className= 'z-5'/>
                    <i className='pi pi-ellipsis-h font-bold text-lg cursor-pointer' style={{color: '#222d82'}} onClick={(e) => {menu.current.toggle(e); setNotifyId(notify._id)}}></i>
                    </div>
                    <div className='col-12 flex justify-content-end pb-0'>
                    <span className='text-sm xl:text-base'>{moment(notify.date).fromNow()}</span>
                    </div>
                 </div>
                </div>
              </div>
            </Card> : ''
            }
            </>
            );
          }):'' : <Loader />}
    </>
  )
}


