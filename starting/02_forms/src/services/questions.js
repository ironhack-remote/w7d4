import { v4 } from "uuid";

export function addNewQuestion(info) {
  return new Promise((res) => {
    res({
      id: v4(),
      ...info,
    });
  });
}
