import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <p className="text-gray-600">
                Member since: {user?.metadata.creationTime}
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">Activity</h3>
              <p className="text-gray-600">Posts: 0</p>
              <p className="text-gray-600">Comments: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 