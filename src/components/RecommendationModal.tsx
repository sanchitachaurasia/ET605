import React from 'react';

export interface RecommendationResponse {
  student_id?: string;
  chapter_id?: string;
  performance_score?: number;
  confidence_score?: number;
  learning_state?: string;
  diagnosis?: {
    accuracy?: number;
    hint_dependency?: string;
    retry_behavior?: string;
    time_efficiency?: string;
    history?: {
      past_attempts?: number;
      avg_performance?: number;
      trend?: string;
    };
  };
  recommendation?: {
    type?: string;
    reason?: string;
    next_steps?: string[];
    prerequisite_url?: string;
  };
}

interface RecommendationModalProps {
  isOpen: boolean;
  data: RecommendationResponse | null;
  onClose: () => void;
}

const toPercent = (value?: number): string => {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value * 100)}%`;
};

export default function RecommendationModal({ isOpen, data, onClose }: RecommendationModalProps) {
  if (!isOpen || !data?.recommendation) return null;

  const isPrerequisite = data.recommendation.type === 'prerequisite';
  const prerequisiteUrl = data.recommendation.prerequisite_url;
  const nextSteps = data.recommendation.next_steps || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Recommendation</p>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {isPrerequisite ? 'Strengthen Foundations First' : 'You Are Ready for the Next Step'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{data.recommendation.reason || 'Personalized recommendation generated.'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Learning State</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{data.learning_state || 'N/A'}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Performance</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{toPercent(data.performance_score)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Confidence</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{toPercent(data.confidence_score)}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-bold text-slate-800">Next Steps</p>
          {nextSteps.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {nextSteps.map((step, idx) => (
                <li key={`${step}-${idx}`}>{step}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-600">No next steps available.</p>
          )}
        </div>

        {isPrerequisite && prerequisiteUrl ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Prerequisite Chapter Available</p>
            <p className="mt-1 break-all text-sm text-amber-800">{prerequisiteUrl}</p>
            <div className="mt-3">
              <a
                href={prerequisiteUrl}
                className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-amber-600"
              >
                Open Prerequisite Chapter
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
