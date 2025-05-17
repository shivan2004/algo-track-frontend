import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;