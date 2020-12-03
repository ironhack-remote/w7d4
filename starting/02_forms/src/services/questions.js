import { v4 } from "uuid";
import questionsList from "../questions.json";

export function addNewQuestion(info) {
  return new Promise((res) => {
    res({
      id: v4(),
      ...info,
    });
  });
}

export function getAllQuestions() {
  return new Promise((res) => {
    res(
      questionsList.map((el) => {
        return {
          ...el,
          id: v4(),
        };
      })
    );
  });
}
