import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../contexts/AuthContext';
import { getUserProgress } from '../services/userProgressService';
import { getAllTopics } from '../services/topicService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import TopicCard from '../components/TopicCard';
import LayoutSwitch from '../components/LayoutSwitch';

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [layoutType, setLayoutType] = useState(() => localStorage.getItem('layoutType') || 'structured');
  const queryClient = useQueryClient();

  const { data: topics = [], isLoading: isTopicsLoading, error: topicsError } = useQuery(
      ['topics'], getAllTopics, { staleTime: 60000, retry: 1 }
  );

  const { data: progress = { problemsSolved: 0, totalProblems: 0, solvedProblems: [] },
    isLoading: isProgressLoading } = useQuery({
    queryKey: ['userProgress'],
    queryFn: getUserProgress,
    enabled: isAuthenticated,
    staleTime: 60000,
    retry: 1
  });

  const handleToggleLayout = (type) => {
    setLayoutType(type);
    localStorage.setItem('layoutType', type);
  };

  const handleProblemStatusChange = (problemId, isCompleted) => {
    const newSolved = isCompleted
        ? [...progress.solvedProblems, problemId]
        : progress.solvedProblems.filter(id => id !== problemId);

    queryClient.setQueryData(['userProgress'], {
      ...progress,
      problemsSolved: newSolved.length,
      solvedProblems: newSolved
    });
  };

  if (isTopicsLoading || isProgressLoading) {
    return (
        <div className="max-w-7xl mx-auto py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto" />
        </div>
    );
  }

  if (topicsError) {
    return (
        <div className="max-w-7xl mx-auto py-8 text-center text-red-500">
          Failed to load topics. Please try again later.
        </div>
    );
  }

  return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <section className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              Master Data Structures and Algorithms
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              AlgoTrack provides a structured approach to learning DSA with curated problems from top platforms.
            </p>
          </section>

          {isAuthenticated && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-center text-primary-600 dark:text-primary-400 mb-4">
                  Your Progress
                </h2>
                <ProgressBar
                    solved={progress.problemsSolved}
                    total={topics.reduce((sum, topic) => sum + topic.problems.length, 0)}
                />
              </section>
          )}

          <section>
            <div className="flex justify-center mb-6">
              <LayoutSwitch layout={layoutType} setLayout={handleToggleLayout} />
            </div>
            <h2 className="text-2xl font-bold text-center text-primary-600 dark:text-primary-400 mb-6">
              Topics & Problems
            </h2>

            <div className="max-w-4xl mx-auto">
              {topics.map(topic => (
                  <TopicCard
                      key={topic.id}
                      topic={topic}
                      solvedProblems={progress.solvedProblems}
                      onProblemStatusChange={handleProblemStatusChange}
                      layoutType={layoutType}
                      isAuthenticated={isAuthenticated}
                  />
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </div>
  );
}

export default HomePage;