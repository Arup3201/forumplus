import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

export const Login = () => {
  const { googleSignIn, githubSignIn } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={googleSignIn}
            className="w-full flex justify-center items-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />Sign in with Google
          </Button>
          <Button
            onClick={githubSignIn}
            className="w-full flex justify-center items-center gap-2"
          >
            <img
              src="https://github.com/favicon.ico"
              alt="GitHub"
              className="w-5 h-5"
            />Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}; 