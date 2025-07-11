import { Button } from "./Button";

interface FailedStateProps {
  title: string;
  message: string;
  refetch?: () => void;
}

const ErrorState = ({ title, message, refetch }: FailedStateProps) => {
  return (
    <div className="min-h-[400px]  flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <Button
          onClick={() => refetch?.()}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
