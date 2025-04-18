// FlipCard.jsx
import React, { useState, useEffect } from "react";

export const FlipCard = ({
  subject = "Your question here?",
  imageSrc,
  description = "Description here.",
  correctAnswer = true,
  flipDelay = 10000, // ms before auto‑flip
  answerTime = 30000, // ms to answer after flip
  onAnswer, // (correct: boolean) => void
}) => {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(Math.ceil(answerTime / 1000));

  // 1) auto‑flip
  useEffect(() => {
    const ft = setTimeout(() => setFlipped(true), flipDelay);
    return () => clearTimeout(ft);
  }, [flipDelay]);

  // 2) when flipped, start countdown
  useEffect(() => {
    if (!flipped) return;
    setTimeLeft(Math.ceil(answerTime / 1000));
    const iv = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(iv);
          handleAnswer(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [flipped]);

  const handleAnswer = (userAnswer) => {
    if (answered) return;
    const correct = userAnswer === correctAnswer;
    setAnswered(true);
    setIsCorrect(correct);
    onAnswer(correct);
  };

  // back‑face background based on outcome
  const backFaceClasses = answered
    ? isCorrect
      ? "bg-green-100 border-green-500"
      : "bg-red-100 border-red-500"
    : "bg-white border-gray-200";

  return (
    <div
      className="
        relative w-full
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[400px]
        aspect-[2/3]
        shadow-xl rounded-2xl
      "
      style={{ perspective: 1000 }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out rounded-2xl"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Front ── */}
        <div
          className="
            absolute inset-0 rounded-2xl
            flex items-center justify-center p-6
            bg-gradient-to-br from-indigo-500 to-purple-600
            text-white text-center
          "
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">{subject}</h2>
        </div>

        {/* ── Back ── */}
        <div
          className={`
            absolute inset-0 rounded-2xl
            flex flex-col items-center justify-center p-6 border
            ${backFaceClasses}
          `}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Timer pill */}
          {!answered && (
            <div className="absolute top-4 right-4 bg-gray-200 text-gray-800 text-sm font-medium rounded-full px-3 py-1">
              {timeLeft}s
            </div>
          )}

          {imageSrc && (
            <img
              src={imageSrc}
              alt={description}
              className="w-full h-1/3 object-contain mb-4 rounded-lg border"
            />
          )}

          <p className="mb-6 text-sm sm:text-base text-gray-700 text-center">
            {description}
          </p>

          <div className="space-x-4 mb-4">
            <button
              className="px-4 sm:px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => handleAnswer(true)}
              disabled={answered}
            >
              True
            </button>
            <button
              className="px-4 sm:px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => handleAnswer(false)}
              disabled={answered}
            >
              False
            </button>
          </div>

          {answered && (
            <p
              className={`font-semibold text-base sm:text-lg ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}
            >
              {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
