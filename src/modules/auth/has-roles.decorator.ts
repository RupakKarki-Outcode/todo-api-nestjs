import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
