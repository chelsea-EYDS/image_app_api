import { Module } from '@nestjs/common'
import { ClarifaiController } from './clarifai.controller'
import { ClarifaiService } from './clarifai.service'


@Module({
	controllers: [ClarifaiController],
	providers: [ClarifaiService],
})
export class ClarifaiModule {}
