import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-qyery.dto';
import { Event, EventSchema } from 'src/events/entities/event.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entitiy';
import { Stuff } from './projects.constants';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel:Model<Project>,
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(Event.name) private readonly eventModel:Model<Event>,
        @Inject(Stuff) stuff: string[],
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset} = paginationQuery
        return this.projectModel.find().skip(offset).limit(limit).exec();
    }

    async findOne(id: string) {
     const project = await this.projectModel.findOne({_id: id}).exec();
     if (!project) {
        throw new NotFoundException(`Project #${id} not found`);
     }
     return project;
    }

    create(createProjectDto: CreateProjectDto) {
       const project = new this.projectModel(createProjectDto);
        return project.save();
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
         const existingProject = await this.projectModel
         .findOneAndUpdate({_id: id},{$set: updateProjectDto}, {new: true})
         .exec();
         if(!existingProject){
             throw new NotFoundException(`project #${id} Not found`)
         }
         return existingProject;
      
    }

    async remove(id: string) {
        const project = await this.findOne(id)
        return project.remove();
    }

    async reconnendProject(project: Project) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            project.recomend++;
            const recommendEvent = new this.eventModel({
                name: 'recommended_project',
                type: 'project',
                payload: {
                    projectId: project.id
                },
            });
            await recommendEvent.save({session});
            await project.save({session});``
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
        }finally {
            session.endSession();
        }
    }

}
