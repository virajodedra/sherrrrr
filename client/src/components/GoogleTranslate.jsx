// components/GoogleTranslate.js
import { useEffect, useState } from "react";

const GoogleTranslate = ({ visible }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!visible || loaded) return;

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    setLoaded(true);
  }, [visible, loaded]);

  if (!visible) return null;

  return (
    <div
      id="google_translate_element"
      style={{
        fontSize: "14px",
        marginLeft: "0.5rem",
        transition: "all 0.3s ease",
      }}
    />
  );
};

export default GoogleTranslate;
