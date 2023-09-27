const openAIString = (businessName, promotionDetails) => {
  const numberOfSubjectLines = 10;

  const string = `I need you to generate ${numberOfSubjectLines} subject lines for email marketing. The subject lines should be in the form of a question, contain an emoji, and be written at or below a 7th grade level and contain the main value proposition within the first 20 to 36 characters.  Don’t use the words Free, new, Join, home, deal, or now. Don’t use exclamation points.  Pretend you are the marketing manager for ${businessName}. Here are the details of the promotion: ${promotionDetails}.`;

  // const string = "How many people live in new orleans?";

  return string;
};

module.exports = {
  openAIString,
};
