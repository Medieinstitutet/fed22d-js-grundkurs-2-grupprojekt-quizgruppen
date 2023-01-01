async function getQuestions() {
  return fetch('https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple')
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching questions: ', err);
      return null;
    });
}

const geographyQsHard = await getQuestions();

export default geographyQsHard;