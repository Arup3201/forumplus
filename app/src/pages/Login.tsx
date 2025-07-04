import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { Icons } from '@/components/icons';

export const Login = () => {
  const { googleSignIn, githubSignIn } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6">
      <div className="w-full max-w-[320px] bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          {/* ForumPlus Logo */}
          <div className="mb-4 flex items-center justify-center">
            <Icons.Logo className="w-10 h-10" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome to ForumPlus
          </h1>
        </div>

        {/* Authentication Buttons */}
        <div className="space-y-4">
          {/* Google Button */}
          <Button
            onClick={googleSignIn}
            variant="outline"
            className="w-full h-12 bg-white border border-[#e1e5e9] text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <Icons.Google className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </div>
          </Button>

          {/* GitHub Button */}
          <Button
            onClick={githubSignIn}
            className="w-full h-12 bg-[#24292f] text-white hover:bg-[#1f2428] transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <Icons.Github className="w-5 h-5" />
              <span className="font-medium">Continue with GitHub</span>
            </div>
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="/terms" className="underline hover:text-gray-700 transition-colors">
              Terms
            </a>{' '}
            &{' '}
            <a href="/privacy" className="underline hover:text-gray-700 transition-colors">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}; 