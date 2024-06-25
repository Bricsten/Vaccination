import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url("/images/poli.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '85vh' }}>
        <div className="hero-content text-center text-white">
          <h1 className="text-white fw-bold">Polio Vaccination Monitoring System</h1>
          <p className="mb-4">Stay protected from the spread of polio.</p>
          <a href="/login" className="btn btn-success">Get Started</a>
        </div>
      </section>

      {/* Content Section */}
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

export default Home;