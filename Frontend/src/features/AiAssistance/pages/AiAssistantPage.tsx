import AiChatBox from "../components/AiChatBox";
import AiFeatures from "../components/AiFeatures";
import AiHowItWorks from "../components/AiHowItWorks";
import AiCTA from "../components/AiCTA";

const AiAssistantPage = () => {
  return (
    <main className="min-h-screen bg-[#f5fbff] pt-28">
      <AiChatBox />
      <AiFeatures />
      <AiHowItWorks />
      <AiCTA />
    </main>
  );
};

export default AiAssistantPage;