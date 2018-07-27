import React from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { get } from './utils/lodashUtils';
import Storage from './utils/storageManager';
const errorSessionKey = 'error_debug';
/**
 * Function to create the HOC to act as an error boundary
 * @param {Object} WrappedComponent The React component to be wrapped by the HOC.
 * @param {String} path The path(s) of the properties to test from `this.props`.
 * @param {[String]} name The name of the component to be shown in the error.
 */
const withErrorBoundary = (WrappedComponent, path, name) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, debugPaths: [], error: null, info: null };
      this.name = name || 'Not Specified';
      this.debug = storage.getSessionStorage(errorSessionKey) || false;
    }
    componentDidCatch(error, info) {
      const debugPaths = this.validatePath(this.props);
      // Display fallback UI
      this.setState({ hasError: true, error, info, debugPaths });
    }
    /**
     * Function to render the error in-place for the component 
     * replacing the original wrapped component.
     */
    getErrors() {
      return (
        <div
          style={{
            borderRadius: '3px',
            background: '#ff3860',
            color: '#FFF',
            fontFamily: '"Lucida Console", "Courier New", monospace',
            padding: '10px',
            margin: '10px',
            fontSize: '12px'
          }}
        >
          <i>Component</i>:{this.name}
          <br />
          <i>Error</i>: {this.state.error.toString()}
          <br />
          <i>Info</i>: {JSON.stringify(this.state.info)}
          <br />
          <i>Paths</i>: {this.state.debugPaths.length ? this.state.debugPaths.map(dp => `'${dp.path}' `) : 'none'}
        </div>
      );
    }
    /**
     * Function to validate the paths on the props object
     * and show error when paths return undefined.
     * @param {Object} props The component props
     */
    validatePath(props) {
      if (!path || !props) {
        return [];
      }
      const errorPaths = [];
      if (Array.isArray(path) && path.length > 0) {
        path.forEach(p => {
          const result = get(props, p);
          if (!result) {
            errorPaths.push({ path: p });
          }
        });
      } else if (path && typeof path === 'string') {
        const result = get(props, path);
        if (!result) {
          errorPaths.push({ path });
        }
      }
      return errorPaths;
    }
    render() {
      if (this.state.hasError && this.debug) {
        // You can render any custom fallback UI
        if (ExecutionEnvironment.canUseDOM) {
          return this.getErrors();
        }
      }
      return <WrappedComponent {...this.props} />;
    }
  };
export { get, Storage, withErrorBoundary };
