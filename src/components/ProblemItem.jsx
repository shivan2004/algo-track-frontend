import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { markProgress, unmarkProgress } from '../services/userProgressService';

const platformColors = {
  LEETCODE: 'bg-[#FFA116] text-white',
  CODECHEF: 'bg-[#5B4638] text-white',
  CODEFORCES: 'bg-[#1F8ACB] text-white',
  GEEKSFORGEEKS: 'bg-[#2F8D46] text-white',
  HACKERRANK: 'bg-[#00EA64] text-black'
};

function ProblemItem({ problem, isSolved, onStatusChange, isAuthenticated }) {
  const [checked, setChecked] = useState(isSolved);
  const queryClient = useQueryClient();

  const markProgressMutation = useMutation(markProgress, {
    onSuccess: () => {
      setChecked(true);
      onStatusChange(problem.id, true);
      toast.success('Problem marked as solved!');
    },
    onError: () => {
      setChecked(false);
      toast.error('Failed to update progress');
    }
  });

  const unmarkProgressMutation = useMutation(unmarkProgress, {
    onSuccess: () => {
      setChecked(false);
      onStatusChange(problem.id, false);
      toast.success('Problem marked as unsolved');
    },
    onError: () => {
      setChecked(true);
      toast.error('Failed to update progress');
    }
  });

  const handleCheckboxChange = () => {
    if (!isAuthenticated) {
      toast.info('Please login to track your progress', {
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }

    if (checked) {
      unmarkProgressMutation.mutate(problem.id);
    } else {
      markProgressMutation.mutate(problem.id);
    }
  };

  const { title, link, platform, problemOrder } = problem;
  const isUpdating = markProgressMutation.isLoading || unmarkProgressMutation.isLoading;

  return (
      <div className="border-b border-gray-200 dark:border-dark-700 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                disabled={isUpdating}
                className="h-5 w-5 text-primary-600 dark:text-primary-500 rounded border-gray-300 dark:border-dark-600 focus:ring-primary-500 dark:focus:ring-primary-400 cursor-pointer"
            />
          </div>

          <div className="flex-grow">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
            >
              {title} <ExternalLink size={14} className="ml-1" />
            </a>

            <div className="mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${platformColors[platform]}`}>
              {platform}
            </span>
            </div>
          </div>

          <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
            #{problemOrder}
          </div>
        </div>
      </div>
  );
}

export default ProblemItem;