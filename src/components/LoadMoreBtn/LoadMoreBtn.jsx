import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleLoad }) => {
  return (
    <div className={s.block}>
      {/* 26) створюємо кнопку лоад мор*/}
      <button className={s.btn} onClick={handleLoad}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
