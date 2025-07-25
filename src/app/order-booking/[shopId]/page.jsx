'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import OrderMenu from '@/components/order-booking/OrderMenu';

const page = () => {
  
  const params = useParams();
  const shopId = params.shopId;

  return (
   <>
   <OrderMenu shopId = {shopId}/>
   </>
  )
}

export default page