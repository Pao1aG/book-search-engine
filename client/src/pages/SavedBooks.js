import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {  
  //TODO
  // Remove the useEffect() Hook that sets the state for UserData.
  // Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
  const { loading, data } = useQuery(GET_ME);
  const userData = data;

  console.log(`This is my userData: ${userData}`);

  //TODO
  // Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function 
  // instead of the deleteBook() function that's imported from API file. 
  //(Make sure you keep the removeBookId() function in place!)
    const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }
    const [removeBook, { error, data }] = useMutation( REMOVE_BOOK );
    
    try {
      const { data } = await removeBook({
        variables: {bookId}
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  }

  // if data isn't here yet, say so
  if(loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SavedBooks;
