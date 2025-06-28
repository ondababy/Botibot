import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Flask-React</h1>
      {data ? (
        <div>
          <p>Message: {data.message}</p>
          <p>Data: {JSON.stringify(data.data)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;