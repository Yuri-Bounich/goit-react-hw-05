// import contactsData from '../assets/contacts.json';
import '../index.css';
import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
// import Work from './Work/Work';
import SearchBar from './SearchBar/SearchBar';
import fetchArticles from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import toast from 'react-hot-toast';

const App = () => {
  // 1)створюємо стейт для зберігання картинок
  const [images, setImages] = useState([]);
  // 6) фіксуємо стан для лоадера
  const [isLoading, setIsLoading] = useState(false);
  // 10) створюємо змінну для помилок
  const [isError, setIsError] = useState(false);
  // 18) створюємо змінну  для query із компоненту SearchBar
  const [query, setQuery] = useState(' ');
  // 25) створюємо змінну для page (сторінки) з початковим значенням 1
  const [page, setPage] = useState(1);
  // 30) створюємо стейт для визначення кількості сторінок щоб управляти кнопкою лоадмор
  const [total_pages, setTotal_pages] = useState(0);
  // 34) стейт для модалки
  const [isOpen, setIsOpen] = useState(true);
  // 36) стейт для стану вибраної картинки
  const [selectedImage, setSelectedImage] = useState(null);

  // юсеф для котролю сторінок
  useEffect(() => {
    if (total_pages === page) {
      toast.success('You already download all posts!', {
        style: {
          border: '2px solid #4e75ff',
          borderRadius: '48px',
          padding: '16px',
          color: '#4e75ff',
          backgroundColor: 'aqua',
        },
        iconTheme: {
          primary: 'red',
          secondary: '#FFFAEE',
        },
      });
    }
  }, [total_pages, page]);

  // 2)створюємо юсеф для запиту
  useEffect(
    () => {
      const getData = async () => {
        try {
          // перевірка чи наявні дані в полі пошук
          if (!query) {
            toast.success('enter data in the Search field', {
              style: {
                border: '2px solid #4e75ff',
                borderRadius: '48px',
                padding: '16px',
                color: '#4e75ff',
                backgroundColor: 'aqua',
              },
              iconTheme: {
                primary: 'red',
                secondary: '#FFFAEE',
              },
            });
          }
          // 7) передпочатком запиту показуємо лоадер
          setIsLoading(true);
          setIsError(false);
          const response = await fetchArticles(query, page);
          // 23) вставляємо query в якості слова-запиту // 31) передаємо totalPages
          const { total_pages, results } = response;
          // console.log('Response:', response);
          // 32) при кожному запиті встановлюємо номер сторінки
          setTotal_pages(total_pages);
          // //8) ховаємо лоадер
          // setIsLoading(false); це перенесли в finally
          // 28) розсипаємо і заново збираємо масив щоб добавити картинки при кнопці лоад мор
          // викристовуємо прев щоб не було циклічності
          setImages(prev => [...prev, ...results]);
        } catch (error) {
          // 11) показуємо помилку через true
          // if (!query) {
          //   toast(t => (
          //     <span>
          //       Custom and <b>bold</b>
          //       <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
          //     </span>
          //   ));
          // } else {
          setIsError(true);
          console.log(error);
          // }
        } finally {
          // 13) виключаємо лоадер і видаляємо пункт 8
          setIsLoading(false);
        }
      };
      //переробл варіант що нижче асинхронно
      getData();
    },
    // 24) query вказується як залежність для useEffect - Це означає, що функція всередині useEffect буде виконуватися щоразу,
    //коли значення залежностей змінюється
    [query, page]
  );

  // !!!альтернативний варіант записати пункт 2
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://api.unsplash.com/search/photos?client_id=1XVhfs4mUzOdwNBmD94EeUhJyEiTHj8y6Dfez-zNpns&query=girl&page=1&per_page=12'
  //     )
  //     .then(res => setImages(res.data.results));
  //   //then тут зберігає результати (results вданому випадку. його назву беремо з відвовіді бекенду, мережа в консолі або тандер клієнт в вскод)
  // }, []);

  // 19) створеня функції для зміни стану інпуту
  const handleChangeQuery = query => {
    setQuery(query);
    // 29) при зміні запиту створюємо новий масив щоб при лоад мор фото не добавлялось в діючий масив
    setImages([]);
    // 30) при зміні запиту скидаємо нумерацію сторінок, якщо не зробити буде зі стейту підгружатись дібча сторінка
    setPage(1);
  };

  // 27) створеня функції для зміни стану кількості завантаж сторінок
  const handleLoad = () => {
    setPage(page => page + 1);
  };

  // 37) функції відкриття модалки приймає пост
  const openModal = post => {
    setSelectedImage(post);
    setIsOpen(true);
  };

  // 38) функція закриття модалки знімає пост та закриває модалку
  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div>
      {/* 20) передаємо результат handleChangeQuery в SearchBar*/}
      <SearchBar onSubmit={handleChangeQuery} />
      {/* 9) умовний рендеринг - якщо isLoading - true то лоадер рендериться, якщо false - то не рендериться */}
      {isLoading && <Loader />}
      {/* 35) умовний рендеринг і  39) передача пропсів в модал: стан,картинка, альт*/}
      {isOpen && selectedImage && (
        <ImageModal
          isOpen={isOpen}
          closeModal={closeModal}
          post={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          user={selectedImage.user.name}
          location={selectedImage.user.location}
        />
      )}
      <ImageGallery images={images} onImageClick={openModal} />

      {/* 3) передаємо отриманий рез в чілдр 39) передаємо пропс для визначення кліку*/}
      {/* 12) умовний рендеринг - якщо isError - true то помилка рендериться, якщо false - то не рендериться */}
      {isError && <ErrorMessage />}
      {/* <Work /> */}
      {/* 33) якщо більше чим - показуємо кнопку. інакше не показуємо */}
      {total_pages > page && <LoadMoreBtn handleLoad={handleLoad} />}
    </div>
  );
};

export default App;
