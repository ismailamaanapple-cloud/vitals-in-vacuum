"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/modules";

export default function Quiz({
  questions,
  accent,
}: {
  questions: QuizQuestion[];
  accent: string;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const answered = selected !== null;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-3xl glass p-8 text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-faint">
          Knowledge check complete
        </div>
        <div
          className="mt-4 font-display text-6xl font-bold"
          style={{ color: accent }}
        >
          {score}/{questions.length}
        </div>
        <p className="mt-2 text-mute">
          {pct >= 80
            ? "Flight-surgeon ready."
            : pct >= 50
              ? "Solid grasp — review the misses."
              : "Worth another orbit through the module."}
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-xl px-5 py-2.5 text-sm font-medium text-void transition-transform hover:scale-105"
          style={{ background: accent }}
        >
          Retake
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl glass p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-faint">
        <span>Knowledge check</span>
        <span className="font-mono">
          {current + 1} / {questions.length}
        </span>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-haze/40">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold leading-snug">
        {q.q}
      </h3>

      <div className="mt-5 grid gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isPicked = i === selected;
          let state = "idle";
          if (answered && isCorrect) state = "correct";
          else if (answered && isPicked && !isCorrect) state = "wrong";

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                state === "correct"
                  ? "border-vital/60 bg-vital/10"
                  : state === "wrong"
                    ? "border-ember/60 bg-ember/10"
                    : "hairline hover:border-ink/30 hover:bg-haze/30"
              } ${answered ? "cursor-default" : "cursor-pointer"}`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono ${
                  state === "correct"
                    ? "border-vital text-vital"
                    : state === "wrong"
                      ? "border-ember text-ember"
                      : "border-faint text-faint"
                }`}
              >
                {state === "correct" ? "✓" : state === "wrong" ? "✕" : String.fromCharCode(65 + i)}
              </span>
              <span className={state === "idle" ? "text-mute group-hover:text-ink" : "text-ink"}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-5 rounded-xl bg-haze/30 p-4 text-sm leading-relaxed text-mute">
              {q.explanation}
            </p>
            <button
              onClick={next}
              className="mt-4 rounded-xl px-5 py-2.5 text-sm font-medium text-void transition-transform hover:scale-105"
              style={{ background: accent }}
            >
              {current + 1 >= questions.length ? "See results" : "Next question"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
