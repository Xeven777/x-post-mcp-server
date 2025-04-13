import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

function validateTwitterCredentials() {
  const required = [
    "TWITTER_API_KEY",
    "TWITTER_API_SECRET",
    "TWITTER_ACCESS_TOKEN",
    "TWITTER_ACCESS_SECRET",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing Twitter credentials: ${missing.join(", ")}`);
  }
}

validateTwitterCredentials();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
}).readWrite;

export async function createPost(status: string) {
  try {
    const newPost = await twitterClient.v2.tweet({
      text: status,
    });
    console.log("Tweeted: ", newPost.data.text);
    return {
      content: [
        {
          type: "text",
          text: `Tweeted: ${status}`,
        },
      ],
    };
  } catch (error) {
    console.error("Twitter API error:", error);
    throw new Error("Failed to create tweet: " + (error as Error).message);
  }
}
