async function getQuestions() {
  return fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple')
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching questions: ', err);
      return null;
    });
}

const computerQsHard = await getQuestions();

export default computerQsHard;