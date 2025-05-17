import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import {
  Plus, Trash2, Edit, GripVertical,
  Save, X, ChevronDown, ChevronUp
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateTopicDialog from '../components/UpdateTopicDialog';
import UpdateProblemDialog from '../components/UpdateProblemDialog';
import { getAllTopics, addTopic, reorderTopics, updateTopic, deleteTopic } from '../services/topicService';
import { addProblem, reorderProblems, updateProblem, deleteProblem } from '../services/problemService';
import './AdminPage.css';

const AdminPage = () => {
  const [activeMode, setActiveMode] = useState('topics');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);
  const [showAddProblemForm, setShowAddProblemForm] = useState(false);
  const [showUpdateTopicDialog, setShowUpdateTopicDialog] = useState(false);
  const [showUpdateProblemDialog, setShowUpdateProblemDialog] = useState(false);
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newProblem, setNewProblem] = useState({
    title: '',
    link: '',
    platform: 'LEETCODE'
  });

  const queryClient = useQueryClient();

  // Fetch all topics
  const { data: topics = [], isLoading } = useQuery(['topics'], getAllTopics);

  // Add topic mutation
  const addTopicMutation = useMutation({
    mutationFn: (topicData) => addTopic(topicData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      setNewTopicTitle('');
      setShowAddTopicForm(false);
      toast.success('Topic added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add topic: ${error.message}`);
    }
  });

  // Update topic mutation
  const updateTopicMutation = useMutation({
    mutationFn: updateTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      setShowUpdateTopicDialog(false);
      setSelectedItemForUpdate(null);
      toast.success('Topic updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update topic: ${error.message}`);
    }
  });

  // Delete topic mutation
  const deleteTopicMutation = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete topic: ${error.message}`);
    }
  });

  // Add problem mutation
  const addProblemMutation = useMutation({
    mutationFn: (problemData) => addProblem(problemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      setNewProblem({ title: '', link: '', platform: 'LEETCODE' });
      setShowAddProblemForm(false);
      toast.success('Problem added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add problem: ${error.message}`);
    }
  });

  // Update problem mutation
  const updateProblemMutation = useMutation({
    mutationFn: updateProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      setShowUpdateProblemDialog(false);
      setSelectedItemForUpdate(null);
      toast.success('Problem updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update problem: ${error.message}`);
    }
  });

  // Delete problem mutation
  const deleteProblemMutation = useMutation({
    mutationFn: deleteProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Problem deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete problem: ${error.message}`);
    }
  });

  // Reorder topics mutation
  const reorderTopicsMutation = useMutation({
    mutationFn: reorderTopics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topics reordered successfully');
    },
    onError: (error) => {
      toast.error(`Failed to reorder topics: ${error.message}`);
    }
  });

  // Reorder problems mutation
  const reorderProblemsMutation = useMutation({
    mutationFn: ({ topicId, reorderData }) => reorderProblems(topicId, reorderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Problems reordered successfully');
    },
    onError: (error) => {
      toast.error(`Failed to reorder problems: ${error.message}`);
    }
  });

  // Handle topic drag and drop
  const handleTopicDragEnd = (result) => {
    if (!result.destination) return;

    const currentOrder = result.source.index + 1;
    const newOrder = result.destination.index + 1;

    const reorderData = {
      currentOrder,
      newOrder,
    };

    reorderTopicsMutation.mutate(reorderData);
  };

  // Handle problem drag and drop
  const handleProblemDragEnd = (result, topicId) => {
    if (!result.destination) return;

    const currentOrder = result.source.index + 1;
    const newOrder = result.destination.index + 1;

    const reorderData = {
      currentOrder,
      newOrder,
    };

    reorderProblemsMutation.mutate({ topicId, reorderData });
  };

  // Handle add topic
  const handleAddTopic = (e) => {
    e.preventDefault();

    if (!newTopicTitle.trim()) {
      toast.error('Topic title cannot be empty');
      return;
    }

    addTopicMutation.mutate({ title: newTopicTitle });
  };

  // Handle add problem
  const handleAddProblem = (e) => {
    e.preventDefault();

    if (!newProblem.title.trim() || !newProblem.link.trim()) {
      toast.error('Problem title and link are required');
      return;
    }

    if (!selectedTopicId) {
      toast.error('Please select a topic first');
      return;
    }

    addProblemMutation.mutate({
      ...newProblem,
      topicId: selectedTopicId
    });
  };

  // Handle update topic
  const handleUpdateTopic = (topicData) => {
    updateTopicMutation.mutate(topicData);
  };

  // Handle delete topic
  const handleDeleteTopic = (topicId) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      deleteTopicMutation.mutate(topicId);
    }
  };

  // Handle update problem
  const handleUpdateProblem = (problemData) => {
    updateProblemMutation.mutate(problemData);
  };

  // Handle delete problem
  const handleDeleteProblem = (problemId) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      deleteProblemMutation.mutate(problemId);
    }
  };

  return (
      <div className="admin-page">
        <Header />

        <main className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Admin Dashboard</h1>
            <div className="admin-tabs">
              <button
                  className={`admin-tab ${activeMode === 'topics' ? 'active' : ''}`}
                  onClick={() => setActiveMode('topics')}
              >
                Manage Topics
              </button>
              <button
                  className={`admin-tab ${activeMode === 'problems' ? 'active' : ''}`}
                  onClick={() => setActiveMode('problems')}
              >
                Manage Problems
              </button>
            </div>
          </div>

          <div className="admin-content">
            {isLoading ? (
                <div className="admin-loading">Loading...</div>
            ) : (
                activeMode === 'topics' ? (
                    // Topics Management
                    <div className="topics-management">
                      <div className="management-header">
                        <h2 className="management-title">Topics</h2>
                        <button
                            className="btn-primary add-button"
                            onClick={() => setShowAddTopicForm(!showAddTopicForm)}
                        >
                          {showAddTopicForm ? <X size={18} /> : <Plus size={18} />}
                          <span>{showAddTopicForm ? 'Cancel' : 'Add Topic'}</span>
                        </button>
                      </div>

                      {showAddTopicForm && (
                          <form className="add-form" onSubmit={handleAddTopic}>
                            <div className="form-group">
                              <label htmlFor="topicTitle" className="form-label">Topic Title</label>
                              <input
                                  id="topicTitle"
                                  type="text"
                                  className="form-input"
                                  value={newTopicTitle}
                                  onChange={(e) => setNewTopicTitle(e.target.value)}
                                  placeholder="Enter topic title"
                                  required
                              />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={addTopicMutation.isLoading}
                            >
                              {addTopicMutation.isLoading ? (
                                  <span className="loading-spinner"></span>
                              ) : (
                                  <>
                                    <Save size={18} />
                                    <span>Save Topic</span>
                                  </>
                              )}
                            </button>
                          </form>
                      )}

                      <DragDropContext onDragEnd={handleTopicDragEnd}>
                        <Droppable droppableId="topics">
                          {(provided) => (
                              <div
                                  className="topics-list"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                              >
                                {topics.map((topic, index) => (
                                    <Draggable
                                        key={topic.id}
                                        draggableId={`topic-${topic.id}`}
                                        index={index}
                                    >
                                      {(provided) => (
                                          <div
                                              className="topic-item"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                          >
                                            <div className="topic-item-content">
                                              <div
                                                  className="drag-handle"
                                                  {...provided.dragHandleProps}
                                              >
                                                <GripVertical size={18} />
                                              </div>
                                              <div className="topic-item-details">
                                                <h3 className="topic-item-title">{topic.title}</h3>
                                                <span className="topic-item-count">
                                      {topic.problems.length} problems
                                    </span>
                                              </div>
                                              <div className="topic-item-actions">
                                                <button
                                                    className="action-button edit"
                                                    onClick={() => {
                                                      setSelectedItemForUpdate(topic);
                                                      setShowUpdateTopicDialog(true);
                                                    }}
                                                >
                                                  <Edit size={16} />
                                                </button>
                                                <button
                                                    className="action-button delete"
                                                    onClick={() => handleDeleteTopic(topic.id)}
                                                >
                                                  <Trash2 size={16} />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                      )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                ) : (
                    // Problems Management
                    <div className="problems-management">
                      <div className="management-header">
                        <div className="management-header-left">
                          <h2 className="management-title">Problems</h2>
                          <select
                              className="topic-select"
                              value={selectedTopicId || ''}
                              onChange={(e) => setSelectedTopicId(e.target.value ? Number(e.target.value) : null)}
                          >
                            <option value="">Select a topic</option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                  {topic.title}
                                </option>
                            ))}
                          </select>
                        </div>
                        <button
                            className="btn-primary add-button"
                            onClick={() => setShowAddProblemForm(!showAddProblemForm)}
                            disabled={!selectedTopicId}
                        >
                          {showAddProblemForm ? <X size={18} /> : <Plus size={18} />}
                          <span>{showAddProblemForm ? 'Cancel' : 'Add Problem'}</span>
                        </button>
                      </div>

                      {showAddProblemForm && (
                          <form className="add-form" onSubmit={handleAddProblem}>
                            <div className="form-group">
                              <label htmlFor="problemTitle" className="form-label">Problem Title</label>
                              <input
                                  id="problemTitle"
                                  type="text"
                                  className="form-input"
                                  value={newProblem.title}
                                  onChange={(e) => setNewProblem({...newProblem, title: e.target.value})}
                                  placeholder="Enter problem title"
                                  required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="problemLink" className="form-label">Problem Link</label>
                              <input
                                  id="problemLink"
                                  type="text"
                                  className="form-input"
                                  value={newProblem.link}
                                  onChange={(e) => setNewProblem({...newProblem, link: e.target.value})}
                                  placeholder="Enter problem link"
                                  required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="problemPlatform" className="form-label">Platform</label>
                              <select
                                  id="problemPlatform"
                                  className="form-input"
                                  value={newProblem.platform}
                                  onChange={(e) => setNewProblem({...newProblem, platform: e.target.value})}
                              >
                                <option value="LEETCODE">LeetCode</option>
                                <option value="CODECHEF">CodeChef</option>
                                <option value="CODEFORCES">Codeforces</option>
                                <option value="GEEKSFORGEEKS">GeeksforGeeks</option>
                                <option value="HACKERRANK">HackerRank</option>
                              </select>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={addProblemMutation.isLoading}
                            >
                              {addProblemMutation.isLoading ? (
                                  <span className="loading-spinner"></span>
                              ) : (
                                  <>
                                    <Save size={18} />
                                    <span>Save Problem</span>
                                  </>
                              )}
                            </button>
                          </form>
                      )}

                      {selectedTopicId && (
                          <div className="selected-topic-problems">
                            {topics.find(t => t.id === Number(selectedTopicId))?.problems.length === 0 ? (
                                <p className="no-problems-message">
                                  No problems in this topic yet. Add a problem to get started.
                                </p>
                            ) : (
                                <DragDropContext onDragEnd={(result) => handleProblemDragEnd(result, selectedTopicId)}>
                                  <Droppable droppableId={`problems-${selectedTopicId}`}>
                                    {(provided) => (
                                        <div
                                            className="problems-list"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                          {topics.find(t => t.id === Number(selectedTopicId))?.problems.map((problem, index) => (
                                              <Draggable
                                                  key={problem.id}
                                                  draggableId={`problem-${problem.id}`}
                                                  index={index}
                                              >
                                                {(provided) => (
                                                    <div
                                                        className="problem-item"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                    >
                                                      <div className="problem-item-content">
                                                        <div
                                                            className="drag-handle"
                                                            {...provided.dragHandleProps}
                                                        >
                                                          <GripVertical size={18} />
                                                        </div>
                                                        <div className="problem-item-details">
                                                          <h3 className="problem-item-title">{problem.title}</h3>
                                                          <div className="problem-item-meta">
                                                            <span className="problem-item-platform">{problem.platform}</span>
                                                            <a href={problem.link} target="_blank" rel="noopener noreferrer" className="problem-item-link">
                                                              View Problem
                                                            </a>
                                                          </div>
                                                        </div>
                                                        <div className="problem-item-actions">
                                                          <button
                                                              className="action-button edit"
                                                              onClick={() => {
                                                                setSelectedItemForUpdate(problem);
                                                                setShowUpdateProblemDialog(true);
                                                              }}
                                                          >
                                                            <Edit size={16} />
                                                          </button>
                                                          <button
                                                              className="action-button delete"
                                                              onClick={() => handleDeleteProblem(problem.id)}
                                                          >
                                                            <Trash2 size={16} />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                )}
                                              </Draggable>
                                          ))}
                                          {provided.placeholder}
                                        </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                            )}
                          </div>
                      )}

                      {!selectedTopicId && (
                          <div className="select-topic-message">
                            Please select a topic to manage its problems.
                          </div>
                      )}
                    </div>
                )
            )}
          </div>
        </main>

        {showUpdateTopicDialog && selectedItemForUpdate && (
            <UpdateTopicDialog
                topic={selectedItemForUpdate}
                onClose={() => {
                  setShowUpdateTopicDialog(false);
                  setSelectedItemForUpdate(null);
                }}
                onUpdate={handleUpdateTopic}
            />
        )}

        {showUpdateProblemDialog && selectedItemForUpdate && (
            <UpdateProblemDialog
                problem={selectedItemForUpdate}
                onClose={() => {
                  setShowUpdateProblemDialog(false);
                  setSelectedItemForUpdate(null);
                }}
                onUpdate={handleUpdateProblem}
            />
        )}

        <Footer />
      </div>
  );
};

export default AdminPage;