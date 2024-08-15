import css from "./ErrorMessage.module.css"
export default function ErrorMessage() {
    return (
        <p className={css.errorTxt}>Something went wrong...</p>
    )
}