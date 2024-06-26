import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

const JumbotronSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgroundImages = [
    '/images/poli.jpg',
    '/images/Image2.jpg',
    '/images/Imag3.jpg'
  ];

  const infoContent = [
    {
      title: 'Polio',
      description: 'Polio is a highly contagious viral disease that can lead to paralysis and even death. It primarily affects children under the age of 5.'
    },
    {
      title: 'Finger Marking',
      description: "After receiving the polio vaccine, a small mark is made on the child's finger to indicate they have been immunized."
    },
    {
      title: 'Importance of Polio Vaccine',
      description: 'The polio vaccine is crucial in preventing the spread of this debilitating disease. Widespread vaccination efforts have led to a significant reduction in polio cases worldwide.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div>
      <section
        className="jumbotron d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '85vh',
          transition: 'background-image 0.5s ease-in-out',
          position: 'relative' // Add this line to position the pagination
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 text-white mb-4 fw-bold">Welcome to PVMMS</h1>
          <p className="lead text-white mb-5">Discover the power of our solutions.</p>
          <a href="/register" className="btn btn-success btn-lg">
            Get Started
          </a>
        </div>

        <div
          className="info-content position-absolute top-50 start-0 translate-middle-y p-4"
          style={{
            backgroundColor: 'rgba(25, 135, 84, 0.8)',
            color: '#fff',
            maxWidth: '300px'
          }}
        >
          <h5 className="mb-3">{infoContent[backgroundIndex].title}</h5>
          <p>{infoContent[backgroundIndex].description}</p>
        </div>

        <div className="pagination-container position-absolute bottom-0 start-50 translate-middle-x mb-4">
          <Pagination currentIndex={backgroundIndex} numDots={backgroundImages.length} />
        </div>
      </section>

      <div className="container my-5">
        <h2 className="text-decoration-none fw-bold">Polio Vaccination Monitoring Management System</h2>
        <p>
          Polio is a highly contagious viral disease that mainly affects young children. It can cause lifelong paralysis and, in some cases, death. Vaccination is the most effective way to prevent the spread of polio.
        </p>
        <p>
          This system helps you monitor your polio vaccination status and schedule appointments to ensure you and your family stay protected.
        </p>
        <h3 className="mt-4 fw-bold">Importance of Polio Vaccination Monitoring Management System:</h3>
        <ul>
          <li>Ensures timely and complete vaccination coverage for all children</li>
          <li>Helps identify and address gaps in vaccination coverage</li>
          <li>Enables efficient tracking and follow-up of unvaccinated or partially vaccinated children</li>
          <li>Provides data-driven insights to optimize vaccination strategies and resource allocation</li>
          <li>Contributes to the global effort to eradicate polio through improved surveillance and accountability</li>
        </ul>
      </div>
    </div>
  );
};

export default JumbotronSection;
/*
const Home = () => {
  return (
    <div>
      {/* Hero Section }
      <section class="jumbotron d-flex align-items-center justify-content-center" style={{ 
  backgroundImage: 'url("/images/poli.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '85vh'
}}>
 
        <div className="hero-content text-center text-white">
          <h1 className="text-white fw-bold">Polio Vaccination Monitoring System</h1>
          <p className="mb-4">Stay protected from the spread of polio.</p>
          <a href="/login" className="btn btn-success">Get Started</a>
        </div>
      </section>

      {/* Content Section }
      <div className="container my-5">
        <p>
          Polio is a highly contagious viral disease that mainly affects young children. It can cause lifelong paralysis and, in some cases, death. Vaccination is the most effective way to prevent the spread of polio.
        </p>
        <p>
          This system helps you monitor your polio vaccination status and schedule appointments to ensure you and your family stay protected.
        </p>
      </div>
    </div>
  );
};

export default Home;*/