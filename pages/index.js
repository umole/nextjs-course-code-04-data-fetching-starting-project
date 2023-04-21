import fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
import Link from 'next/link';

function HomePage(props) {

  const { products } = props;
  return (
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export async function getStaticProps() {
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data ) {
    return {
      redirect: {
        destination: '/no-data'
      }
    };
  }

  if (!data.products || !Array.isArray(data.products)) {
    return {
      notFound: true
    };
  }

  return { 
    props: {
      products: data.products
    },
    revalidate: 1,
  };
}


export default HomePage;
