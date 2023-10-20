import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { _getEmptyProduct, _rawProductToProduct } from './models';

export const getProductData = async (barcode: string) => {
	if (!barcode) {
		throw new Error('No Barcode provided');
	}

	let product = _getEmptyProduct();

	const productResponse = await axios.get(`${API_BASE_URL}/${barcode}.json`);

	if (productResponse.data) {
		product = _rawProductToProduct(productResponse.data);
	}

	return product;
}