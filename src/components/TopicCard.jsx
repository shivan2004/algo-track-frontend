import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProblemItem from './ProblemItem';

function TopicCard({ topic, solvedProblems = [], onProblemStatusChange, layoutType = 'structured', isAuthenticated }) {
    const { title, problems } = topic;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const isProblemSolved = (problemId) => {
        return solvedProblems.includes(problemId);
    };

    const solvedCount = problems.filter(problem => isProblemSolved(problem.id)).length;
    const percentage = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

    if (layoutType === 'roadmap') {
        return (
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400 flex-grow">
                        {title}
                    </h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {solvedCount}/{problems.length} solved ({percentage}%)
                    </div>
                </div>

                <div className="space-y-2">
                    {problems.map(problem => (
                        <ProblemItem
                            key={problem.id}
                            problem={problem}
                            isSolved={isProblemSolved(problem.id)}
                            onStatusChange={onProblemStatusChange}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}

                    {problems.length === 0 && (
                        <div className="text-gray-500 dark:text-gray-400 text-sm italic py-2">
                            No problems available for this topic yet.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div
                className="flex items-center justify-between cursor-pointer p-2"
                onClick={toggleExpand}
            >
                <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400">
                    {title}
                </h3>

                <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {solvedCount}/{problems.length} solved
                    </div>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-dark-700 rounded-full">
                        <div
                            className="h-2 bg-primary-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {isExpanded && (
                <div className="mt-3 pl-2 pr-2">
                    {problems.map(problem => (
                        <ProblemItem
                            key={problem.id}
                            problem={problem}
                            isSolved={isProblemSolved(problem.id)}
                            onStatusChange={onProblemStatusChange}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}

                    {problems.length === 0 && (
                        <div className="text-gray-500 dark:text-gray-400 text-sm italic py-2">
                            No problems available for this topic yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TopicCard;