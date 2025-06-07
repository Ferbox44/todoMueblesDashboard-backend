import { Global, Module } from '@nestjs/common';
import { initializeFirebase } from '../config/firebase.config';

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        return initializeFirebase();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {} 