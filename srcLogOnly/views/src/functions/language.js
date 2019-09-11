const initialSetLanguage = () => {
    const getLanguageFromBrowser = () => {
      let language = navigator.language;
      if (language.startsWith("en")) {
        return LANGUAGES.ENGLISH;
      } else if (language.startsWith("fr")) {
        return LANGUAGES.FRENCH;
      } else {
        return LANGUAGES.ENGLISH;
      }
    };
    currentLanguage = getLanguageFromBrowser();
    console.log("setting language", currentLanguage);
  };