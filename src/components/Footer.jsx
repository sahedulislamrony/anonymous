import style from "../styles/Footer.module.scss";
export default function Footer(){
    return (

        <div className={style.footer}>
            <p className={style.text}> &copy; 2024 | All rights <a href="https://github.com/sahedulislamrony" target="_blank">reserved.</a></p>
        </div>
    );
}