import image1 from "../../../public/image1.png"
import image2 from "../../../public/image2.png"
import image3 from "../../../public/image3.png"
import image4 from "../../../public/image4.png"
import "./Pictures.css"

export default function Pictures() { return (
  <div className='startPictures'>
    <img className='startPicture1' src={image1}></img>
    <img className='startPicture2' src={image2}></img>
    <img className='startPicture3' src={image3}></img>
    <img className='startPicture4' src={image4}></img>
  </div>
)
}