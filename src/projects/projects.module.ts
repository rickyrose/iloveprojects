import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/events/entities/event.entity';
import { Project, ProjectSchema } from './entities/project.entitiy';
import { Stuff } from './projects.constants';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectFactory {
    create(){
        //do something
        return ['aaaa', 'bbbb', 'cccc'];
    }
}

class ConfigService {}
class DevelopConfigService {}
class ProductionConfigService {}
@Module({
    imports:[MongooseModule.forFeature([{
    name: Project.name,
    schema: ProjectSchema,
},
{
    name: Event.name,
    schema:EventSchema,
}
]),
],
controllers: [ProjectsController],
 providers:[ProjectsService,
    ProjectFactory,
    {    provide: Stuff, useFactory: ()=>['aaaa', 'bbbb', 'cccc'], inject: [ProjectFactory],  useClass: process.env.NODE_ENV === 'development' ? DevelopConfigService : ProjectsService,}],
  exports:[ProjectsService]})
export class ProjectsModule