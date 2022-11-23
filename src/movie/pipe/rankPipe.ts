import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class RankValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.toLowerCase() != 'asc' && value.toLowerCase() != 'desc') {
      throw new BadRequestException('op must be asc or desc');
    }
    return value;
  }
}
