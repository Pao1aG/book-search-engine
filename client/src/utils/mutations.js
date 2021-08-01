import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
         token
         user {
          _id 
          username
         }
      }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
   mutation saveBook($userId: ID!, $authors: [String]!, $description: String!, $bookId: String!, $image: String!, $link: String!, $title: String!) {
       saveBook(userId: $userId, authors: $authors, description: $descripion, bookId: $bookId, image: $image, link: $link, title: $title ) {
           authors
           description
           bookId
           image
           link
           title
       }
   }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            bookId
        }
    }

`;