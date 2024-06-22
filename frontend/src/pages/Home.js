import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header/>
      <div className="container my-5">
        <h1>Polio Vaccination Monitoring System</h1>
        <p>
          Polio is a highly contagious viral disease that mainly affects young children. It can cause lifelong paralysis and, in some cases, death. Vaccination is the most effective way to prevent the spread of polio.
        </p>
        <p>
          This system helps you monitor your polio vaccination status and schedule appointments to ensure you and your family stay protected.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;