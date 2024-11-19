import { Rings } from 'react-loader-spinner';
// 5) добавляємо лоадер
const Loader = () => {
  return (
    <div>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#0c1a95"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
