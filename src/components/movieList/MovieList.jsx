/* eslint-disable react/prop-types */
import Slider from "react-slick";
import Movie from "../movie/Movie";
import "./MovieList.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="movie-list">
        <h2>{title}</h2>
        <Slider {...settings}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Slider>
      </div>
      <div className="movie-list-phone">
        <h2>{title}</h2>
        <div className="movies-phone">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <img
                className="phoneMovieImg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
