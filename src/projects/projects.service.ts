import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Project } from './entities/project.entitiy';

@Injectable()
export class ProjectsService {
    private projects : Project[] = [//predefine for testing purposes
    {
        id: 1,
        name: 'Stuff1',
        description: 'stuff with python',
        stackinfo: ['python', 'ruby'],
    },]; //database

    findAll() {
        return this.projects;
    }

    findOne(id: string) {
     const project = this.projects.find(item => item.id === +id);
     if (!project) {
        throw new NotFoundException(`Project #${id} not found`);
     }
     return project;
    }

    create(createProjectDto: any) {
        this.projects.push(createProjectDto);
        return createProjectDto;
    }

    update(id: string, updateProjectDto: any) {
        const existingProject = this.findOne(id);
        if (existingProject) {
            //update the existing projector entity
        }else {
            throw new NotFoundException(`Cannot update project that is not there `)

        }
    }

    remove(id: string) {
        const projectIndex = this.projects.findIndex(item => item.id === +id)
        if (projectIndex >= 0){
            this.projects.splice(projectIndex, 1);
        }
    }
}
