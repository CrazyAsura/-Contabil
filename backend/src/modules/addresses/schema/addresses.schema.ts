import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Addresses {
    @Prop({ required: true })
    zipCode: string;

    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;
    
    @Prop({ required: true })
    country: string;
}
