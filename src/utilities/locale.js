const fs = require('fs');

fs.readFile('./preferences.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading preferences file:', err);
    return;
  }

  try {
    const preferences = JSON.parse(data);
    const languageFile = `./languages/${preferences.language}.json`;

    fs.readFile(languageFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading language file:', err);
        return;
      }

      try {
        const language = JSON.parse(data);

        document.querySelectorAll('[data-key]').forEach((element) => {
          const key = element.getAttribute('data-key');
          if (language[key]) {
            element.textContent = language[key];
          }
        });
      } catch (error) {
        console.error('Error parsing language file:', error);
      }
    });
  } catch (error) {
    console.error('Error parsing preferences file:', error);
  }
});
