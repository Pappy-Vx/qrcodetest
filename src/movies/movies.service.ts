import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService) {}

  async getRandomMovies(): Promise<any> {
    const response: AxiosResponse<any> = await this.httpService
      .get('https://gist.github.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4')
      .pipe(map((response: AxiosResponse) => response.data.movies))
      .toPromise();

    return response.data;
  }
}
