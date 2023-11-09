export function formatString(inputString: string): string {
	if (!inputString || inputString.length === 0) {
	  return inputString; // Return the original string if it's empty or null
	}
  
	const words = inputString.split(" ");
	const capitalizedWords = words.map((word) => {
	  if (word.length === 0) {
		return word; // Preserve empty words (e.g., multiple spaces)
	  }
	  const firstLetter = word[0].toUpperCase();
	  const restOfWord = word.slice(1).toLowerCase();
	  return firstLetter + restOfWord;
	});
  
	return capitalizedWords.join(" ");
  }