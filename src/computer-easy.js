async function getQuestions() {
  return fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.error('Error fetching questions: ', err);
      return null;
    });
}

const computerQsEasy = await getQuestions();

export default computerQsEasy;