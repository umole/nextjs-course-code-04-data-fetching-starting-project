import fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';

function HomePage(props) {

  const { products } = props;
  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data || !data.products || !Array.isArray(data.products)) {
    return {
      notFound: true
    };
  }

  return { 
    
    props: {
      products: data.products
    },
    revalidate: 0.5
  };
}


export default HomePage;
