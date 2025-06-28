import Slider from "react-slick";
import Movie from "../movie/Movie";
import "./MovieList.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieList = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-list">
      <h2 className="list-title">{title}</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-slide">
              <Movie movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieList;