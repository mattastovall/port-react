import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

class Reel extends React.Component {
  render() {
    const opts = {
      height: '500',
      width: '900',
      playerVars: {
        autoplay: 0,
      },
    };
    return <YouTube videoId="l5ste1Ocfn4" opts={opts} />;
  }
  _onReady(event) {
    event.target.pauseVideo();
  }
}

function Home() {
  const projects = [
    { id: 1, thumbnail: '/thumb/Thumbnail_1.png', title: 'Project 1' },
    { id: 2, thumbnail: '/thumb/Thumbnail_2.png', title: 'Project 2' },
    { id: 3, thumbnail: '/thumb/Thumbnail_3.png', title: 'Project 3' },
    { id: 4, thumbnail: '/thumb/Thumbnail_4.png', title: 'Project 4' },
    { id: 5, thumbnail: '/thumb/Thumbnail_5.png', title: 'Project 5' },
  ];

  const headerRef = useRef(null); // Creating a ref for the header div

  useEffect(() => {
    if (headerRef.current) {
      const headerPos = headerRef.current.offsetTop + (headerRef.current.clientHeight / 2) - (window.innerHeight / 2);
      window.scrollTo(0, headerPos);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <React.Fragment>
      <div className="Reel" style={{ marginBottom: '50vh', marginTop: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Reel />
      </div>
      <p className="ScrollReel">View Reel</p>
      <div className="header" ref={headerRef}>
        <h1>Matthew Stovall</h1>
        <p className="description">Motion Designer</p>
      </div>
      <div className="projects" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {projects.map(project => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <img src={project.thumbnail} alt={project.title} style={{ margin: '5px', maxWidth: '300px', marginBottom: '800px' }} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
