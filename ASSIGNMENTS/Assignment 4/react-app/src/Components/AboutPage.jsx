import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const achievements = [
    { year: '1985', title: 'College Established', description: 'Founded with a vision to provide quality technical education' },
    { year: '1995', title: 'AICTE Approval', description: 'Received approval from All India Council for Technical Education' },
    { year: '2005', title: 'University Affiliation', description: 'Affiliated with State Technical University' },
    { year: '2010', title: 'NBA Accreditation', description: 'All programs accredited by National Board of Accreditation' },
    { year: '2015', title: 'Research Center', description: 'Established as recognized research center' },
    { year: '2020', title: 'NIRF Ranking', description: 'Ranked among top 100 engineering colleges in India' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About TechCollege</h1>
          <p>Excellence in Education Since 1985</p>
        </div>
      </section>

      {/* College History */}
      <section className="history">
        <div className="container">
          <h2>Our History</h2>
          <div className="history-content">
            <p>
              TechCollege was established in 1985 with a vision to provide world-class technical education 
              and create future leaders in technology and innovation. What started as a small institution 
              with just 100 students has now grown into a premier educational institution with over 5000 students.
            </p>
            <p>
              Over the decades, we have consistently evolved our curriculum, infrastructure, and teaching 
              methodologies to stay ahead of industry trends and technological advancements. Our commitment 
              to excellence has made us one of the most sought-after engineering colleges in the region.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mission">
              <h2>Our Mission</h2>
              <p>
                To provide quality technical education that develops competent professionals 
                with strong ethical values, innovative thinking, and leadership skills to 
                contribute to society and the global economy.
              </p>
            </div>
            <div className="vision">
              <h2>Our Vision</h2>
              <p>
                To be a globally recognized center of excellence in technical education, 
                research, and innovation, fostering holistic development of students and 
                contributing to technological advancement for societal benefit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="achievements">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="timeline">
            {achievements.map((achievement, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{achievement.year}</div>
                <div className="timeline-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;