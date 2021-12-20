import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { throws } from 'assert';
import { PaginationQueryDto } from 'src/common/dto/pagination-qyery.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        
       return this.projectService.findAll(paginationQuery);
    }

    @Get(':id') 
    findOne(@Param('id') id: string){//@param gets all request parameters and use them inside the function body of the findOne method
        return this.projectService.findOne(id);
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto){
        console.log(createProjectDto instanceof CreateProjectDto);
        return this.projectService.create(createProjectDto);
        // 'this action create a project with body params
    }

    @Patch(':id')
    update(@Param('id')id: string, @Body() updateProjectDto: UpdateProjectDto ) {
        return this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectService.remove(id);
    }
}
