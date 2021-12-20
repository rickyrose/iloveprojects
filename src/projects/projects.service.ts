import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-qyery.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entitiy';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel:Model<Project>,
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset} = paginationQuery
        return this.projectModel.find().exec();
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
             throw new NotFoundException(`pROJECT #${id} Not found`)
         }
         return existingProject;
      
    }

    async remove(id: string) {
        const project = await this.findOne(id)
        return project.remove();
    }
}
