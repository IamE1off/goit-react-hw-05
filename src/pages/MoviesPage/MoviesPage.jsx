import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList"
import { getMovieByQuery } from "../../movies-api";
import css from "./MoviesPage.module.css"


export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const nameFilmFilter = searchParams.get("name") ?? "";

    const changeFilmName = (newFilmName) => {
        setSearchParams({ name: newFilmName });
    };

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchFilteredMovies() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMovieByQuery(nameFilmFilter);
                setFilteredMovies(data);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        if (nameFilmFilter) {
            fetchFilteredMovies();
        }
    }, [nameFilmFilter]);

    const moviesByQuery = useMemo(() => {
        return filteredMovies.filter((filteredMovie) =>
            filteredMovie.title.toLowerCase().includes(nameFilmFilter.toLowerCase())
        )
    }, [filteredMovies, nameFilmFilter]);

    return (
        <div>
            <SearchBar value={nameFilmFilter} onFilter={changeFilmName} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {nameFilmFilter && !loading && !error && (
                moviesByQuery.length > 0 ?
                    <MovieList movies={moviesByQuery} />
                    : !loading && <p className={css.notFound}>No movies found</p>
            )}
        </div>
    );
}