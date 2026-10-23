import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center z-30 relative">
          <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/40 text-violet-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <AlertTriangle size={30} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Something went wrong on this view
          </h2>
          <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
            We caught an unexpected rendering issue. You can reload this view or head back to the home page without losing your session.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:bg-violet-500 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Reload Page</span>
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs sm:text-sm font-semibold hover:bg-white/[0.12] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Home size={15} />
              <span>Go to Home</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
