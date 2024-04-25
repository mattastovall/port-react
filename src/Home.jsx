import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import './home.css';

const Reel = () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="video-container">
      <YouTube videoId="l5ste1Ocfn4" opts={opts} onReady={onReady} />
    </div>
  );
};

const Home = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollReelRef = useRef(null);
  const reelRef = useRef(null); // Ref for the reel
  const [isHovered, setIsHovered] = useState(false); // State to manage hover status
  const [isSticky, setIsSticky] = useState(false); // State to manage sticky status
  const [buttonText, setButtonText] = useState('View Reel'); // State to track button text

  const calculateScrollDistance = () => {
    const scrollTop = window.scrollY; // Updated from window.pageYOffset
    const windowHeight = window.innerHeight;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const totalDocScrollLength = docHeight - windowHeight;
    return (scrollTop / totalDocScrollLength) * 100;
  };

  const handleScroll = () => {
    setScrollPercentage(calculateScrollDistance());
    const buttonTop = scrollReelRef.current.getBoundingClientRect().top;
    const stickyStatus = buttonTop <= 0; // Adjust this condition based on your needs
    setIsSticky(stickyStatus);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize the scroll percentage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reel is in the viewport, change button text
            if (scrollReelRef.current) {
              scrollReelRef.current.textContent = 'View Work';
              setButtonText('View Work'); // Update the state to reflect the button's text
            }
          } else {
            // Reel is not in the viewport, revert button text
            if (scrollReelRef.current) {
              scrollReelRef.current.textContent = 'View Reel';
              setButtonText('View Reel'); // Reset the state when the button text changes back
            }
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold based on when you want the change to happen
    );

    if (reelRef.current) {
      observer.observe(reelRef.current);
    }

    return () => {
      if (reelRef.current) {
        observer.unobserve(reelRef.current);
      }
    };
  }, []);

  const scrollToPosition = () => {
    if (scrollReelRef.current.textContent === 'View Work') {
      // If the button says "View Work", scroll to the position where the header is centered
      const headerElement = document.querySelector('.header');
      const headerHeight = headerElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const startPosition = headerElement.offsetTop - ((viewportHeight - headerHeight) / 2);
      window.scrollTo({
        top: startPosition,
        behavior: 'smooth',
      });
    } else {
      // If the button does not say "View Work", scroll to the top or any other defined behavior
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Updated "View Reel" style to use sticky positioning
  const reelStyle = {
    position: 'sticky',
    top: '0',
    left: '0', // Stick to the left edge when sticky
    right: '0', // Ensure it extends to the right edge when sticky
    zIndex: 10,
    marginBottom: '200px',
    backgroundColor: isSticky || buttonText === 'View Work' ? 'black' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    textDecoration: isHovered ? 'underline' : 'none',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transform: isSticky ? 'none' : 'translateX(-50%)',
    marginLeft: isSticky ? '0' : '50%', // Center the button when not sticky
  };

  const projects = [
    { id: 1, thumbnail: '/thumb/Thumbnail_1.png', title: 'Project 1' },
    { id: 2, thumbnail: '/thumb/Thumbnail_2.png', title: 'Project 2' },
    { id: 3, thumbnail: '/thumb/Thumbnail_3.png', title: 'Project 3' },
    { id: 4, thumbnail: '/thumb/Thumbnail_4.png', title: 'Project 4' },
    { id: 5, thumbnail: '/thumb/Thumbnail_5.png', title: 'Project 5' },
  ];

  return (
    <>
      <div
        ref={reelRef} // Attach the ref here
        className="Reel"
        style={{
          marginBottom: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Reel />
      </div>
      <button
        ref={scrollReelRef}
        onClick={scrollToPosition} // Updated to use scrollToPosition
        onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
        onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
        className="ScrollReel"
        style={reelStyle}
      >
        View Reel
      </button>
      <div className="header">
        <h1>Matthew Stovall</h1>
        <p className="description">Motion Designer</p>
      </div>
      <div
        className="projects"
        style={{
          marginTop: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {projects.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{ margin: '5px', maxWidth: '300px', marginBottom: '800px' }}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;