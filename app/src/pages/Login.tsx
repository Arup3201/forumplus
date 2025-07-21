import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/auth';
import { Icons } from '@/components/icons';

export const Login = () => {
  const { googleSignIn, githubSignIn } = useAuth();

  return (
    <div className="flex justify-center items-center bg-[#f8f9fa] px-6 min-h-screen">
      <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-lg w-full max-w-[320px]">
        {/* Header Section */}
        <div className="mb-6 text-center">
          {/* ForumPlus Logo */}
          <div className="flex justify-center items-center mb-4">
            <Icons.Logo className="w-10 h-10" />
          </div>
          <h1 className="font-semibold text-gray-900 text-xl">
            Welcome to ForumPlus
          </h1>
        </div>

        {/* Authentication Buttons */}
        <div className="space-y-4">
          {/* Google Button */}
          <Button
            onClick={googleSignIn}
            variant="outline"
            className="bg-white hover:bg-gray-50 border border-[#e1e5e9] hover:border-gray-300 w-full h-12 text-gray-700 transition-colors"
          >
            <div className="flex justify-center items-center gap-3">
              <Icons.Google className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </div>
          </Button>

          {/* GitHub Button */}
          <Button
            onClick={githubSignIn}
            className="bg-[#24292f] hover:bg-[#1f2428] w-full h-12 text-white transition-colors"
          >
            <div className="flex justify-center items-center gap-3">
              <Icons.Github className="w-5 h-5" />
              <span className="font-medium">Continue with GitHub</span>
            </div>
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            By continuing, you agree to our{' '}
            <a href="/terms" className="hover:text-gray-700 underline transition-colors">
              Terms
            </a>{' '}
            &{' '}
            <a href="/privacy" className="hover:text-gray-700 underline transition-colors">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}; 