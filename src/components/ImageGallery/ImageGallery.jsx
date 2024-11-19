import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  //console.log(images);
  // фільтрація для видалення дубльованих записів. консоль видавала помилку і АРІ повертаєдубльований масив(через консольлог видно)
  const uniqueImages = images.filter(
    (image, index, self) => index === self.findIndex(t => t.id === image.id)
  );
  return (
    <div>
      <ul className={s.gallery}>
        {/* 4) розмепуємо обєкт */}
        {uniqueImages.map(post => (
          <li key={post.id}>
            {/* Використовується унікальний ключ */}
            <ImageCard
              className={s.imageCard}
              post={post.urls.small}
              alt={post.alt_description}
              onClick={() =>
                onImageClick(post)
              } /* 40)встановлення функції на клік */
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
