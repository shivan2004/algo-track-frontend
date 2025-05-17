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

function ProblemItem({ problem, isSolved, onStatusChange, isAuthenticated, layoutType }) {
  const [checked, setChecked] = useState(isSolved);
  const queryClient = useQueryClient();

  const markMutation = useMutation(markProgress, {
    onSuccess: () => {
      setChecked(true);
      onStatusChange(problem.id, true);
      toast.success('Marked as solved!');
    },
    onError: () => {
      setChecked(false);
      toast.error('Failed to update progress');
    }
  });

  const unmarkMutation = useMutation(unmarkProgress, {
    onSuccess: () => {
      setChecked(false);
      onStatusChange(problem.id, false);
      toast.success('Marked as unsolved!');
    },
    onError: () => {
      setChecked(true);
      toast.error('Failed to update progress');
    }
  });

  const handleCheckboxChange = () => {
    if (!isAuthenticated) {
      toast.info('Please login to track progress.');
      return;
    }

    checked ? unmarkMutation.mutate(problem.id) : markMutation.mutate(problem.id);
  };

  const { title, link, platform, problemOrder } = problem;
  const isUpdating = markMutation.isLoading || unmarkMutation.isLoading;

  return (
      <div className={`${layoutType === 'structured' ? 'card py-2 px-3 mb-2' : 'border-b py-3'} flex items-center space-x-3`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            disabled={isUpdating}
            className="h-5 w-5 text-primary-600 cursor-pointer rounded border-gray-300"
        />

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
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${platformColors[platform] || 'bg-gray-300 text-black'}`}>
            {platform}
          </span>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">#{problemOrder}</div>
      </div>
  );
}

export default ProblemItem;