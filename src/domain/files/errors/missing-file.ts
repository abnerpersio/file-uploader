import { REQUIRED_FILE_FOR_UPLOAD } from '@shared/constants/messages';
import { RequestError } from '@shared/errors/request-error';

export class MissingFile extends RequestError {
  constructor() {
    super(REQUIRED_FILE_FOR_UPLOAD, 422);
  }
}
