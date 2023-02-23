import './App.css';
import DetailProduct from './components/DetailProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OtherProducts from './components/OtherProducts';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  const [detailId, setDetailId] = useState('1');

  const handleClickProduct = (e) => {
    const productCurrentId = e.currentTarget.id;
    setDetailId(productCurrentId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto my-8">
        <DetailProduct detailId={detailId} setDetailID={setDetailId} />
        <OtherProducts onClick={handleClickProduct} detailId={detailId} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
