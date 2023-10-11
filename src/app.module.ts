import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { QrController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [QrController],
  providers: [MoviesService],
})
export class AppModule {}
