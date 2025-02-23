import { useEffect, useState } from "react";
import "./styles.css";
// className="search-input"
export default function App() {
  const [searchInput, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showresult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});

  const fetchRecepie = async () => {
    if (cache[searchInput]) {
      console.log("form cahche");
      setResults(cache[searchInput]);
      return;
    }
    console.log("form api");
    const data = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchInput
    );
    const res = await data.json();
    setResults(res?.recipes);
    setCache((preSta) => ({
      ...preSta,
      [searchInput]: res?.recipes,
    }));
  };
  useEffect(() => {
    let timer = setTimeout(fetchRecepie(), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Autocomplete Search</h2>
      <div>
        <input
          className="search-input"
          value={searchInput}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => {
            setShowResult(false);
          }}
          onFocus={() => {
            setShowResult(true);
          }}
        />
        {showresult && (
          <div className="result-container">
            {results.map((res) => (
              <span className="result" key={res.id}>
                {res.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
