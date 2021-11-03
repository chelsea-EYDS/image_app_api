import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const isProduction = configService.get('STAGE') === 'production'
				return {
					ssl: isProduction,
					extra: { ssl: isProduction ? { rejectUnauthorized: false } : null },
					type: 'postgres',
					host: configService.get('POSTGRES_HOST'),
					port: 5432,
					username: configService.get('POSTGRES_USER'),
					password: configService.get('POSTGRES_PASSWORD'),
					database: configService.get('POSTGRES_DATABASE'),
					autoLoadEntities: true,
					synchronize: true,
				}
			},
		}),
	],
})
export class DatabaseModule {}
