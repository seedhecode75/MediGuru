import { Client } from "@gradio/client";

let client: any = null;
const GRADIO_URL = "https://cbee2e320f6f9b783a.gradio.live/";

export const connectToGradio = async (): Promise<void> => {
  try {
    client = await Client.connect(GRADIO_URL);
    console.log("Connected to Gradio successfully");
  } catch (error) {
    console.error("Failed to connect to Gradio:", error);
    throw error;
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!client) {
    await connectToGradio();
  }

  try {
    const result = await client.predict("/predict", {
      message: message,
    });


    if (result && result.data && result.data.length > 0) {
      return result.data[0];
    } else {
      throw new Error("Invalid response format from Gradio");
    }
  } catch (error) {
    console.error("Error sending message to Gradio:", error);
    throw error;
  }
};

export const isClientConnected = (): boolean => {
  return client !== null;
};
