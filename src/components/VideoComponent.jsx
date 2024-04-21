// VideoComponent
function VideoComponent({ videoUrl }) {
    return (
      <video src={videoUrl} controls />
    );
  }
  
  // ImageGallery
  function ImageGallery({ images }) {
    return (
      <div>
        {images.map((img, index) => (
          <figure key={index}>
            <img src={img.url} alt={img.caption} />
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  
  export { VideoComponent, ImageGallery };


