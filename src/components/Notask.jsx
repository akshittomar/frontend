import React from 'react';
import Image from './todo.png';
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
function Notask() {
    const headingStyle = {
        background: 'radial-gradient(circle, #000000, rgb(88 199 228))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'lavender',
        fontFamily: "serif",
        fontSize: "110%"


    };

    const context = useContext(noteContext);
    const mode = context.mode;
    const headingStyle2 = {
        color: '#033147',

        fontFamily: "serif"


    };
    return (
        <div className=''>
            <span className='my-5 fa-fade' style={mode === "light" ? headingStyle : headingStyle2}>ADD YOUR TASK ABOVE TO GET STARTED <i className="fa-solid fa-person-skiing"></i></span>
            <img
                src={Image}
                alt='Description of the image'
                style={{
                    width: '30%',
                    height: 'auto',
                    marginLeft: '25%',
                    marginBottom: '2%',
                }}
            />

        </div>
    );
}

export default Notask;

