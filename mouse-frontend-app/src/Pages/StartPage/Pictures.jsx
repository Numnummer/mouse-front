import image1 from "../../../public/image1.png"
import image2 from "../../../public/image2.png"
import image3 from "../../../public/image3.png"
import image4 from "../../../public/image4.png"
import styles from "./Pictures.module.css";

export default function Pictures() { return (
  <div className={styles.startPictures}>
    <img src={image1}></img>
    <img src={image2}></img>
    <img src={image3}></img>
    <img src={image4}></img>
  </div>
)
}