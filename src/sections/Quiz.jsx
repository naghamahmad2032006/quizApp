import React, { useState } from "react";
import { FlipCard } from "../components/FlipCard.jsx";
import img1 from "../assets/imgs/Picture1.jpg";
import img2 from "../assets/imgs/Picture2.png";
import img3 from "../assets/imgs/Picture3.jpg";
import img4 from "../assets/imgs/Picture4.jpg";
import img5 from "../assets/imgs/Picture5.png";
import img6 from "../assets/imgs/Picture6.jpg";
import img7 from "../assets/imgs/Picture7.jpg";
import img8 from "../assets/imgs/Picture8.png";
import img9 from "../assets/imgs/Picture9.png";
import img10 from "../assets/imgs/Picture10.jpg";
import img11 from "../assets/imgs/Picture11.png";
import img12 from "../assets/imgs/Picture12.jpg";
import img13 from "../assets/imgs/Picture13.png";
import img14 from "../assets/imgs/Picture14.png";
import img15 from "../assets/imgs/Picture15.jpg";
import img16 from "../assets/imgs/Picture16.png";

const questions = [
  {
    subject: "First aid",
    imageSrc: img1,
    description:
      "Is the immediate care given before professional medical help arrives?",
    correctAnswer: true,
  },
  {
    subject: "Cardiopulmonary resuscitation (CPR):",
    imageSrc: img2,
    description: "CPR stands for Complete Pulmonary Recovery.",
    correctAnswer: false,
  },
  {
    subject: "Airway",
    imageSrc: img3,
    description: "Airway refers to the path air follows into the lungs.",
    correctAnswer: true,
  },
  {
    subject: "Breathing",
    imageSrc: img4,
    description: "Breathing involves only the heart pumping blood.",
    correctAnswer: false,
  },
  {
    subject: "Circulation",
    imageSrc: img5,
    description: "Circulation is the movement of blood throughout the body.",
    correctAnswer: true,
  },
  {
    subject: "Automated External Defibrillator (AED)",
    imageSrc: img6,
    description: "An AED is used to fix broken bones",
    correctAnswer: false,
  },
  {
    subject: "Choking",
    imageSrc: img7,
    description: "Choking occurs when the airway is blocked.",
    correctAnswer: true,
  },
  {
    subject: "Heimlich maneuver",
    imageSrc: img8,
    description: "The Heimlich maneuver helps clear an obstructed airway.",
    correctAnswer: true,
  },
  {
    subject: "Bleeding",
    imageSrc: img9,
    description: "Bleeding refers to internal brain swelling.",
    correctAnswer: false,
  },
  {
    subject: "Direct pressure",
    imageSrc: img10,
    description: "Direct pressure can help stop bleeding.",
    correctAnswer: true,
  },
  {
    subject: "Tourniquet",
    imageSrc: img11,
    description: "A tourniquet is applied to stop severe bleeding.",
    correctAnswer: true,
  },
  {
    subject: "Fractures",
    imageSrc: img12,
    description: "Fractures are minor skin scrapes.",
    correctAnswer: true,
  },
  {
    subject: "Immobilization",
    imageSrc: img13,
    description: "Immobilization prevents movement of an injured area.",
    correctAnswer: true,
  },
  {
    subject: "Sprains",
    imageSrc: img14,
    description: "Sprains are injuries to ligaments.",
    correctAnswer: true,
  },
  {
    subject: "Second-Degree Burn",
    imageSrc: img15,
    description: "Second-degree burns are the least severe.",
    correctAnswer: false,
  },
  {
    subject: "Poisoning",
    imageSrc: img16,
    description: "Poisoning can occur from ingesting harmful substances.",
    correctAnswer: true,
  },
];

export const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (correct) => {
    if (correct) setScore((s) => s + 1);
    setTimeout(() => setCurrent((c) => c + 1), 1000);
  };

  if (!started) {
    return (
      <div className="p-8 flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Medical Terminology Quiz</h1>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (current >= questions.length) {
    return (
      <div className="p-8 flex flex-col justify-center items-center w-full h-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p
          className={`text-lg  ${
            score >= questions.length / 2 ? "text-green-500" : "text-red-500"
          }`}
        >
          Your score: <span className="font-semibold">{score}</span> /{" "}
          <span className="font-semibold">{questions.length}</span>
        </p>
        <h2>
          This project was completed by:{" "}
          <span className="font-bold">Nagham Al-Shuokhe</span>,{" "}
          <span className="font-bold">Rawaa Shafi</span>,{" "}
          <span className="font-bold">Wiam Warasneh</span>,{" "}
          <span className="font-bold">Tabarak Ahmad</span>
          <br />
          <br />
          <span className="font-extrabold">
            special thanks to Dr. Noor Iamar.
          </span>
        </h2>
      </div>
    );
  }

  const { subject, imageSrc, description, correctAnswer } = questions[current];

  return (
    <div className="p-8 flex flex-col items-center space-y-4">
      <FlipCard
        key={current}
        subject={subject}
        imageSrc={imageSrc}
        description={description}
        correctAnswer={correctAnswer}
        flipDelay={10000}
        answerTime={30000}
        onAnswer={handleAnswer}
      />
      <p className="text-lg">
        Question {current + 1} / {questions.length}
      </p>
      <p className="text-xl font-semibold">Score: {score}</p>
    </div>
  );
};
