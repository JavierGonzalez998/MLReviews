'use client';
import { GetReview } from "../conn";

export interface reviewType{
    output: number,
    response: string
}

class Review{
    async getReview(review:string): Promise<{ data?: reviewType ; error?: string }>{
        const data = await GetReview(review)
        if(data){
            return {data: data}
        }

        return {error: "error al realizar la consulta"}
    }

}

export const review = new Review()