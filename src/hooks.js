import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function useFlip(initialFlip = true) {
  const [isFlipped, SetIsFlipped] = useState(initialFlip);
  const toggle = () => {
    SetIsFlipped((oldValue) => !oldValue);
  };
  return [isFlipped, toggle];
}
// stores state of cards picked and also picks a new card
function useAxios(keyInLS, baseUrl) {
  const [responses, setResponses] = useLocalStorage(keyInLS);

  const addResponseData = async (
    formatter = (data) => data,
    restOfUrl = ""
  ) => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses((data) => [...data, formatter(response.data)]);
  };

  const clearResponses = () => setResponses([]);

  return [responses, addResponseData, clearResponses];
}

function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };
