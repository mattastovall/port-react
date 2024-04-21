import React from 'react'
import { useParams } from 'react-router-dom'; // Import useParams
import { VideoComponent, ImageGallery } from './VideoComponent.jsx';

function ProjectPage() {
  const { id } = useParams(); // Use useParams to get the route parameter
  const projectId = id;
  // Fetch project data based on projectId
  const project = {}; // This would be your fetched data

  return (
    <div>
      <VideoComponent videoUrl={project.videoUrl} />
      <p>{project.description}</p>
      <ImageGallery images={project.images} />
    </div>
  );
}

export default ProjectPage;