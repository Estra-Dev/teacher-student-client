import ForTeacher from '@/components/ForTeacher'
import Image from 'next/image'
import React from 'react'


const page = () => {

  return (
    <div className=' h-screen w-screen flex flex-col justify-center gap-10 pt-20'>
      <div className='flex flex-col items-center justify-center overflow-hidden'>
        <div>
          <Image src={"/prin.png"} width={500} height={500} alt='Logo' />
        </div>
        <h1 className=' font-bold text-4xl text-gray-700 text-center mt-4'>Prince<span className=' text-blue-500'>Learner</span></h1>
      </div>
      <ForTeacher />
    </div>
  )
}

export default page
