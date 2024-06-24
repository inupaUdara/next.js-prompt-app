import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator');

        if(!prompts) return new Response('Prompt not found', {status: 404})

        return new Response(JSON.stringify(prompts),{status: 200})
    } catch (error) {
        return new Response("Failed to fetch your promptes", {status: 500})
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    
    try {
        await connectToDB();
        const existingPrompts = await Prompt.findById(params.id);

        if(!existingPrompts) return new Response('Prompt not found', {status: 404})

        existingPrompts.prompt = prompt;
        existingPrompts.tag = tag;

        await existingPrompts.save();

        return new Response(JSON.stringify("Succesfully updated the prompts"), {status:200})
    } catch (error) {
        return new Response("Failed to update the prompt", {status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify("Succesfully deleted the prompt"), {status: 200})

    } catch (error) {
        return new Response("Failed to delete the prompt", {status: 500})
    }
}