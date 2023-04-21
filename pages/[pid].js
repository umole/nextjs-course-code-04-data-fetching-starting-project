import React from 'react';
import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';
import { cwd } from 'process';

const ProductDetailPage = (props) => {

    const { loadedProduct } = props;

  return (
    <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.pid;

    const filePath = path.join(__dirname, 'data', 'dummy-backend.json');
    const JSONData = await fs.readFile(filePath);
    const data = JSON.parse(JSONData);

    const product = data.product.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: product
        }
    };
}

export default ProductDetailPage