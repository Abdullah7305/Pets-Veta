export type AiMessage = {
  id: number;
  sender: "user" | "ai";
  text: string;
};
