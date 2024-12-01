'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])
 
  return (
    <div className='grid place-items-center h-full'>
      <div className='grid grid-cols-1 gap-4'>
        <h1 className='text-4xl font-bold'>Error!</h1>
        <p>{'エラーが発生しました…\u{1F62E}'}</p>
        <p className='text-error'>{error.message}</p>
        <div className='flex justify-center'>
          <button
            className='btn'
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </div>      
    </div>
  )
}
