import React from 'react'
import { Skeleton } from 'primereact/skeleton';
import { Card } from 'primereact/card';

export default function SkeletonLoader() {
  return (
    <div className='w-11 md:w-8 sm:w-9 lg:w-10 xl:w-7 fixed overflow-hidden'>
        <div className='w-12 flex justify-content-center ml-1'>
            <Card className="post-card w-11 md:w-8 sm:w-9 lg:w-10 xl:w-7 p-3 mx-auto" >
                <div className="">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div className='mt-1'>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="220px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <div></div>
                    </div>
                </div>
            </Card>
        </div>

        <div className='w-12 flex justify-content-center ml-1'>
            <Card className="post-card w-11 md:w-8 sm:w-9 lg:w-10 xl:w-7 p-3 mx-auto" >
                <div className="">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div className='mt-1'>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="220px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <div></div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}
