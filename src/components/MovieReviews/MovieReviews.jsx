import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css"

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovieReview() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMovieReviews(movieId);
                setReview(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieReview();
    }, [movieId]);

    return (
        <div>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {reviews && reviews.length > 0 ? (
                <ul className={css.container}>
                    {reviews.map(review => (
                        <li key={review.id} className={css.item}>
                            <div className={css.txtImg}>
                                {review.author_details.avatar_path &&
                                    <img src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                                        alt={review.author}
                                        className={css.img} />}
                                <h3>Author: {review.author}</h3>
                            </div>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p className={css.noReviews}>No reviews yet</p>
            )}
        </div>
    )

}