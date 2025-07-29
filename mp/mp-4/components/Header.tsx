"use client";

import styled from "styled-components";

const HeaderSty = styled.header`
    margin: 0 auto;
    width: 80%;
    height: 100px;
    background-color: maroon;
    margin-top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    

    div  {
        display: flex;
        flex-direction: column;
        border: 3px black solid;
        width: fit-content;
        height: fit-content;
        padding: 5px;
        background-color: rgb(200, 60, 60);
    }
    
`

export default function Header() {
    return (

        <HeaderSty>
            <div>
                <h1>Welcome to Harvard Art!</h1>
                <p>A website of art and different colored tweezers</p>
            </div>

        </HeaderSty>
    )

}