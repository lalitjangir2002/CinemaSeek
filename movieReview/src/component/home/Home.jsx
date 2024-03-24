import { useEffect, useState } from 'react'
import "./home.css";
import Hero from "./Hero/Hero";

const Home = () => {
    const [movie,setMovie] = useState([]);

    const fetchData = async ()=>{
    const response = await fetch("http://localhost:8080/api/view/movies");

    const data = await response.json();

    // console.log(data);
    setMovie(data)
    }

    useEffect(()=>{
    fetchData();
    },[])

    return (
    <>
    <Hero movies={movie}/>
    </>
    )
}

export default Home