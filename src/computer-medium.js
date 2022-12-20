async function getQuestions() {
  return fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching questions: ', err);
      return null;
    });
}

const computerQsMedium = await getQuestions();

export default computerQsMedium;