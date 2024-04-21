import React from 'react'; // Corrected import statement
import { Link } from 'react-router-dom';

function Home() {
  const projects = [
    { id: 1, thumbnail: './assets/thumb/1.png', title: 'Project 1' },
    { id: 2, thumbnail: './assets/thumb/2.png', title: 'Project 2' },
    { id: 3, thumbnail: './assets/thumb/3.png', title: 'Project 3' },
    { id: 4, thumbnail: './assets/thumb/4.png', title: 'Project 4' },
    { id: 5, thumbnail: './assets/thumb/5.png', title: 'Project 5' },
  ];

  return (
    <React.Fragment>
      <div className="header">
        <h1>Matthew Stovall</h1>
      </div>
      <p className="motion-designer">Motion Designer</p>
      <div className="projects">
        {projects.map(project => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <img src={project.thumbnail} alt={project.title} style={{ marginTop: '50px' }} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;