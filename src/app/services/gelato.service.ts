import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GelatoService {
  private apiKey = '54aaed99-a777-4f2b-ad06-f8d258fd9a7e-d4baea35-0fc5-4ac2-b12f-f9b04fb732a2:cf110184-efd9-454d-967f-64dea399b42e';
  private baseUrl = '/gelato-api/v3';

  async crearOrdenPersonalizada(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/orders`, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error en la API de Gelato:', error.response?.data || error);
      throw error;
    }
  }
}
