import React, { useState } from 'react';
import NotificationBar from './NotificationBar';
import MarkAsAllReadBtn from './MarkAsAllReadBtn';
import RemoveAllNotificationBtn from './RemoveAllNotificationBtn';

function NotificationMain() {
  
  return (
    <div className='w-11 sm:w-10 md:w-8 lg:w-6 xl:w-5 m-auto'>
      <div className='flex justify-content-between mb-2'>
        <RemoveAllNotificationBtn />
        <MarkAsAllReadBtn />
      </div>
      <NotificationBar />
    </div>
  );
}

export default NotificationMain;