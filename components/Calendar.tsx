import React from 'react'

const Calendar = ({listing}: {listing: Listing}) => {
  return (
    <div>
       <h1 className='text-[33px] font-medium leading-tight'>{listing.title}</h1>
       <p className='text-sm uppercase font-medium mt-3'>{listing.category}</p>
    </div>
  )
}

export default Calendar
