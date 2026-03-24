import React, { useState } from 'react';

export interface ExitConfirmationProps {
  isOpen: boolean;
  currentProgress?: {
    completed: number;
    total: number;
  };
  onConfirmExit: () => void;
  onResume: () => void;
}

export const ExitConfirmationModal: React.FC<ExitConfirmationProps> = ({
  isOpen,
  currentProgress,
  onConfirmExit,
  onResume
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const completionPercentage = currentProgress
    ? Math.round((currentProgress.completed / currentProgress.total) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Exit Chapter?</h2>

        <p className="text-gray-600 mb-6">
          You're currently in progress. If you exit now, your session will be marked as incomplete.
        </p>

        {currentProgress && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Chapter Progress</span>
              <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {currentProgress.completed} of {currentProgress.total} topics completed
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => {
              setIsConfirming(true);
              setTimeout(() => onConfirmExit(), 500);
            }}
            disabled={isConfirming}
            className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isConfirming ? 'Exiting...' : 'Yes, Exit Chapter'}
          </button>

          <button
            onClick={onResume}
            disabled={isConfirming}
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Resume Chapter
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          ⚠️ Exiting will save this session as incomplete in your learning record.
        </p>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
