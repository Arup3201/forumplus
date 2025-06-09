import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Forum Home</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.displayName}</span>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Discussions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium">Getting Started with React</h3>
              <p className="text-gray-600">A beginner's guide to React development...</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium">TypeScript Best Practices</h3>
              <p className="text-gray-600">Learn about TypeScript patterns and practices...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 