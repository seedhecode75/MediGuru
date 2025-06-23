import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatContainer from './components/ChatContainer';
import AboutSection from './components/AboutSection';
import AuthorSection from './components/AuthorSection';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <ChatContainer />
      <AboutSection />
      <AuthorSection />
      <Disclaimer />
      <Footer />
    </div>
  );
}

export default App;