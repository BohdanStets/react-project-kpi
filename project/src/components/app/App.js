import { useState, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import MainPage from '../pages/MainPage';
import NoMatch from '../pages/404';
import ComicsList from '../ComicsList/ComicsList';
import SinglePageComic from '../pages/SinglePageComic';
const App = () => {
  return (
    <Router>
      <div className='app'>
        <div className='app-wrapper'>
          <div className='container'>
            <AppHeader />
          </div>
        </div>
        <main>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/comics' element={<ComicsList />}></Route>
            <Route path='/comics/:comicId' element={<SinglePageComic />}></Route>
            <Route path='*' element={<NoMatch/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
