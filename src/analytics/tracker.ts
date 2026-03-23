import { StudentSession } from '../types';

export interface InternalAnalytics {
  sessionId: string;
  studentId: string;
  events: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  type: 'question_attempt' | 'hint_view' | 'module_start' | 'module_end' | 'idle_detected';
  timestamp: string;
  data: any;
}

export const trackEvent = (event: AnalyticsEvent) => {
  const logs = JSON.parse(localStorage.getItem('dataquest-analytics') || '[]');
  logs.push(event);
  localStorage.setItem('dataquest-analytics', JSON.stringify(logs));
};

export const getInternalAnalytics = (): AnalyticsEvent[] => {
  return JSON.parse(localStorage.getItem('dataquest-analytics') || '[]');
};
