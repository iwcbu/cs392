"use client";

import type { ArtProps } from "@/types";
import styled from "styled-components";

const GalleryDiv = styled.div`
    margin: 0 auto;
    width: 80%;
    min-height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: stretch;
    background-color: whitesmoke;
    padding: 1rem;
`;


const SingleCharDiv = styled.div`
  flex: 0 1 300px;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  border: 3px maroon solid;
  box-shadow: 20px 20px 30px grey;

  h1 {
    color: maroon;
    text-align: center
  }

  p {
    margin: 0 auto;
    max-width: 80%;
  }

  
  img{
    scale: 80%;
    aspect-ratio:1/1;
  }
`;

export default function ArtGallery({ arts }: { arts: ArtProps[]}) {

    console.log("Test for props here")
    console.log(arts);

    if(!arts ||  arts.length === 0) {
        return <div>No artworks found</div>
    }

    return (
        <GalleryDiv>
            {
                arts.map((art) => (
                    <SingleCharDiv key={art.id}>
                        <img src={art.image} alt="${art.title} picture" />
                        <h1>{art.title}</h1>
                        <p>{art.description}</p>
                    </SingleCharDiv>
                    ))
            }
        </GalleryDiv>
    )
}