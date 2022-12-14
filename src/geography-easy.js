async function getQuestions() {
  return fetch('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple')
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching questions: ', err);
      return null;
    });
}

const geographyQsEasy = await getQuestions();

export default geographyQsEasy;