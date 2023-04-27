import {useEffect, useState} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import './styles/custom.css';
import {Button, DangerButton} from "./components/Button.jsx";

function App() {

    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState({});
    const [display, setDisplay] = useState(false);
    const [option, setOption] = useState('Programming');
    const getJoke = async () => {

        setLoading(true)

        await fetch(`https://v2.jokeapi.dev/joke/${option}?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart`)
            .then(res => res.json())
            .then(data => setJoke(data))
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
                setDisplay(false)
            });
    };

    const showDeliveryOfJoke = () => {
        setDisplay(true)
    }

    const changeJokeType = () => {
        setOption(document.getElementById('jokeType').value);
    }

    useEffect(() => {
        getJoke();
    }, []);

    return (
        <>
            <div className={'wrapper'}>
                <label htmlFor="jokeType">Choose Joke Type</label><br></br>

                <select name="jokeType" id="jokeType" onChange={changeJokeType}>
                    <option value="Programming">Programming</option>
                    <option value="Dark">Dark</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Christmas">Christmas</option>
                </select>

                {loading === true ? <div>Loading Joke</div> :
                    joke.error === true ? <>
                            <h2>Joke could not be displayed. Please try again.</h2>
                            <div><Button onClick={getJoke}>Get Joke!</Button></div>
                        </>
                        : <>
                            {Object.keys(joke).length > 0 ?
                                <>
                                    <h2>{joke.setup}</h2>
                                    {display === true ? <div><h3>{joke.delivery}</h3></div> : <Button onClick={showDeliveryOfJoke}>Show the joke!</Button>}
                                </>
                                : <h2>Joke could not be displayed. Please try again.</h2>}
                            <div>
                                <Button onClick={getJoke}>Get Joke!</Button>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default App
