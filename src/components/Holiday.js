import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react--course-api.herokuapp.com/api/v1/data/vacanze";

const Holiday = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(1);

  const next = () => {
    setSelected((next) => {
      if(next + 1 === data.data.length){
        return 0;
      }else{
        return next + 1;
      }
    })
  }

  const prev = () => {
    setSelected((prev) => {
      if(prev - 1 < 0){
        return  data.data.length - 1;
      }else{
        return prev - 1;
      }
    })
  }

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getData();
  }, [])

  if (data.success) {
    return (
      <>
        {data.data.length > 0 ? (
          <SingleHoliday
            {...data.data[selected]}
            next={next}
            prev={prev}
          />
        ) : (
          <h4>No Vacanze</h4>
        )}
      </>
    );
  } else {
    //Se non ho soddisfatto promise vuol dire che sto caricando
    return <h2> Loading... </h2>;
  }
};

export default Holiday;