import { SetMetadata } from '@nestjs/common';

export const SECTORS_KEY = 'sectors';
export const Sectors = (...sectors: string[]) => SetMetadata(SECTORS_KEY, sectors);
