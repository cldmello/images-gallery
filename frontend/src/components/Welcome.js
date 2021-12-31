import React from "react";
import { Button } from 'react-bootstrap';

const Welcome = () => (
  <div className="jumbotron">
    <h1>Images Gallery</h1>
    <p>
      This is a simple application that retrieves images using the UnSplash API. Enter any search term in the Search box to begin. 
    </p>
    <p>
      <Button variant="primary" href="https://unsplash.com/" target="_blank">Learn More</Button>
    </p>
  </div>
);

export default Welcome;