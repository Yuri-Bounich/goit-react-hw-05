import s from './ImageCard.module.css';
const ImageCard = ({ post, alt, onClick }) => {
  return <img className={s.image} src={post} alt={alt} onClick={onClick} />;
};

export default ImageCard;
