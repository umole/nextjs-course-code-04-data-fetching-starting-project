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

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    try {
        const JSONData = await fs.readFile(filePath);
        const data = JSON.parse(JSONData);

        const product = data.products.find(product => product.id === productId)

        return {
            props: {
                loadedProduct: product
            }
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true
        };
    }
    

   
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {pid: 'p1'}},
            {params: {pid: 'p2'}},
            {params: {pid: 'p3'}},
        ],
        fallback: false
    };
}

export default ProductDetailPage