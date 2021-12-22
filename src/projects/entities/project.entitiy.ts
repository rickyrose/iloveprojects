import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Project extends Document {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop({default: 0})
    recomend: number;
    @Prop([String])
    stackinfo: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
