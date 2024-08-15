import css from "./SearchBar.module.css";


export default function SearchBar({ value, onFilter }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(event.target.searchInput.value);
    };

    return (
        <form className={css.container} onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(event) => onFilter(event.target.value)}
                autoComplete="off"
                name="searchInput"
                placeholder="Search films..."
                className={css.input}
            />
        </form>
    );
}