import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

function useKeyboard() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const onShow = () => {
      setIsKeyboardVisible(true);
    };

    const onHide = () => {
      setIsKeyboardVisible(false);
    };

    const showLisner = Keyboard.addListener("keyboardDidShow", onShow);
    const hideLisner = Keyboard.addListener("keyboardDidHide", onHide);

    return () => {
      showLisner.remove();
      hideLisner.remove();
    };
  }, []);

  return { isKeyboardVisible };
}

export default useKeyboard;
