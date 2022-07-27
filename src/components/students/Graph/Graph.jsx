import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './graph.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function Graph({ adm_num, first_name, currsub }) {

  const navigate = useNavigate()
  const [labels, setLabels] = useState([]);
  const [marks, setMarks] = useState([]);
  const [graphdata, setGraphdata] = useState(null);

  let token;
  if (localStorage.getItem('logs-token') === null) {
      navigate('/login');
  } else {
      token = localStorage.getItem('logs-token');
  }

  const abortCont = new AbortController();

  const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `token ${token}`
      },
      signal:abortCont.signal
  }

  const fetchProgress = () => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects/${currsub.id}/assessment/progressgraph/${adm_num}/`, options)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json().then(text => {throw text})
        }
    }).then(data => {
      setLabels(data.map(x => x.title))
      setMarks(data.map(x => x.mark))
      
      setGraphdata({
        labels,
        datasets: [
          {
            label: `Progress Graph of ${first_name}`,
            data: marks,
            borderColor: '#742774',
          }
        ],
      });
    }).catch(err => {
        if (err.detail) {
          alert('Please login again....');
          navigate('/login');
        } else if (err.Message) {
          alert(err.Message);
        } else {
          console.log(err.detail)
          alert('Something occured, please refresh the page...');
        }
    })
  }

  useEffect(() => {
    fetchProgress();
  }, [currsub]) 

  useEffect(() => {
    setGraphdata({
      labels,
      datasets: [
        {
          label: `Progress Graph of ${first_name}`,
          data: marks,
          borderColor: '#742774',
        }
      ],
    });
  }, [marks])


  const graphoptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      { graphdata && <Line options={graphoptions} data={graphdata}></Line>}
    </div>
  )
}

export default Graph