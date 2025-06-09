import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Login = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </Button>
          <Button
            onClick={handleGithubSignIn}
            className="w-full flex justify-center items-center gap-2"
          >
            <img
              src="https://github.com/favicon.ico"
              alt="GitHub"
              className="w-5 h-5"
            />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}; 