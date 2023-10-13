import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as qr from 'qrcode';
import * as cron from 'node-cron';
import axios from 'axios';

@Controller('qr')
export class QrController {
  private qrCode: string = '';
  private movies: any[] = [];

  constructor() {
    // Schedule QR code generation and movie data fetch every 10 seconds
    cron.schedule('*/10 * * * * *', () => {
      this.generateQRCode();
      this.fetchRandomMovies();
    });
  }

  @Get('qrcode')
  async getQRCode(@Res() res: Response) {
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(this.qrCode.split(',')[1], 'base64'));
  }

  @Get('data')
  async getQRCodeAndMovies(@Res() res: Response) {
    res.json({ qrCode: this.qrCode, movies: this.movies });
  }

  private async generateQRCode() {
    const url = 'https://qrcodetest-frontend.netlify.app/movies.html'; // URL of the data endpoint
    try {
      const qrCode = await qr.toDataURL(url);
      this.qrCode = qrCode;
    } catch (error) {
      console.error('Failed to generate QR code.');
    }
  }

  private async fetchRandomMovies() {
    try {
      const response = await axios.get(
        'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON',
      );
      this.movies = response.data;
    } catch (error) {
      console.error('Failed to fetch random movies.');
    }
  }
}
