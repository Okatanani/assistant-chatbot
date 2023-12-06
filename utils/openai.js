import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAssistant = async (assistantId) => {
  try {
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    return assistant;
  } catch (error) {
    console.error("Error in getAssistant:", error);
    throw error;
  }
};


export const createThread = async () => {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error("Error in createThread:", error);
    throw error;
  }
};

export const createMessage = async ({ threadId, content }) => {
  try {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });
    return message;
  } catch (error) {
    console.error("Error in createMessage:", error);
    throw error;
  }
};

export const runAssistant = async ({ assistantId, threadId, instructions }) => {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: instructions,
    });
    return run;
  } catch (error) {
    console.error("Error in runAssistant:", error);
    throw error;
  }
};

export const runCheck = async ({ threadId, runId }) => {
  try {
    const check = await openai.beta.threads.runs.retrieve(threadId, runId);
    return check;
  } catch (error) {
    console.error("Error in runCheck:", error);
    throw error;
  }
};

export const getMessages = async (threadId) => {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages;
  } catch (error) {
    console.error("Error in getMessages:", error);
    throw error;
  }
};

export const UploadFile = async (filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const file = await openai.files.create({
      file: fileStream,
      purpose: "assistants",
    });
    // console.log("Resposta da OpenAI:", file); // Log da resposta completa
    // console.log(filePath)
    return file;
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error);
    throw error;
  }
};



export const updateThreadWithFile = async (threadId, fileId) => {
  try {
    const updatedThread = await openai.beta.threads.update(threadId, {
      metadata: {
        fileUploaded: "true",
        fileId: fileId,
      }
    });
    console.log(`Thread updated with id: ${threadId} and file id: ${fileId}`);
    return updatedThread;
  } catch (error) {
    console.error("Error updating thread with file:", error);
    throw error;
  }
};

export const createMessageWithFile = async ({ threadId, content, fileId }) => {
  try {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
      file_ids: [fileId],
    });
    return message;
  } catch (error) {
    console.error("Error in createMessageWithFile:", error);
    throw error;
  }
};
