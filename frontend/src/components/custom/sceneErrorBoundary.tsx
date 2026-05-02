"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

/**
 * Lightweight error boundary for isolating WebGL / three.js scene failures.
 * Without this, a runtime error inside the <Canvas> tree crashes the whole
 * React tree and leaves the user with a blank page. With this, the hero
 * scene falls back to a static gold gradient and the rest of the site keeps
 * working.
 */
export class SceneErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("[SceneErrorBoundary] caught:", error, info);
    }
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="w-full h-full relative overflow-hidden"
            data-testid="scene-error-fallback"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,137,34,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(187,137,34,0.08),transparent_40%)]" />
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default SceneErrorBoundary;
