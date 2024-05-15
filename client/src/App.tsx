import { useEffect, useState } from "react";

function App() {
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ping", {
          method: "GET",
        });
        if (response.ok) {
          const json = await response.json();
          console.log({ json });
          setSuccess(JSON.stringify(json.success));
        }
      } catch (e) {
        console.error("Error pinging", e);
      }
    };
    fetchPing();
  }, []);
  return (
    <>
      <h1>Hello world</h1>
      <h2>Success: {success}</h2>
    </>
  );
}

export default App;
