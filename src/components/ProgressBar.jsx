import React from 'react';

function ProgressBar({ solved, total }) {
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

    return (
        <div className="w-full max-w-3xl mx-auto bg-gray-200 dark:bg-dark-700 rounded-full h-6 mb-6">
            <div
                className="bg-primary-500 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                style={{ width: `${percentage}%` }}
            >
                {percentage > 5 ? `${percentage}%` : ''}
            </div>
            <div className="text-center mt-2 text-sm text-gray-700 dark:text-gray-300">
                {solved} of {total} problems solved ({percentage}%)
            </div>
        </div>
    );
}

export default ProgressBar;