import React from "react";
import "./Demo.css";


const demoFilms = [
  { img: "https://image.tmdb.org/t/p/w342/q719jXXEzOoYaps6babgKnONONX.jpg", title: "Your Name", year: "2016" },
  { img: "https://image.tmdb.org/t/p/w342/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", title: "Pulp Fiction", year: "1994" },
  { img: "https://image.tmdb.org/t/p/w342/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", title: "Dune", year: "2021" },
  { img: "https://image.tmdb.org/t/p/w342/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg", title: "Oppenheimer", year: "2023" },
  { img: "https://image.tmdb.org/t/p/w342/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg", title: "Spider-Man: Across the Spider-Verse", year: "2023" },
  { img: "https://image.tmdb.org/t/p/w342/jTswp6KyDYKtvC52GbHagrZbGvD.jpg", title: "The Batman", year: "2022" },
  { img: "https://image.tmdb.org/t/p/w342/velWPhVMQeQKcxggNEU8YmIo52R.jpg", title: "Inception", year: "2010" },
  { img: "https://image.tmdb.org/t/p/w342/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg", title: "The Lion King", year: "1994" },
  { img: "https://image.tmdb.org/t/p/w342/eFw5YSorHidsajLTayo1noueIxI.jpg", title: "Black Panther", year: "2018" },
  { img: "https://image.tmdb.org/t/p/w342/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg", title: "Jujutsu Kaisen 0", year: "2021" },
  { img: "https://image.tmdb.org/t/p/w342/mFq4cgbRqvCjE2pG5WqNsJ9WZP9.jpg", title: "1917", year: "2019" },
  { img: "https://image.tmdb.org/t/p/w342/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg", title: "Spirited Away", year: "2001" },
  { img: "https://image.tmdb.org/t/p/w342/jpfkzbIXgKZqCZAkEkFH2VYF63s.jpg", title: "Frozen II", year: "2019" },
  { img: "https://image.tmdb.org/t/p/w342/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg", title: "Avengers: Infinity War", year: "2018" },
  { img: "https://image.tmdb.org/t/p/w342/aiy35Evcofzl7hASZZvsFgltHTX.jpg", title: "The Greatest Showman", year: "2017" },
  { img: "https://image.tmdb.org/t/p/w342/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg", title: "The Dark Knight", year: "2008" },
  { img: "https://image.tmdb.org/t/p/w342/lfPKR2OeYJQYJt7RROy8jPBV1A6.jpg", title: "La Haine", year: "1995" },
  { img: "https://image.tmdb.org/t/p/w342/umX3lBhHoTV7Lsci140Yr8VpXyN.jpg", title: "The Lord of the Rings: The Fellowship of the Ring", year: "2001" },
  { img: "https://image.tmdb.org/t/p/w342/4PiiNGXj1KENTmCBHeN6Mskj2Fq.jpg", title: "Knives Out", year: "2019" },
  { img: "https://image.tmdb.org/t/p/w342/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", title: "Wonder Woman", year: "2017" },
];

const Demo: React.FC = () => {
  return (
    <div style={{ background: "#17181f", minHeight: "100vh", paddingBottom: 50 }}>

      <div className="grid-section">
        <div className="film-grid">
          {demoFilms.map((film, idx) => (
            <div className="film-card" key={idx}>
              <img src={film.img} alt={film.title} />
              <div className="title">{film.title}</div>
              <div className="year">{film.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
