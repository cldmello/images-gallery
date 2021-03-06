import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050' ;

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      toast('Saved image!');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getSavedImages(), []);
  
  // console.log(images);
  // Prev: https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // console.log(word);
    // fetch(`${API_URL}?query=${word}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setImages([{...data, title: word}, ...images]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title: word}, ...images]);
      toast.info(`Image found for keyword ${word.toUpperCase()}!`);
    } catch (error) {
      console.log(error);
    }
    
    setWord('');
  };

  // console.log(process.env);

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        const img = images.find((i) => i.id === id).title.toUpperCase();
        setImages(images.filter( (image) => image.id !== id ));
        toast.error(`Image ${img} was deleted!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToSave = images.find((image) => image.id === id);
    imageToSave.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToSave);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) => image.id === id ? {...image, saved: true} : image)
        );
      toast.success(`Image ${imageToSave.title.toUpperCase()} saved!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      { loading ? ( <Spinner /> ) : ( <>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        { images.length ? (
          <Row xs={1} md={2} lg={3} >
            { images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} saveImage={handleSaveImage} />
              </Col>
              ) )
            }
          </Row> )
        : (
          <Welcome />
        ) }
        
      </Container>
      </>)
      }
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
