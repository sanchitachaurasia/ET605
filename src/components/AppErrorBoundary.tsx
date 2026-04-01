import React from 'react';

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('AppErrorBoundary caught a render error:', error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoDashboard = () => {
    window.location.assign('/dashboard');
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-black text-slate-900">Something went wrong</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            The page hit an unexpected error. You can reload the app or return to the dashboard.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={this.handleReload}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
            >
              Reload App
            </button>
            <button
              onClick={this.handleGoDashboard}
              className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-bold text-white"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
}
