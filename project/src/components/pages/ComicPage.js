import { React } from 'react';
import SingleCSinglePageComicomicPage from './SinglePageComic';
import AppBanner from '../AppBanner/AppBanner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ComicPage = () => {
  return (
    <>
      <ErrorBoundary>
        <AppBanner />
        <SinglePageComic />
      </ErrorBoundary>
    </>
  );
};
export default ComicPage;
