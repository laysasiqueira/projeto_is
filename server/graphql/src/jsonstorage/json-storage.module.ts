// json-storage.module.ts
import { Module } from '@nestjs/common';
import { JsonStorageService } from './json-storage.service';

@Module({
  providers: [JsonStorageService], // Registra o serviço
  exports: [JsonStorageService],   // Exporte o serviço para uso em outros módulos
})
export class JsonStorageModule {}
