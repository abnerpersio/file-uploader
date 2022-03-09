import { REQUIRED_FILE_FOR_UPLOAD } from '@shared/constants/messages';
import { RequestError } from '@shared/errors/RequestError';

export class MissingFile extends RequestError {
  constructor() {
    super(REQUIRED_FILE_FOR_UPLOAD, 422);
  }
}
