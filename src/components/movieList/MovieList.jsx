/* eslint-disable react/prop-types */
import Slider from "react-slick";
import Movie from "../movie/Movie";
import "./MovieList.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieList = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
  };

  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieList;
