import { useMemo, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const buildMentorReply = (question, review) => {
  const normalizedQuestion = question.toLowerCase();

  if (!review) {
    return "Run a code review first, then I can explain the findings and help you decide what to fix next.";
  }

  if (normalizedQuestion.includes("bug")) {
    const bugs = review.bugs || [];

    if (!bugs.length) {
      return "The review did not flag any bugs. A good next step is to test edge cases and validate input handling.";
    }

    return `Start with this issue: ${
      bugs[0].title || bugs[0].message || bugs[0]
    }. Fixing the first high-signal bug usually improves the rest of the review quickly.`;
  }

  if (
    normalizedQuestion.includes("optimize") ||
    normalizedQuestion.includes("performance")
  ) {
    const suggestions = review.optimization_suggestions || [];

    if (!suggestions.length) {
      return "No optimization suggestions were detected. Focus on readability, naming, and keeping the current complexity stable.";
    }

    return `The strongest optimization to consider is: ${
      suggestions[0].title || suggestions[0].message || suggestions[0]
    }`;
  }

  if (
    normalizedQuestion.includes("learn") ||
    normalizedQuestion.includes("concept")
  ) {
    const concepts = review.concepts_to_learn || [];

    if (!concepts.length) {
      return "There are no specific weak concepts in this review yet. Revisit the explanation and try rewriting the solution from memory.";
    }

    return `Study ${concepts[0]} first, then apply it by refactoring the reviewed code in a small step.`;
  }

  return `Your current review score is ${
    review.overall_score ?? 0
  }/100. I would first address the most concrete finding, then rerun the review and compare the score.`;
};

function AIChat({ review }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask me about the bugs, optimizations, or concepts from this review.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  const handleSend = () => {
    const question = input.trim();

    if (!question) {
      return;
    }

    setInput("");
    setLoading(true);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        content: question,
      },
    ]);

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: buildMentorReply(question, review),
        },
      ]);
      setLoading(false);
    }, 250);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white">
        AI Mentor Chat
      </h3>

      <div className="mt-5 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={`${message.role}-${index}`}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading ? (
          <ChatMessage
            role="assistant"
            content="Thinking through the review..."
          />
        ) : null}
      </div>

      <div className="mt-5">
        <ChatInput
          value={input}
          setValue={setInput}
          onSend={handleSend}
          loading={!canSend}
        />
      </div>
    </div>
  );
}

export default AIChat;
