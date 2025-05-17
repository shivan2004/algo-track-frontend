import React, { useState } from 'react';
import { X } from 'lucide-react';

const UpdateProblemDialog = ({ problem, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        id: problem.id,
        newTitle: problem.title,
        newLink: problem.link,
        newPlatform: problem.platform
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Update Problem</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.newTitle}
                                onChange={(e) => setFormData({ ...formData, newTitle: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Link</label>
                            <input
                                type="url"
                                value={formData.newLink}
                                onChange={(e) => setFormData({ ...formData, newLink: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Platform</label>
                            <select
                                value={formData.newPlatform}
                                onChange={(e) => setFormData({ ...formData, newPlatform: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="LEETCODE">LeetCode</option>
                                <option value="CODECHEF">CodeChef</option>
                                <option value="CODEFORCES">Codeforces</option>
                                <option value="GEEKSFORGEEKS">GeeksforGeeks</option>
                                <option value="HACKERRANK">HackerRank</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProblemDialog;