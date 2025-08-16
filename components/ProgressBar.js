import React from 'react'

const ProgressBar = ({totalCount,completedCount}) => {
  return (
    <>
    {totalCount > 0 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
    </>
  )
}

export default ProgressBar