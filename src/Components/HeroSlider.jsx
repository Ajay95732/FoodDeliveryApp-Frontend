export default function HeroSlider() {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
            className="d-block w-100"
            height="450"
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349"
            className="d-block w-100"
            height="450"
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
            className="d-block w-100"
            height="450"
          />
        </div>

      </div>
    </div>
  );
}